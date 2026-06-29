import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="/logo/light.svg"
            alt={appName}
            width={112}
            height={36}
            className="h-7 w-auto dark:hidden"
            priority
          />
          <Image
            src="/logo/dark.svg"
            alt={appName}
            width={112}
            height={36}
            className="hidden h-7 w-auto dark:block"
            priority
          />
        </>
      ),
    },
  };
}
