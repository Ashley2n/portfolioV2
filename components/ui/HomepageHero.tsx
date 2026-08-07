"use client";
import LightPillar from "../Backgrounds/LightPillar";

export default function HomepageHero() {
  return (
    <section className="relative isolate w-full h-screen overflow-hidden">
      {/* Background */}
      {/* <LightPillar
        className="absolute inset-0"
        interactive
        intensity={1.2}
      /> */}
      <LightPillar
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
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-7xl font-bold text-zinc-100">
            Software Developer
          </h1>

          <p className="mt-6 max-w-xl text-zinc-300">
            Building cloud-native applications and AI workflows.
          </p>
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
          to-black
        "
      />
    </section>
  );
}

// lex justify h-[80vh] md:h-[70vh] lg:h-[60vh] py-5  justify-center
