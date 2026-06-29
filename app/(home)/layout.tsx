import type { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <main className="flex flex-1 flex-col">{children}</main>;
}
