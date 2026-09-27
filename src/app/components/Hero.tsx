import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="border-b border-edge bg-base">
      <div className="mx-auto grid max-w-content items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-edge px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-accent">
            WORKOUT LIBRARY
          </span>
          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-ink sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-base transition-opacity hover:opacity-90"
          >
            Browse Workouts
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />
          <Image
            src="/banner.png"
            alt="Illustration of an athlete mid-lift"
            fill
            priority
            className="relative object-contain drop-shadow-[0_0_40px_rgba(204,255,0,0.15)]"
          />
        </div>
      </div>
    </section>
  );
}
