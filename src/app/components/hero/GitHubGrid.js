"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function getMonthsBack(width) {
  if (width < 480) return 7;
  if (width < 768) return 10;
  return 11;
}

function getRangeStart(monthsBack) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() - monthsBack + 1, 1);
}

function formatTooltip(day) {
  const d = new Date(day.date);
  const c = day.contributionCount;
  return `${c} contribution${c !== 1 ? "s" : ""} on ${d.toLocaleDateString(
    undefined,
    { day: "numeric", month: "long", year: "numeric" }
  )}`;
}

export default function GitHubGrid() {
  const [weeks, setWeeks] = useState([]);
  const [monthsBack, setMonthsBack] = useState(10);

  useEffect(() => {
    const updateMonths = () => setMonthsBack(getMonthsBack(window.innerWidth));
    updateMonths();
    window.addEventListener("resize", updateMonths);
    return () => window.removeEventListener("resize", updateMonths);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/contributions");
        const data = await res.json();

        const start = getRangeStart(monthsBack);

        const filtered = data.contributions
          .map((week) => week.filter((d) => new Date(d.date) >= start))
          .filter((w) => w.length > 0);

        setWeeks(filtered);
      } catch (e) {
        console.error("Failed to load contributions:", e);
      }
    }

    loadData();
  }, [monthsBack]);

  const monthLabels = [];
  if (weeks.length) {
    let lastMonthKey = null;
    const start = getRangeStart(monthsBack);

    weeks.forEach((week, i) => {
      const firstDay = new Date(week[0].date);
      if (firstDay >= start) {
        const key = `${firstDay.getFullYear()}-${firstDay.getMonth()}`;
        if (key !== lastMonthKey) {
          monthLabels.push({
            index: i,
            label: firstDay.toLocaleString("default", { month: "short" }),
          });
          lastMonthKey = key;
        }
      }
    });
  }

  if (!weeks.length) {
    return (
      <p className="text-center text-gray-400 my-10">Loading contributions…</p>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto mb-10">
      <div className="flex items-center justify-center mb-2 text-gray-400">
        <Image
          src="/icons/github.svg"
          alt="GitHub"
          width={18}
          height={18}
          className="opacity-80 transition-transform duration-300 hover:scale-110 hover:opacity-100"
        />
      </div>

      <div className="flex gap-[2px] mx-auto w-fit mb-1 text-[0.5rem] text-gray-400">
        {weeks.map((_, i) => {
          const label = monthLabels.find((m) => m.index === i);
          return (
            <div key={i} className="w-2 text-center">
              {label ? label.label : ""}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={monthsBack}
          initial={{ opacity: 0, y: 6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex gap-[3px] overflow-x-auto mx-auto w-fit"
        >
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {week.map((day, j) => {
                const isEmpty = day.contributionCount === 0;
                return (
                  <div
                    key={j}
                    className="w-2 h-2 rounded-[2px] transition-all duration-200"
                    style={{
                      backgroundColor: day.color,
                      opacity: isEmpty ? 0.15 : 0.85,
                    }}
                    title={formatTooltip(day)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = isEmpty ? "0.4" : "1")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = isEmpty
                        ? "0.15"
                        : "0.85")
                    }
                  />
                );
              })}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
