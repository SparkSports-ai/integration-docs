import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Soft brand-purple glow behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fd-primary/15 blur-[120px]"
      />

      <Image
        src="/spark-mark.svg"
        alt="Spark"
        width={72}
        height={72}
        className="mb-8 size-[72px]"
        priority
      />

      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-fd-muted-foreground">
        SparkSports
      </p>
      <h1 className="mb-4 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
        Spark Integration Guide
      </h1>
      <p className="mb-8 max-w-lg text-fd-muted-foreground">
        API reference for casinos wiring Spark into their platform.
      </p>
      <Link
        href="/docs"
        className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
      >
        Open documentation
      </Link>
    </div>
  );
}
