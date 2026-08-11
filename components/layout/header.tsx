"use client";

import {useEffect, useState} from "react";
import {AnimatePresence, motion, Variants} from "framer-motion";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {ChevronDown, Menu, X} from "lucide-react";
import {useHeaderScroll} from "@/hooks/useHeaderScroll";
import {headerLinks} from "@/utils/types/navigation";
import Image from "next/image";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const MOBILE_BREAKPOINT_QUERY = "(max-width: 767px)";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const {isHidden, isScrolled} = useHeaderScroll();
    const pathname = usePathname();

    // Belt-and-suspenders close: the onClick handlers on the drawer links below
    // close it immediately (feels snappier), but this catches every other way
    // the route can change — the logo link, browser back/forward, anything added
    // later without an onClick — so the drawer never survives a navigation.
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // Lock the page behind the mobile drawer while it's open — but only on an
    // actual mobile viewport. `overflow: hidden` alone doesn't reliably stop
    // touch-scrolling on iOS Safari, so this pins the body with
    // `position: fixed` (the standard cross-browser body-scroll-lock trick)
    // and restores the exact scroll position when the drawer closes or the
    // viewport grows past `md`.
    useEffect(() => {
        if (!mobileOpen) return;

        const mql = window.matchMedia(MOBILE_BREAKPOINT_QUERY);
        if (!mql.matches) return;

        const scrollY = window.scrollY;
        const {body} = document;

        const lock = () => {
            body.style.position = "fixed";
            body.style.top = `-${scrollY}px`;
            body.style.left = "0";
            body.style.right = "0";
            body.style.width = "100%";
        };

        const unlock = () => {
            body.style.position = "";
            body.style.top = "";
            body.style.left = "";
            body.style.right = "";
            body.style.width = "";
            window.scrollTo(0, scrollY);
        };

        lock();

        // If the viewport is resized past `md` while the drawer is open
        // (e.g. rotating a tablet or resizing a browser window), release the lock.
        const onChange = (e: MediaQueryListEvent) => {
            if (!e.matches) unlock();
        };
        mql.addEventListener("change", onChange);

        return () => {
            mql.removeEventListener("change", onChange);
            unlock();
        };
    }, [mobileOpen]);

    const listVariants: Variants = {
        hidden: {},
        show: {transition: {staggerChildren: 0.08}},
    };

    const itemVariants: Variants = {
        hidden: {opacity: 0, y: 16},
        show: {opacity: 1, y: 0, transition: {duration: 0.4, ease: [0.22, 1, 0.36, 1]}},
    };


    return (
        <>
            <motion.header
                className="fixed top-0 left-0 w-full z-[60] pt-4 px-4 lg:px-0"
                initial={false}
                animate={{y: isHidden ? "-100%" : "0%"}}
                transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
            >
                <nav
                    className={`
            relative mx-auto flex items-center justify-between
            transition-[max-width,padding] duration-500 ${EASE}
            ${isScrolled ? "max-w-3xl px-6 py-2" : "max-w-7xl px-8 py-3"}
          `}
                >
                    <div
                        aria-hidden
                        className={`
              absolute inset-0 rounded-full border pointer-events-none
              transition-all duration-500 ${EASE}
              ${
                            isScrolled
                                ? "opacity-100 bg-surface backdrop-blur-2xl border-border-subtle shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.4)]"
                                : "opacity-0 bg-transparent border-transparent shadow-none"
                        }
            `}
                    />

                    {/* Logo — collapses via max-width + opacity instead of hidden/block snap */}
                    <Link
                        href="/"
                        className={`
              relative overflow-hidden shrink-0 font-bold italic font-teko
              transition-all duration-400 ${EASE} px-2 opacity-100 
            `}
                    >
                        <Image src="Logos/aa-logo-32-black-bg.svg" alt="Logo" width={32} height={32}
                               className="rounded-md"/>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="relative hidden md:flex items-center gap-8">
                        <Link href="/" className="text-text-muted transition-colors hover:text-white">
                            Home
                        </Link>
                        <Link href="/projects" className="text-text-muted transition-colors hover:text-white">
                            Projects
                        </Link>
                        <Link href="/about" className="text-text-muted transition-colors hover:text-white">
                            About
                        </Link>

                        <div className="relative group">
                            <button
                                className="flex items-center gap-2 text-text-muted transition-colors hover:text-white">
                                Menu
                                <ChevronDown
                                    size={16}
                                    className="transition-transform group-hover:rotate-180"
                                />
                            </button>

                            <div
                                className="
                              absolute right-0 mt-3 w-56 rounded-2xl border border-border-subtle
                              bg-surface p-3 backdrop-blur-2xl
                              opacity-0 invisible translate-y-2
                              transition-all duration-300
                              group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                            "
                            >
                                <ul className="space-y-1">
                                    {mobileOpen || isScrolled && <li>
                                        <Link
                                            href="/contact"
                                            className="block rounded-lg px-3 py-2 text-text-muted hover:bg-white/[0.06] hover:text-white"
                                        >
                                            Contact Me
                                        </Link>
                                    </li>
                                    }
                                    <li>
                                        <a
                                            href="/resume.pdf"
                                            className="block rounded-lg px-3 py-2 text-text-muted hover:bg-white/[0.06] hover:text-white"
                                        >
                                            Resume
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {!(isScrolled && mobileOpen) && (
                        <Link
                            href={"/contact"}
                            className={`
                relative hidden md:block overflow-hidden shrink-0 rounded-md
                transition-[max-width,opacity] duration-400 ${EASE} cursor-pointer
                ${isScrolled ? "max-w-0 opacity-0 pointer-events-none" : "max-w-[140px] opacity-100"}
              `}
                        >
                                <button
                                    className="
                  relative whitespace-nowrap rounded-lg bg-foreground px-5 py-2
                  text-sm font-medium tracking-tight text-background
                  shadow-[0_1px_2px_rgba(0,0,0,0.08),0_10px_24px_-6px_rgba(0,0,0,0.35)]
                  transition-transform duration-400 ease-out cursor-pointer
                  hover:scale-[1.04] active:scale-95
                "
                                    aria-label="Contact Button"
                                >
                                    Contact Me
                                </button>
                        </Link>
                    )}

                    {/* Mobile Button */}
                    <button
                        className="relative text-white md:hidden cursor-pointer"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={28}/> : <Menu size={28}/>}
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 md:hidden"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                    >
                        <div
                            className="absolute inset-0 bg-overlay backdrop-blur-2xl "
                            onClick={() => setMobileOpen(false)}
                        />

                        <motion.div
                            className="absolute top-24 left-6 right-6 rounded-2xl mx-auto border border-border-subtle bg-surface h-[80%] w-[80%] p-6 backdrop-blur-2xl"
                            initial={{y: -20, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: -20, opacity: 0}}
                            transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                        >
                            <motion.ul
                                variants={listVariants}
                                className="space-y-4 text-lg text-text-muted w-full text-center"
                            >
                                {headerLinks.map(link => (
                                    <motion.li
                                        key={link.label}
                                        variants={itemVariants}
                                        className={"w-full link-hover hover:text-white"}
                                    >
                                        <Link href={link.path} onClick={() => setMobileOpen(false)}>
                                            {link.label}
                                        </Link>
                                    </motion.li>
                                ))}

                            </motion.ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}