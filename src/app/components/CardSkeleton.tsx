export default function CardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-edge bg-surface">
      <div className="aspect-[4/3] w-full animate-pulse bg-surface2" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-3 w-16 animate-pulse rounded-full bg-surface2" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface2" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-surface2" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-surface2" />
      </div>
    </div>
  );
}
