'use client';
import {motion} from "framer-motion";
import ContactMeButton from "./ContactMeButton";
import LiquidEther from "@/components/Backgrounds/LiquidEther";
import {GeneralModal} from "@/components/ui/modals/GeneralModal";
import {ReviewForm} from "@/components/ui/ReviewForm";
import React, {useState} from "react";

export const AboutMeCardItem = () => {
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    return (
        <>
        <section className="page-shell !h-screen">
            <div className="relative isolate h-120 w-full overflow-hidden rounded-2xl">
                <div className="absolute inset-0 z-10">
                    <LiquidEther
                        colors={['#5227FF', '#FF9FFC', '#B497CF']}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={46}
                        resolution={0.4}
                        isBounce
                        autoDemo
                        autoSpeed={0.3}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                </div>

                {/* Overlay */}
                <div
                    className="absolute inset-0 z-40 rounded-2xl bg-gradient-to-t from-black via-black/80 to-transparent"/>
                <motion.div
                    className="absolute inset-x-0 bottom-0 z-50 mx-auto max-w-xl space-y-6 px-6 pb-14 text-center md:pb-16"
                    initial={{opacity: 0, y: 24}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: false, amount: 0.3}}
                    transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
                >
                    <div className="space-y-4">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-faint">
                            Software Developer — Iowa, US
                        </p>
                        <p className="text-sm font-light leading-relaxed text-text-muted md:text-base">
                            I&apos;m Ashley Abongwa — a full-stack developer finishing my degree in
                            Software Development at Indian Hills Community College, building with
                            React, Python, and .NET. A few things about me beyond the code are just
                            below.
                        </p>
                    </div>
                        <button
                            className="cursor-pointer text-xs text-text-muted underline transition-colors hover:text-white"
                            onClick={() => setReviewModalOpen(!reviewModalOpen)}
                        >
                            Drop a Review
                        </button>
                </motion.div>
            </div>
        </section>
            <GeneralModal isOpen={reviewModalOpen} onClose={() => setReviewModalOpen(false)}>
                <ReviewForm/>
            </GeneralModal>
        </>
    );
};
