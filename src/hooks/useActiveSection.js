"use client";

import { useEffect, useState } from "react";

// Scroll-spy: returns the id of the section currently in view, for the navbar's
// active-link highlight.
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState("");

  // Join to a string so the effect doesn't re-run when a new array with the
  // same ids is passed.
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
