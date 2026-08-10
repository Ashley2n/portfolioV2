'use client';
import {ProjectCardType} from "@/app/types/types";
import {HomePagePorjectData} from "@/lib/contants";
import {truncatedText} from "@/utils/helper";
import {motion, Variants} from "framer-motion";
import {ArrowRight, ArrowUpRight} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HPProjectsProps {
    otherStyles?: string;
}

const listVariants: Variants = {
    hidden: {},
    show: {transition: {duration: 0.5, delay: 0.3, staggerChildren: 0.5}},
};

const itemVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomePageProjects({otherStyles}: HPProjectsProps) {
    return (
        <section className={`section-y ${otherStyles ?? ""}`}>
            <div className="page-container">
                <motion.div
                    className="mb-10 flex items-end justify-between"
                    initial={{opacity: 0, y: -24}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.5}}
                >
                    <div>
                        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-white/40">
                            Selected Work
                        </p>

                        <h2 className="title">
                            Recent Projects
                        </h2>
                    </div>

                    <Link
                        href="/projects"
                        className="group hidden items-center gap-2 text-sm text-white/60 transition-colors hover:text-white md:flex"
                    >
                        View all
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>
                </motion.div>

                <motion.ul
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
                    initial="hidden"
                    whileInView="show"
                    viewport={{once: false, amount: 0.2}}
                    variants={listVariants}
                >
                    {HomePagePorjectData.map((item) => (
                        <motion.li
                            key={item.title}
                            variants={itemVariants}
                        >
                            <Cards item={item}/>
                        </motion.li>
                    ))}
                </motion.ul>

                <Link
                    href="/projects"
                    className="group mt-8 flex items-center gap-2 text-sm text-white/60 md:hidden"
                >
                    View all
                    <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </section>
    );
}

const Cards = ({item}: { item: ProjectCardType }) => {
    return (
        <Link
            href={item.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden"
        >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5">
                <Image
                    fill
                    src={
                        item.imageUrl
                            ? `/images${item.imageUrl}`
                            : "/images/placeholderProjectImage2.jpg"
                    }
                    alt={item.title}
                    className="object-cover translate-y-2 scale-105 transition-transform duration-700 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-110 rotate-8 translate-x-10 shadow-2xl shadow-amber-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>

            <div className="pt-5">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-white/70">
                        {item.title}
                    </h3>

                    <ArrowUpRight
                        size={18}
                        className="shrink-0 -translate-x-1 translate-y-1 text-white/30 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                </div>

                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/40">
                    {truncatedText({text: item.subtext, maxWords: 10})}
                </p>
            </div>
        </Link>
    );
};
