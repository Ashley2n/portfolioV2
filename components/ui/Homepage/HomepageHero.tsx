"use client";
import { motion } from "framer-motion";

import dynamic from "next/dynamic";

const LightPillar = dynamic(() => import("@/components/Backgrounds/LightPillar"), {
    ssr: false,
});

export default function HomepageHero() {
  return (
    <section className="snap-section relative isolate w-full h-screen overflow-hidden">
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
        <div className="mx-auto max-w-7xl px-6 "
        >
          <motion.p
              className="mt-6 max-w-xl text-2xl pl-2 md:pl-4 lg:pl-6 text-zinc-300"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0}}
              transition={{duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5}}
          >
            Software Developer
          </motion.p>
          <motion.h1
              className="xl:text-[14.8rem] text-[7rem] md:text-[8.6rem] font-bold font-teko uppercase text-zinc-100  -tracking-[0.1rem] leading-none"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0}}
              transition={{duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.7}}
          >
            Ashley Abongwa
          </motion.h1>
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
