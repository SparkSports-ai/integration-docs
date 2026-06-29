import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-fd-muted-foreground">
        SparkSports
      </p>
      <h1 className="mb-4 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
        Partner Integration Documentation
      </h1>
      <p className="mb-8 max-w-lg text-fd-muted-foreground">
        Technical reference for casino operators integrating SparkSports streak games via direct
        API or through an aggregator.
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
