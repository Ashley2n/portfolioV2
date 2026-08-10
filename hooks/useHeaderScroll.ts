"use client";

import { useEffect, useState } from "react";

type HeaderScrollState = {
  isScrolled: boolean;
  isCompact: boolean;
  isHidden: boolean;
};

export function useHeaderScroll(): HeaderScrollState {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      const current = window.scrollY;

      // Background appears after 40px
      setIsScrolled(current > 40);

      // Switch to compact nav after 180px
      setIsCompact(current > 180);

      // Hide header only when scrolling down past 180px
      if (current > lastScrollY && current > 180) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY = current;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { isScrolled, isCompact, isHidden };
}
