import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { appName } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2.5">
          <Image
            src="/spark-mark.svg"
            alt=""
            width={28}
            height={28}
            className="size-7 shrink-0"
            priority
          />
          <span className="font-medium">{appName}</span>
        </span>
      ),
    },
  };
}
