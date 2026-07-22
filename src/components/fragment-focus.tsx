"use client";

import { useEffect } from "react";

/** Moves keyboard focus to an in-page destination after fragment navigation. */
export function FragmentFocus() {
  useEffect(() => {
    let animationFrame = 0;

    function focusFragmentHeading() {
      window.cancelAnimationFrame(animationFrame);

      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;

      const section = document.getElementById(id);
      const heading = section?.querySelector<HTMLElement>("[data-fragment-heading]");
      if (!heading) return;

      animationFrame = window.requestAnimationFrame(() => heading.focus({ preventScroll: true }));
    }

    focusFragmentHeading();
    window.addEventListener("hashchange", focusFragmentHeading);

    return () => {
      window.removeEventListener("hashchange", focusFragmentHeading);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return null;
}
