'use client';

import { motion } from "framer-motion";
import ContactMeButton from "../Buttons/ContactMeButton";
import {cn} from "@/lib/utils";
import dynamic from "next/dynamic";

const Particles = dynamic(() => import("@/components/Backgrounds/Particles"), {
    ssr: false,
});
type HomePagePitchProps = {
    otherStyles?: string;
};
export default function HomePagePitch({otherStyles}: HomePagePitchProps) {

    return (
        <section
            className={cn(otherStyles, "section-y relative overflow-hidden")}
        >

            <div className="absolute inset-0 z-0">
                <Particles
                    particleColors={["#ffffff"]}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover
                    alphaParticles={false}
                    disableRotation={false}
                    pixelRatio={1}
                />
            </div>

            {/* Overlay: darkens the center so text stays legible over the particles,
                fades to transparent toward the edges so the effect still reads there.
                pointer-events-none so hover still reaches the particles layer underneath. */}
            <div
                aria-hidden
                className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_65%_70%_at_50%_50%,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_55%,transparent_85%)]"
            />

            <motion.div
                className="page-container relative z-10 flex flex-col items-center justify-center gap-6 text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1 className="text-2xl font-semibold">Let&apos;s build something great together. </h1>
                <p className="px-12 text-zinc-300 text-sm font-thin lg:w-1/2 mb-4">I&apos;m currently open to new
                    opportunities and ready to collaborate. If you value clean architecture, clear communication, and a
                    partner who cares about the product as much as you do, we should talk.</p>
                <ContactMeButton/>
            </motion.div>
        </section>
    );
}
