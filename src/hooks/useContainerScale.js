"use client";

import { useEffect, useRef, useState } from "react";

// Scales a layout built at a fixed `referenceWidth` down to its container.
// Returns [ref, scale]: attach `ref` to the container and multiply sizes by
// `scale` (0–1, never above 1). Lets the stack layout shrink intact on phones.
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
