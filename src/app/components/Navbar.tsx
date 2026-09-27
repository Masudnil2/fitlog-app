import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "./context/PlanProvider";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-base/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={26} height={26} />
          <span className="font-display text-lg font-semibold tracking-wide text-ink">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  active
                    ? "text-accent"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-base transition-opacity hover:opacity-90"
          >
            Plan
            <span className="rounded-full bg-base/15 px-1.5 py-0.5 text-[11px] leading-none">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-edge px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Saved
            <span className="rounded-full bg-surface2 px-1.5 py-0.5 text-[11px] leading-none">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      {/* mobile nav links */}
      <nav className="flex items-center gap-6 border-t border-edge px-5 py-2.5 md:hidden">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide ${
                active ? "text-accent" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}