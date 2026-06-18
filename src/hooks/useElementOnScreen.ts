"use client";

import { useEffect, useState } from "react";

// Tracks whether the element with the given id is on screen. `rootMargin`
// shrinks the viewport (e.g. to account for the sticky navbar). Defaults to
// true to match the initial paint at the top of the page.
export function useElementOnScreen(
  elementId: string,
  { rootMargin }: { rootMargin?: string } = {}
): boolean {
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin, threshold: 0 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [elementId, rootMargin]);

  return onScreen;
}
