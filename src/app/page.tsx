import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import CardSkeleton from "@/components/CardSkeleton";
import SortDropdown from "@/components/SortDropdown";
import { getWorkouts } from "@/lib/api";
import { SortField, Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortField, setSortField] = useState<SortField>("duration");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getWorkouts()
      .then((data) => {
        if (!cancelled) setWorkouts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = useMemo(() => {
    const copy = [...workouts];
    copy.sort((a, b) => {
      if (sortField === "duration") return a.duration - b.duration;
      if (sortField === "caloriesBurned")
        return b.caloriesBurned - a.caloriesBurned;
      return b.rating - a.rating;
    });
    return copy;
  }, [workouts, sortField]);

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-content px-5 py-16 sm:px-8 scroll-mt-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-ink">
              The Library
            </h2>
            <p className="mt-1 text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <SortDropdown value={sortField} onChange={setSortField} />
        </div>

        {error ? (
          <p className="rounded-lg border border-edge bg-surface p-6 text-center text-sm text-muted">
            Couldn&apos;t load the library right now. Please try again shortly.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))
              : sorted.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
          </div>
        )}
      </section>
    </>
  );
}

