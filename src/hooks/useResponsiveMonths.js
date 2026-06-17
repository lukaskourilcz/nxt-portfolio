"use client";

import { useEffect, useState } from "react";

// How many months of GitHub contributions to show, based on viewport width —
// fewer columns on narrow screens so the grid never overflows.
function monthsForWidth(width) {
  if (width < 480) return 7;
  if (width < 768) return 10;
  return 11;
}

/**
 * Returns the number of months of contribution history that fits the current
 * viewport width, updating on resize.
 */
export function useResponsiveMonths() {
  const [monthsBack, setMonthsBack] = useState(10);

  useEffect(() => {
    const updateMonths = () => setMonthsBack(monthsForWidth(window.innerWidth));
    updateMonths();
    window.addEventListener("resize", updateMonths);
    return () => window.removeEventListener("resize", updateMonths);
  }, []);

  return monthsBack;
}
