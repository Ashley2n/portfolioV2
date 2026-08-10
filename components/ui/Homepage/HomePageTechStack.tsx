"use client";

import {motion, Variants} from "framer-motion";
import { TechStackType } from "@/app/types/types";
import { TechStackData } from "@/lib/contants";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TechStackProp = {
  otherStyles?: string;
};

const listVariants : Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomePageTechStack({ otherStyles }: TechStackProp) {
return (
  <section className={`section-y ${otherStyles ?? ""}`}>
    <div className="page-container">
      <motion.div
        className="mb-10 space-y-3"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
          Technologies
        </p>

        <h2 className="title">
          Tech Stack
        </h2>
      </motion.div>

      <motion.ul
        className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        variants={listVariants}
      >
        {TechStackData.map((item) => (
          <TechStackItem key={item.name} data={item} />
        ))}
      </motion.ul>
    </div>
  </section>
);
}

export function TechStackItem({ data }: { data: TechStackType }) {
 return (
    <motion.li variants={itemVariants}>
      <Link
        href={data.externalURL}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-white/[0.04]">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-white/20">
            <Image src={data.imageURL} alt={data.name} width={20} height={20} className="opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium tracking-tight text-foreground">
              {data.name}
            </p>

            <p className="text-xs text-text-faint">
              {data.usage}
            </p>
          </div>

          <ArrowUpRight className="size-3.5 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
      </Link>
    </motion.li>
  );
}
