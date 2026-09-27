"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, X, Dumbbell } from "lucide-react";
import { usePlan, PLAN_CAP } from "@/context/PlanProvider";
import StatsRow from "@/components/StatsRow";
import { PlanEntry, Workout } from "@/lib/types";

type Tab = "today" | "saved";

export default function MyPlanPage() {
  const { plan, saved, hydrated, removeFromPlan, removeFromSaved, markDone } =
    usePlan();
  const [tab, setTab] = useState<Tab>("today");
  const [showLoading, setShowLoading] = useState(true);

  // Brief loading state while the plan hydrates from storage
  useEffect(() => {
    if (hydrated) {
      const t = setTimeout(() => setShowLoading(false), 350);
      return () => clearTimeout(t);
    }
  }, [hydrated]);

  const metrics = useMemo(() => {
    const exercises = plan.length;
    const minutes = plan.reduce((sum, w) => sum + w.duration, 0);
    const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);
    return { exercises, minutes, calories };
  }, [plan]);

  const list = tab === "today" ? plan : saved;
  const loading = showLoading || !hydrated;

  return (
    <section className="mx-auto max-w-content px-5 py-12 sm:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-ink">
          My Plan
        </h1>
        <p className="mt-1 text-sm text-muted">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics */}
      <div className="mb-8 grid grid-cols-3 gap-3 sm:gap-5">
        <MetricCard label="Exercises" value={metrics.exercises} />
        <MetricCard label="Minutes" value={metrics.minutes} />
        <MetricCard label="Calories" value={metrics.calories} />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex w-fit gap-1 rounded-full border border-edge bg-surface p-1">
        <TabButton
          active={tab === "today"}
          onClick={() => setTab("today")}
          label={`Today's Plan (${plan.length}/${PLAN_CAP})`}
        />
        <TabButton
          active={tab === "saved"}
          onClick={() => setTab("saved")}
          label={`Saved (${saved.length})`}
        />
      </div>

      {loading ? (
        <p className="py-16 text-center text-sm text-muted">
          Loading workouts…
        </p>
      ) : list.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-4">
          {list.map((workout) =>
            tab === "today" ? (
              <PlanRow
                key={workout.id}
                workout={workout as PlanEntry}
                onRemove={() => removeFromPlan(workout.id)}
                onMarkDone={() => markDone(workout.id)}
              />
            ) : (
              <SavedRow
                key={workout.id}
                workout={workout}
                onRemove={() => removeFromSaved(workout.id)}
              />
            )
          )}
        </div>
      )}
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-edge bg-surface px-4 py-5 text-center sm:text-left">
      <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${
        active ? "bg-accent text-base" : "text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-edge py-20 text-center">
      <Dumbbell className="h-10 w-10 text-muted" />
      <div>
        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-ink">
          Nothing here yet
        </h3>
        <p className="mt-1 text-sm text-muted">
          Browse the library and add a lift to get today moving.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-base transition-opacity hover:opacity-90"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function RowShell({
  workout,
  children,
}: {
  workout: Workout;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-edge bg-surface p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg bg-surface2 sm:h-16 sm:w-16">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <StatsRow
          duration={workout.duration}
          caloriesBurned={workout.caloriesBurned}
          rating={workout.rating}
          className="mt-1.5"
        />
      </div>
      {children}
    </div>
  );
}

function PlanRow({
  workout,
  onRemove,
  onMarkDone,
}: {
  workout: PlanEntry;
  onRemove: () => void;
  onMarkDone: () => void;
}) {
  return (
    <RowShell workout={workout}>
      <div className="flex items-center gap-2 sm:shrink-0">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-edge px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        <button
          onClick={onMarkDone}
          className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
            workout.done
              ? "bg-accent/20 text-accent"
              : "bg-accent text-base hover:opacity-90"
          }`}
        >
          <Check className="h-3.5 w-3.5" />
          {workout.done ? "Done" : "Mark as Done"}
        </button>
        <button
          onClick={onRemove}
          aria-label="Remove from plan"
          className="rounded-full border border-edge p-2 text-muted transition-colors hover:border-red-400 hover:text-red-400"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </RowShell>
  );
}

function SavedRow({
  workout,
  onRemove,
}: {
  workout: Workout;
  onRemove: () => void;
}) {
  return (
    <RowShell workout={workout}>
      <div className="flex items-center gap-2 sm:shrink-0">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-edge px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        <button
          onClick={onRemove}
          aria-label="Remove from saved"
          className="rounded-full border border-edge p-2 text-muted transition-colors hover:border-red-400 hover:text-red-400"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </RowShell>
  );
}
