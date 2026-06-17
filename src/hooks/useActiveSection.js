"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy. Given the ids of the page's sections, returns the id of the one
 * currently within the viewport's reading band (roughly its vertical middle).
 * Drives the "you are here" highlight in the navbar.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState("");

  // Depend on the joined ids (a primitive) rather than the array reference, so
  // the observer is only rebuilt when the actual list of sections changes.
  const sectionIdsKey = sectionIds.join(",");

  useEffect(() => {
    const sections = sectionIdsKey
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIdsKey]);

  return activeId;
}
