"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { Plus, Bookmark, BookmarkCheck, CheckCircle2 } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanProvider";
import StatsRow from "@/components/StatsRow";

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const { addToPlan, addToSaved, isInPlan, isInSaved } = usePlan();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getWorkout(params.id)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setNotFoundFlag(true);
        } else {
          setWorkout(data);
        }
      })
      .catch(() => {
        if (!cancelled) setNotFoundFlag(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (notFoundFlag) {
    notFound();
  }

  if (loading || !workout) {
    return (
      <section className="mx-auto max-w-content px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="aspect-square w-full animate-pulse rounded-2xl bg-surface" />
          <div className="flex flex-col gap-4">
            <div className="h-4 w-24 animate-pulse rounded bg-surface" />
            <div className="h-8 w-3/4 animate-pulse rounded bg-surface" />
            <div className="h-16 w-full animate-pulse rounded bg-surface" />
            <div className="h-40 w-full animate-pulse rounded bg-surface" />
          </div>
        </div>
      </section>
    );
  }

  const specs: [string, string][] = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating.toFixed(1)],
  ];

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);

  return (
    <section className="mx-auto max-w-content px-5 py-12 sm:px-8">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Left: media */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-edge bg-surface">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right: details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-ink sm:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {workout.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-edge bg-surface">
            {specs.map(([label, value], i) => (
              <div
                key={label}
                className={`flex items-center justify-between px-4 py-3 text-sm ${
                  i !== specs.length - 1 ? "border-b border-edge" : ""
                }`}
              >
                <span className="uppercase tracking-wide text-muted">
                  {label}
                </span>
                <span className="font-medium text-ink">{value}</span>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
              Instructions
            </h2>
            <ol className="mt-3 flex flex-col gap-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface2 text-xs font-semibold text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              onClick={() => addToPlan(workout)}
              disabled={inPlan}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-base transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {inPlan ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {inPlan ? "In today's plan" : "Add to today's plan"}
            </button>
            <button
              onClick={() => addToSaved(workout)}
              disabled={inSaved}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-edge px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              {inSaved ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              {inSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
