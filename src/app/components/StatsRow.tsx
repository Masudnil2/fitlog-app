import { Clock, Flame, Star } from "lucide-react";

export default function StatsRow({
  duration,
  caloriesBurned,
  rating,
  className = "",
}: {
  duration: number;
  caloriesBurned: number;
  rating: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 text-xs text-muted ${className}`}>
      <span className="flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" />
        {duration} min
      </span>
      <span className="flex items-center gap-1">
        <Flame className="h-3.5 w-3.5" />
        {caloriesBurned} kcal
      </span>
      <span className="flex items-center gap-1 text-accent">
        <Star className="h-3.5 w-3.5 fill-accent" />
        {rating.toFixed(1)}
      </span>
    </div>
  );
}