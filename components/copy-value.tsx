'use client';

import { useState } from 'react';

export function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="not-prose my-4 overflow-hidden rounded-xl border bg-fd-card text-sm">
      <div className="flex items-center justify-end border-b px-2 py-1.5">
        <button
          type="button"
          onClick={copy}
          className="rounded-md px-2 py-1 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-auto p-3.5 text-[0.8125rem]">
        <code>{value}</code>
      </pre>
    </div>
  );
}
