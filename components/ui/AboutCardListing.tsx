"use client";

import React, { useState } from "react";
import { aboutData } from "@/lib/contants";
import Image from "next/image";


type aboutCardListingProps = {
  onclick: () => void;
};


export const AboutCardListing = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ul className="grid px-10 md:px-[10%] auto-rows-[250px] grid-cols-1 gap-5 md:grid-cols-3">
      {aboutData.map((data, index) => {
        const isActive = activeIndex === index;
        return (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`
                  group relative overflow-hidden rounded-3xl
                border border-white/10 bg-zinc-900
                transition-all duration-500 hover:scale-[1.02]
                hover:border-orange-500/50} ${
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

            {/* Content */}
            <div
              className={`
                    absolute bottom-6 z-10 p-6 transition-all duration-500
                    ${isActive ? "translate-y-0" : "translate-y-[72%]"}
                  `}
            >
              <h3 className="mb-3 text-3xl font-bold">{data.title}</h3>

              <p
                className={`
                      max-w-md text-sm leading-6 text-zinc-200 transition-all duration-500
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
          </li>
        );
      })}
    </ul>
  );
};

// {aboutData.map((data) => (
//         <li
//           key={data.title}
//           className="bg-neutral-900 px-5 py-5 flex gap-10 items-center justify-center rounded-md"
//         >
//           <div className="flex flex-col gap-4">
//             <h2 className="text-2xl font-bold">{data.title}</h2>

//             <p>{data.text}</p>
//           </div>
//           <Image
//             src={data.Image}
//             alt={`Image for ${data.title}`}
//             width={200}
//             height={200}
//           />
//         </li>
//       ))}
