"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useHeaderScroll } from "@/app/hooks/useHeaderScroll";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isCompact, isHidden, isScrolled } = useHeaderScroll();
  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-[60] transition-all duration-500 ease-out pt-4 
          ${isHidden ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        <nav
          className={`
            mx-auto flex max-w-7xl items-center transition-all duration-500  px-12 py-2 rounded-full 
            ${
              isScrolled
                ? "bg-black/30 backdrop-blur-xl border border-white/10 shadow-lg w-fit justify-center"
                : "bg-transparent justify-between w-full"
            } 
          `}
        >
          {/* Logo */}
          <Link
            href="/"
            className={`
              font-bold italic font-chela transition-all duration-300
              ${isScrolled ? "hidden" : "block"}
            `}
          >
            Aa
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-white/80">
              Home
            </Link>
            <Link href="/projects" className="hover:text-white/80">
              Projects
            </Link>
            <Link href="/about" className="hover:text-white/80">
              About
            </Link>
            <div className="relative group">
              <li className="flex items-center gap-2">
                Menu
                <ChevronDown
                  size={16}
                  className="transition-transform group-hover:rotate-180"
                />
              </li>

              <div
                className="
        absolute right-0 mt-3 w-56
        rounded-2xl border border-white/10
        bg-black/40 p-3 backdrop-blur-xl
        opacity-0 invisible translate-y-2
        transition-all duration-300
        group-hover:opacity-100
        group-hover:visible
        group-hover:translate-y-0
      "
              >
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="block rounded-lg px-3 py-2 hover:bg-white/10"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects"
                      className="block rounded-lg px-3 py-2 hover:bg-white/10"
                    >
                      Projects
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/about"
                      className="block rounded-lg px-3 py-2 hover:bg-white/10"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/resume.pdf"
                      className="block rounded-lg px-3 py-2 hover:bg-white/10"
                    >
                      Resume
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            className={`${isScrolled && "hidden"}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            contact Me
          </button>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`
          fixed inset-0 z-50 md:hidden
          transition-opacity duration-300
          ${
            mobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-lg"
          onClick={() => setMobileOpen(false)}
        />

        <div className="absolute top-24 left-6 right-6 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <ul className="space-y-4 text-lg">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <a href="/resume.pdf">Resume</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

const links = [
  {
    label: "Projects",
    children: [
      {
        label: "Transcriber",
        path: "/projects/transcriber",
      },
      {
        label: "Cloud Splitter",
        path: "/projects/cloud",
      },
    ],
  },

  {
    label: "Services",
    children: [
      {
        label: "Development",
        path: "/services/dev",
      },
      {
        label: "Automation",
        path: "/services/automation",
      },
    ],
  },
];

//   // Compact dropdown
//   <div className="relative group">
//     <button className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 hover:bg-white/10">
//       Menu
//       <ChevronDown
//         size={16}
//         className="transition-transform group-hover:rotate-180"
//       />
//     </button>

//     <div
//       className="
//         absolute right-0 mt-3 w-56
//         rounded-2xl border border-white/10
//         bg-black/40 p-3 backdrop-blur-xl
//         opacity-0 invisible translate-y-2
//         transition-all duration-300
//         group-hover:opacity-100
//         group-hover:visible
//         group-hover:translate-y-0
//       "
//     >
//       <ul className="space-y-2">
//         <li>
//           <Link
//             href="/"
//             className="block rounded-lg px-3 py-2 hover:bg-white/10"
//           >
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/projects"
//             className="block rounded-lg px-3 py-2 hover:bg-white/10"
//           >
//             Projects
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/services"
//             className="block rounded-lg px-3 py-2 hover:bg-white/10"
//           >
//             Services
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/about"
//             className="block rounded-lg px-3 py-2 hover:bg-white/10"
//           >
//             About
//           </Link>
//         </li>
//         <li>
//           <a
//             href="/resume.pdf"
//             className="block rounded-lg px-3 py-2 hover:bg-white/10"
//           >
//             Resume
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
// )
// }

function DesktopNav() {
  return (
    <ul className="flex gap-10">
      {links.map((item) => (
        <li key={item.label} className="relative group">
          <button className="flex items-center gap-2">
            {item.label}

            <ChevronDown size={16} />
          </button>

          <div
            className="absolute top-8 left-0 opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 bg-black/50
backdrop-blur-xl rounded-xl border border-white/10 p-3 w-56 "
          >
            <ul>
              {item.children.map((child) => (
                <li key={child.path}>
                  <Link
                    href={child.path}
                    className=" block px-3 py-2 rounded-lg hover:bg white/10 "
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}

function MobileNav({ open }: { open: boolean }) {
  return (
    <div
      className={` fixed inset-0 z-50 md:hidden transition-all duration-500 ${open ? "opacity-100" : "opacity-0 pointer-events-none"} `}
    >
      <div className=" absolute inset-0 bg-black/60 backdrop-blur-xl " />

      <div className=" relative mt-24 mx-10 ">
        <ul className=" flex flex-col gap-8 items-center ">
          <li>
            <Link href="/projects">Projects</Link>

            <ul className=" mt-4 space-y-3 text-sm opacity-70 ">
              <li>
                <Link href="/projects/transcriber">Transcriber</Link>
              </li>

              <li>
                <Link href="/projects/cloud">Cloud Splitter</Link>
              </li>
            </ul>
          </li>

          <li>
            <Link href="/services">Services</Link>

            <ul className=" mt-4 space-y-3 text-sm opacity-70 ">
              <li>
                <Link href="/services/dev">Development</Link>
              </li>

              <li>
                <Link href="/services/automation">Automation</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
