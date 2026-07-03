"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useResponsiveMonths } from "@/hooks/useResponsiveMonths";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Day = { date: string; contributionCount: number; color: string };
type Week = Day[];
type MonthLabel = { index: number; label: string };

// Gap between cells (px). Cell size itself is derived to fill the container.
const GAP = 3;
const MIN_CELL = 6;
const MAX_CELL = 18;

function getRangeStart(monthsBack: number): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() - monthsBack + 1, 1);
}

function formatTooltip(day: Day): string {
  const date = new Date(day.date);
  const count = day.contributionCount;
  return `${count} contribution${count !== 1 ? "s" : ""} on ${date.toLocaleDateString(
    undefined,
    { day: "numeric", month: "long", year: "numeric" }
  )}`;
}

export default function GitHubGrid() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const monthsBack = useResponsiveMonths();

  // Derive the cell size so the whole grid spans (barely fits) its container
  // width, rather than sitting small and centered.
  const containerRef = useRef<HTMLDivElement>(null);
  const [cell, setCell] = useState(12);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/contributions");
        const data: { contributions?: Week[] } = await res.json();

        const start = getRangeStart(monthsBack);

        const filtered = (data.contributions ?? [])
          .map((week) => week.filter((d) => new Date(d.date) >= start))
          .filter((w) => w.length > 0);

        setWeeks(filtered);
      } catch (error) {
        console.error("Failed to load contributions:", error);
      }
    }

    loadData();
  }, [monthsBack]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !weeks.length) return;
    const update = () => {
      const n = Math.max(weeks.length, 1);
      const raw = Math.floor((el.clientWidth - GAP * (n - 1)) / n);
      setCell(Math.max(MIN_CELL, Math.min(MAX_CELL, raw)));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [weeks.length]);

  const monthLabels: MonthLabel[] = [];
  if (weeks.length) {
    let lastMonthKey: string | null = null;
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
      <div ref={containerRef} className="w-full">
        <p className="py-10 text-center font-mono text-sm text-zinc-500">
          <span className="text-emerald-400">$</span> loading contributions…
        </p>
      </div>
    );
  }

  return (
    // Each cell needs 1s of hover before its tooltip appears; skipDelayDuration
    // of 0 means moving to another dot always waits the full second again.
    <TooltipProvider delayDuration={1000} skipDelayDuration={0}>
      <div ref={containerRef} className="w-full">
        <div
          className="mb-1 flex text-[0.5rem] text-zinc-500 opacity-30"
          style={{ gap: GAP }}
        >
          {weeks.map((_, i) => {
            const label = monthLabels.find((m) => m.index === i);
            return (
              <div
                key={i}
                className="text-center font-mono"
                style={{ width: cell }}
              >
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
            className="flex"
            style={{ gap: GAP }}
          >
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col" style={{ gap: GAP }}>
                {week.map((day, j) => (
                  <Tooltip key={j}>
                    <TooltipTrigger asChild>
                      {/* The garden sits faint at 0.3; hovering a square eases it
                          up to 0.8 over 300ms so it lifts rather than flicks. */}
                      <div
                        className="rounded-[2px] opacity-30 transition-opacity duration-300 ease-out hover:opacity-80"
                        style={{
                          width: cell,
                          height: cell,
                          backgroundColor: day.color,
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>{formatTooltip(day)}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}
