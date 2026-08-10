"use client";

import {motion, Variants} from "framer-motion";
import { FAQSetType } from "@/app/types/types";
import { FAQSet } from "@/lib/contants";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

type HomePageFAQProps = {
  otherStyles?: string;
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants : Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function HomePageFAQ({ otherStyles }: HomePageFAQProps) {
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
          <h2 className="title">
            Frequently Asked Questions
          </h2>

          <p className="max-w-xl text-sm leading-relaxed text-white/40">
            Common questions about my process, experience, and development workflow.
          </p>
        </motion.div>

        <motion.ul
          id="accordion-card"
          data-accordion="collapse"
          className="divide-y divide-white/10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          variants={listVariants}
        >
          {FAQSet.map((set, index) => (
            <QuestionItem key={index} Question={set.Question} Answer={set.Answer} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export function QuestionItem({ Question, Answer }: FAQSetType) {
  const [open, setOpen] = useState(false);

    return (
    <motion.li variants={itemVariants} className="border-b border-white/10">
      <button
        className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-300 hover:bg-surface cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium tracking-tight text-foreground">
          {Question}
        </span>

        {open ? (
          <ArrowUp className="size-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
        ) : (
          <ArrowDown className="size-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
        )}
      </button>

      <div className={`grid overflow-hidden transition-all duration-500 ease-in-out ${open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="max-w-2xl text-sm leading-relaxed text-text-faint">
            {Answer}
          </p>
        </div>
      </div>
    </motion.li>
  );
}
