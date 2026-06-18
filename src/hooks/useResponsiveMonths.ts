"use client";

import { useEffect, useState } from "react";

// Months of contributions to show at a given viewport width (fewer when narrow
// so the grid never overflows).
function monthsForWidth(width: number): number {
  if (width < 480) return 7;
  if (width < 768) return 10;
  return 11;
}

// Months of contribution history that fit the current viewport, updated on resize.
export function useResponsiveMonths(): number {
  const [monthsBack, setMonthsBack] = useState(10);

  useEffect(() => {
    const updateMonths = () => setMonthsBack(monthsForWidth(window.innerWidth));
    updateMonths();
    window.addEventListener("resize", updateMonths);
    return () => window.removeEventListener("resize", updateMonths);
  }, []);

  return monthsBack;
}
