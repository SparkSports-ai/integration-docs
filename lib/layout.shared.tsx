import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        // Dark-only site — render the dark (white wordmark) Spark logo.
        <Image
          src="/logo/dark.svg"
          alt={appName}
          width={112}
          height={36}
          className="h-7 w-auto"
          priority
        />
      ),
    },
    // Dark-only: no light theme, so hide the theme toggle.
    themeSwitch: { enabled: false },
  };
}
