"use client";

import { headerLinks } from "@/utils/types/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ContactMeButton from "../ui/ContactMeButton";
import TextFlipButton from "../ui/TextFlipButton";

// TODO:
//  [ ] Read Nav links from an array

export default function Header() {
  const handleResumeOnclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Downloading Resume");
    console.log("Event Target: ", event.currentTarget);
  };

  const [isMobile, setIsMobile] = useState(false);

  return (
    <header className=" absolute w-full px-10 py-2 ">
      <div className="sticky BBG rounded-full flex justify-between items-center px-10 py-2 z-60">
        {/* Logo Button */}
        <div>
          <Link href={"/"} className="font-bold italic text-2xl font-chela">
            Aa
          </Link>
        </div>

{/* Header links */}
        <nav>
          <ol className="md:flex gap-1 px-4 rounded-2xl hidden text-sm">
            {headerLinks.map((link) => (
              <li
                key={link.path}
                className="li-hover"
              >
                <Link
                  href={link.path}
                  className="link-hover"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        {/* Resume Button */}
        <div className="hidden md:flex">
          <TextFlipButton text="Resume" />
        </div>

        {/* Menu Button */}
        <div className="ml-auto md:hidden">
          <button
            onClick={() => {
              setIsMobile(!isMobile);
            }}
            className="flex items-center gap-6 z-50"
          >
            {isMobile ? (
              <X
                onClick={() => (document.body.style.overflow = "")}
                width={30}
              />
            ) : (
              <Menu
                onClick={() => (document.body.style.overflow = "hidden")}
                width={30}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMobile && (
        <div className="BBG absolute top-20 left-10 w-9/10  h-[80vh] z-60 rounded-2xl transition-colors">
          <ul className="flex gap-8 flex-col text-center subtitle h-full items-center justify-center w-full ">
            {headerLinks.map((link) => (
              <li key={link.path} className="li-hover w-full">
                <Link
                  href={link.path}
                  title={link.label}
                  onClick={() => {
                    setIsMobile(!isMobile);
                    document.body.style.overflow = "unset";
                  }}
                  className="link-hover"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <TextFlipButton text="Resume" />
          </ul>
        </div>
      )}
    </header>
  );
}
