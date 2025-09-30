"use client";

import { headerLinks } from "@/utils/types/navigation";
import { link } from "fs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// TODO:
//  [ ] Read Nav links from an array

export default function header() {
  const handleResumeOnclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Downloading Resume");
    console.log("Event Target: ", event.currentTarget);
  };

  const [isMobile, setIsMobile] = useState(false);

  return (
    <header className="">
      <div className=" text-white/90 flex justify-between items-center px-10 py-4 z-60">


        <div>
          <Link href={"/"}
          className="font-bold italic text-2xl">
            Aa</Link>
        </div>


        <nav>
          <ol className="md:flex gap-4 bg-neutral-800 py-2 px-4 rounded-2xl hidden">
            {headerLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path}>{link.label}</Link>
              </li>
            ))}
          </ol>
        </nav>


        {/* Resume Button */}
        <button
          onClick={handleResumeOnclick}
          className="hidden md:block bg-neutral-100 text-neutral-900 px-4 py-1 rounded-xl font-medium"
        >
          <Link href={""}>Resume</Link>
        </button>


        {/* Menu Button */}
        <div className="ml-auto md:hidden">
          <button onClick={() => {
            setIsMobile(!isMobile)
            
          }}
            className="flex items-center gap-6 z-50">
            {isMobile ? 
            <X onClick={()=> document.body.style.overflow = 'unset' } width={30} /> : 
            <Menu onClick={() => document.body.style.overflow = 'hidden'} width={30}/>}
          </button>
        </div>


      </div>


      {/* Mobile Menu Items */}
      {isMobile && (
        <div className=" fixed top-15 left-0 h- w-full py-20 space-y-6 z-40 backdrop-blur-md h-full">
          <ul className="flex gap-8 flex-col text-center text-neutral-100 text-2xl font-medium h-full ">
            {headerLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path} title={link.label}
                onClick={()=> {setIsMobile(!isMobile)}}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

    </header>
  );
}
