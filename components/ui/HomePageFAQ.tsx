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
    <section className={` ${otherStyles} min-h-screen flex justify-center items-center h-full`}>
      <div className="flex justify-center flex-col lg: items-center h-full w-full ">
        <h2 className="title text-center">Freqently Asked <br/>Questions</h2>
        
        <ul
          className="w-full p-4 space-y-4 mt-10"
          id="accordion-card"
          data-accordion="collapse"
        >
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
    <>
      <div className="w-90 lg:w-260 mx-auto">
        <input
          id="expandCollapse"
          checked={open}
          type="checkbox"
          className="peer sr-only"
        />
        <label
          htmlFor="expandCollapse"
          className={
            "w-full flex items-center justify-between px-8 bg-zinc-900 hover:bg-zinc-700 transition-colors  outline outline-neutral-800/80  p-4 rounded-md gap-4 duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg shadow-neutral-900 cursor-pointer"
          }
          onClick={() => setOpen(!open)}
        >
          {Question}
          {open? (<ArrowUp
            height={20}
            width={20}
            className={`ml-4 `}
          />) :
          (
            <ArrowDown
            height={20}
            width={20}
            className={`ml-4 `}
          />
          )}
          
        </label>
        <div
          className={
            "overflow-hidden h-0  peer-checked:h-75 peer-checked:border peer-checked:border-zinc-800 peer-checked:-mt-2 peer-checked:border-t-0 transition-[height] duration-1000 ease-in-out bg-zinc-900   border-neutral-800/80"
          }
        >
          <p className="text-zinc-300 p-4">
            {Anwser}
          </p>
        </div>
      </div>
    </>
  );
}
