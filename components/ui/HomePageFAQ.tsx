"use client";

import { FAQSetType } from "@/app/types/types";
import { FAQSet } from "@/lib/contants";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useState } from "react";

type HomePageFAQProps = {
  otherStyles?: string;
};

export default function HomePageFAQ({ otherStyles }: HomePageFAQProps) {
  return (
    <section className={`flex min-h-screen w-full py-24 md:py-32  overflow-hidden ${otherStyles}`}>
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="mb-10 space-y-3">

          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="max-w-xl text-sm leading-relaxed text-white/40">
            Common questions about my process, experience, and development workflow.
          </p>
        </div>

        <ul id="accordion-card" data-accordion="collapse" className="divide-y divide-white/10">
          {FAQSet.map((set, index) => (
            <QuestionItem key={index} Question={set.Question} Anwser={set.Anwser} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export function QuestionItem({ Question, Anwser }: FAQSetType) {
  const [open, setOpen] = useState(false);

    return (
    <li className="border-b border-white/10">
      <button
        className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-300 hover:text-white"
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
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {Anwser}
          </p>
        </div>
      </div>
    </li>
  );
}
