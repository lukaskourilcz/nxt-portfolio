"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the element with the given id is currently visible in the
 * viewport. The navbar uses it to swap its "LK" logo for the profile photo
 * once the hero avatar has scrolled out of view. `rootMargin` lets callers
 * shrink the viewport — e.g. to discount the height of the sticky navbar.
 *
 * Defaults to true so the first paint matches the page starting at the top.
 */
export function useElementOnScreen(elementId, { rootMargin } = {}) {
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
