# Access control

This site is private. Access is restricted with Cloudflare Zero Trust Access in
front of the Render service, plus an origin check so the Render URL cannot be
used to bypass the gate.

Two layers:

1. **Cloudflare Access** gates the public hostname (`partners.sparksports.ai`).
   Only allowlisted users get through, after verifying their identity.
2. **Origin verification** in `proxy.ts` rejects any request that did not pass
   Access, including direct hits to the `*.onrender.com` origin. It checks the
   signed JWT that Cloudflare attaches to every allowed request.

Layer 2 is off until you set `CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUD`, so
local dev and a first deploy work before Cloudflare is wired up.

## One-time setup

### 1. Point the domain through Cloudflare

- Add `partners.sparksports.ai` as a custom domain on the Render service.
- In Cloudflare DNS, add a proxied (orange-cloud) CNAME for that hostname to the
  Render target Render gives you. The record must be proxied, not DNS-only, or
  Access cannot see the traffic.

### 2. Create the Access application

In the Cloudflare Zero Trust dashboard:

- Access > Applications > Add an application > Self-hosted.
- Application domain: `partners.sparksports.ai`.
- Save.

### 3. Add a policy

- Policy action: Allow.
- Add a rule that matches the people who should get in. Common choices:
  - Emails: list specific addresses.
  - Emails ending in: a partner or company domain.
- Identity is verified by one-time PIN email by default. To use Google, GitHub,
  or SAML SSO instead, add the identity provider under Settings > Authentication
  and select it on the policy.

### 4. Wire the origin check

From the Access application's settings:

- Copy the **Application Audience (AUD) tag**.
- Note your **team domain**, which looks like `yourteam.cloudflareaccess.com`.

In the Render service environment, set:

- `CF_ACCESS_TEAM_DOMAIN` = `yourteam.cloudflareaccess.com`
- `CF_ACCESS_AUD` = the AUD tag

Redeploy. The origin now returns 403 for any request without a valid Access JWT.

### 5. Verify

- Visit `https://partners.sparksports.ai` in a clean browser. You should hit the
  Cloudflare login, then the docs.
- Visit the `*.onrender.com` URL directly. You should get 403, because that
  request never went through Access.

## Managing users

Add or remove people in the Access policy (step 3). No redeploy is needed.
Cloudflare logs every login under Access > Logs.

## Local development

Leave `CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUD` unset. Enforcement is off, so
`bun run dev` works without any Cloudflare login.

## Locking the origin down further (optional)

The origin check above is enough to stop bypass. If you also want the Render
service to be unreachable except through Cloudflare, run a Cloudflare Tunnel
(`cloudflared`) to the service and remove its public hostname. That is more
setup and usually unnecessary for a docs site, but it closes the origin entirely.
