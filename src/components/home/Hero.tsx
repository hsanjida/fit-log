import Image from "next/image";
import { ArrowDownIcon } from "@/lib/icons";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 sm:px-6 pt-12 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="font-display uppercase tracking-[0.2em] text-accent text-sm mb-4">
          Workout Library
        </p>
        <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6">
          Train with intent.
          <br />
          Log every set.
        </h1>
        <p className="text-base-content/70 max-w-md mb-8">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s
          plan, and watch the week&apos;s work add up.
        </p>
        <a href="#library" className="btn btn-accent gap-2">
          Browse Workouts
          <ArrowDownIcon className="w-4 h-4" />
        </a>
      </div>

      <div className="relative aspect-square w-full max-w-md mx-auto md:max-w-none">
        <Image
          src="/assets/banner.png"
          alt="Illustration of an athlete training on a gym machine"
          fill
          sizes="(min-width: 768px) 40vw, 80vw"
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
