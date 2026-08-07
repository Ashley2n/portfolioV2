"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      setScrolled(current > 50);

      if (current > lastScroll && current > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${hidden ? "-translate-y-full" : "translate-y-0"} ${scrolled ? ` backdrop-blur-xl border-b border-white/10 ` : "bg-transparent"} `}
      >
        <nav className="flex items-center justify-between px-10 py-3">
          <Link href="/" className=" font-bold italic text-2xl">
            Aa
          </Link>

          {/* Desktop */}
          <div className="hidden md:block">
            <DesktopNav />
          </div>

          <div className="hidden md:block">
            <button>Resume</button>
          </div>

          {/* Mobile button */}

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      {/* Mobile menu lives outside header */}

      <MobileNav open={mobileOpen} />
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
