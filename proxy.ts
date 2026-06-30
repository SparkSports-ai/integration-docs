import { NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { docsContentRoute, docsRoute } from '@/lib/shared';

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

// Cloudflare Access origin protection.
//
// Cloudflare Access gates the public hostname at Cloudflare's edge, but the
// Render origin stays reachable at *.onrender.com. Without this check, anyone
// who finds that URL bypasses Access. So we verify the signed JWT Cloudflare
// attaches to every allowed request and reject anything that lacks a valid one.
//
// Enforcement turns on only when both env vars are set, so local dev and any
// deploy made before Cloudflare is wired up keep working. See ACCESS.md.
const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/+$/, '');
const audience = process.env.CF_ACCESS_AUD;

// Three states, deliberately:
//   both unset    -> enforcement off (local dev, pre-Cloudflare deploys)
//   both set      -> enforcement on, verify the Access JWT
//   exactly one   -> misconfigured, fail closed (a typo must not silently
//                    disable protection)
const accessReady = Boolean(teamDomain && audience);
const accessMisconfigured = Boolean(teamDomain) !== Boolean(audience);

// createRemoteJWKSet caches the fetched keys, so keep it at module scope.
const jwks = accessReady
  ? createRemoteJWKSet(new URL(`https://${teamDomain}/cdn-cgi/access/certs`))
  : null;

async function passesAccess(request: NextRequest): Promise<boolean> {
  if (accessMisconfigured) return false; // fail closed
  if (!accessReady || !jwks) return true; // enforcement off

  const token =
    request.headers.get('cf-access-jwt-assertion') ??
    request.cookies.get('CF_Authorization')?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, jwks, {
      issuer: `https://${teamDomain}`,
      audience,
    });
    return true;
  } catch {
    return false;
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verify Access first, so the origin returns 403 for every path (including
  // `/`) when a request did not come through Cloudflare Access. Next internals
  // carry the Access cookie like any same-origin request, so there's no need to
  // verify the JWT on every asset chunk.
  if (!pathname.startsWith('/_next/') && !(await passesAccess(request))) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // There is no landing page. Send the root to the docs, but only after the
  // Access check above, so an unauthenticated origin hit to `/` still gets 403.
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/docs', request.nextUrl));
  }

  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  return NextResponse.next();
}
