"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fluidly scales a layout that's designed at a fixed `referenceWidth` down to
 * whatever width its container actually has. Returns `[ref, scale]`: attach
 * `ref` to the element you want to measure, then multiply your pixel sizes by
 * `scale` (a number in the range 0–1; never scales up past 1).
 *
 * The tech-stack constellation uses this so the desktop arrangement shrinks to
 * fit phones identically instead of needing separate per-breakpoint layouts.
 */
export function useContainerScale(referenceWidth) {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateScale = () =>
      setScale(Math.min(1, element.clientWidth / referenceWidth));
    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(element);
    return () => observer.disconnect();
  }, [referenceWidth]);

  return [ref, scale];
}
