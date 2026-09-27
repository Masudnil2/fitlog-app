import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-edge bg-surface">
      <div className="mx-auto flex max-w-content flex-col items-center gap-3 px-5 py-8 text-center sm:flex-row sm:justify-between sm:text-left sm:px-8">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={20} height={20} />
          <span className="font-display text-sm font-semibold tracking-wide text-ink">
            FITLOG
          </span>
        </div>
        <p className="text-xs text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
