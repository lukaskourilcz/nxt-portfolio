"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the page has been scrolled more than `offset` pixels down
 * from the top. The navbar uses this to switch to its condensed, solid state.
 */
export function useScrolled(offset = 0) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > offset);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return scrolled;
}
