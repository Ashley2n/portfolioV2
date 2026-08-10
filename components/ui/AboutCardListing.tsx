"use client";

import {useState} from "react";
import {aboutData} from "@/lib/contants";
import Image from "next/image";
import {motion, Variants} from "framer-motion";

export const AboutCardListing = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const listVariants: Variants = {
        hidden: {},
        show: {transition: {staggerChildren: 0.25}},
    };

    const itemVariants: Variants = {
        hidden: {opacity: 0, y: 16},
        show: {opacity: 1, y: 0, transition: {duration: 0.4, ease: [0.22, 1, 0.36, 1]}},
    };


    return (
        <div className={"page-container snap-section section-y "}>
            <motion.div
                className="mb-10 space-y-3"
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: false, amount: 0.3}}
                transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
            >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                    Fun Facts
                </p>

                <h2 className="title">
                    Interest
                </h2>

            </motion.div>
            <motion.ul
                initial={"hidden"}
                whileInView={"show"}
                viewport={{once: false, amount: 0.2}}
                variants={listVariants}
                className=" grid auto-rows-[250px] grid-cols-1 gap-5 md:grid-cols-3"
            >

                {aboutData.map((data, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <motion.li
                            key={index}
                            variants={itemVariants}
                            onClick={() => setActiveIndex(index)}
                            className={`
                  group relative overflow-hidden rounded-3xl
                border border-border-subtle bg-white/5
                transition-all duration-500 hover:scale-[1.02]
                hover:border-white/20 ${
                                data.size === "large"
                                    ? "md:col-span-2 md:row-span-2"
                                    : data.size === "medium"
                                        ? "md:col-span-2"
                                        : "md:col-span-1"
                            }
                `}
                        >
                            {/* Baclground Image */}
                            <Image
                                width={600}
                                height={100}
                                src={data.imageUrl}
                                alt={data.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"/>

                            {/* Content */}
                            <div
                                className={`
                    absolute bottom-6 z-10 p-6 transition-all duration-500
                    ${isActive ? "translate-y-0" : "translate-y-[72%]"}
                  `}
                            >
                                <h3 className="mb-3 text-3xl font-medium tracking-tight text-foreground">{data.title}</h3>

                                <p
                                    className={`
                      max-w-md text-sm leading-6 text-text-muted transition-all duration-500
                      ${
                                        isActive
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-10"
                                    }
                    `}
                                >
                                    {data.description}
                                </p>
                            </div>
                        </motion.li>
                    );
                })}
            </motion.ul>
        </div>

    );
};
