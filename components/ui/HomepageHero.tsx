"use client";
import LightPillar from "../Backgrounds/LightPillar";

export default function HomepageHero() {
  return (
    <section className="relative isolate w-full h-screen overflow-hidden">
      {/* <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1.3}
        rotationSpeed={0.3}
        glowAmount={0.0025}
        pillarWidth={5}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={25}
        interactive
        mixBlendMode="screen"
        quality="high"
        className="abolute inset-0"
      /> */}

      {/* Content */}
      <div className="relative z-10 flex h-full items-end justify-baseline ">
        <div className="mx-auto max-w-7xl px-6 ">
          <p className="mt-6 max-w-xl text-2xl pl-6 text-zinc-300">
            Software Developer
          </p>
          <h1 className="text-[14.8rem] font-bold font-teko uppercase text-zinc-100  -tracking-[0.1rem] leading-none">
            Ashley Abongwa
          </h1>
        </div>
      </div>

      {/* Fade into next section */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-64
          w-full
          bg-gradient-to-b
          from-transparent
          via-zinc-950/60
          to-background
        "
      />
    </section>
  );
}

// lex justify h-[80vh] md:h-[70vh] lg:h-[60vh] py-5  justify-center
