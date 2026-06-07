"use client";

import { useEffect, useState } from "react";

function getMonthsBack(width) {
  if (width < 480) return 7;
  if (width < 768) return 10;
  return 11;
}

export function useResponsiveMonths() {
  const [monthsBack, setMonthsBack] = useState(10);

  useEffect(() => {
    const updateMonths = () => setMonthsBack(getMonthsBack(window.innerWidth));
    updateMonths();
    window.addEventListener("resize", updateMonths);
    return () => window.removeEventListener("resize", updateMonths);
  }, []);

  return monthsBack;
}
