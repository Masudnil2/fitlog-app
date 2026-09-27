import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-content flex-col items-center gap-4 px-5 py-28 text-center sm:px-8">
      <Dumbbell className="h-10 w-10 text-accent" />
      <h1 className="font-display text-5xl font-bold uppercase tracking-wide text-ink">
        404
      </h1>
      <p className="max-w-sm text-sm text-muted">
        This lift isn&apos;t in the library. The page you&apos;re looking for
        doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-base transition-opacity hover:opacity-90"
      >
        Go to workouts
      </Link>
    </section>
  );
}
