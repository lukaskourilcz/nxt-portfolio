"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResponsiveMonths } from "@/lib/useResponsiveMonths";

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
  const monthsBack = useResponsiveMonths();

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/contributions");
        const data = await res.json();

        const start = getRangeStart(monthsBack);

        const filtered = (data.contributions ?? [])
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
      <p className="py-10 text-center font-mono text-sm text-zinc-500">
        <span className="text-emerald-400">$</span> loading contributions…
      </p>
    );
  }

  return (
    <div className="mx-auto w-fit max-w-full">
      <div className="mb-1 flex w-fit gap-[3px] text-[0.5rem] text-zinc-500">
        {weeks.map((_, i) => {
          const label = monthLabels.find((m) => m.index === i);
          return (
            <div key={i} className="w-2 text-center font-mono">
              {label ? label.label : ""}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={monthsBack}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex w-fit gap-[3px]"
        >
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {week.map((day, j) => {
                const isEmpty = day.contributionCount === 0;
                return (
                  <div
                    key={j}
                    title={formatTooltip(day)}
                    className={`h-2 w-2 rounded-[2px] transition-all duration-200 ${
                      isEmpty
                        ? "opacity-40 hover:opacity-70"
                        : "opacity-85 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: day.color }}
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
