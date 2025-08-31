"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function GitHubGrid() {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/contributions");
        const data = await res.json();

        const nineMonthsAgo = new Date();
        nineMonthsAgo.setMonth(nineMonthsAgo.getMonth() - 9);

        const filtered = data.contributions.map((week) =>
          week.filter((day) => new Date(day.date) >= nineMonthsAgo)
        );

        const cleaned = filtered.filter((week) => week.length > 0);

        setWeeks(cleaned);
      } catch (err) {
        console.error("Failed to load contributions:", err);
      }
    }
    loadData();
  }, []);

  if (!weeks.length) {
    return (
      <p className="text-center text-gray-400 my-10">Loading contributions…</p>
    );
  }

  const monthLabels = [];
  weeks.forEach((week, i) => {
    const firstDay = week[0];
    if (!firstDay) return;
    const date = new Date(firstDay.date);
    const month = date.toLocaleString("default", { month: "short" });

    if (
      monthLabels.length === 0 ||
      monthLabels[monthLabels.length - 1].label !== month
    ) {
      monthLabels.push({ index: i, label: month });
    }
  });

  function formatTooltip(day) {
    const d = new Date(day.date);
    const dayNum = d.getDate();
    const month = d.toLocaleString("default", { month: "long" });
    const year = d.getFullYear();

    return `${day.contributionCount} contribution${
      day.contributionCount !== 1 ? "s" : ""
    } on ${dayNum} ${month} ${year}`;
  }

  return (
    <div className="mb-8">
      <h2 className="flex items-center gap-2 mb-2 text-gray-300 opacity-90 group cursor-pointer">
        <a
          href="https://github.com/lukaskourilcz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Image
            src="/icons/github.svg"
            alt="GitHub"
            width={18}
            height={18}
            className="opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
          />
          <span className="opacity-80 transition-opacity duration-300 group-hover:opacity-100">
            GitHub contributions:
          </span>
        </a>
      </h2>

      <div className="flex ml-8 gap-1 mx-auto w-fit mb-1 text-[0.6rem] text-gray-400">
        {weeks.map((_, i) => {
          const label = monthLabels.find((m) => m.index === i);
          return (
            <div key={i} className="w-2 text-center">
              {label ? label.label : ""}
            </div>
          );
        })}
      </div>

      <div className="flex">
        <div className="flex flex-col justify-between mr-2 text-[0.6rem] text-gray-400">
          <span className="h-2">Mon</span>
          <span className="h-2 mt-3">Wed</span>
          <span className="h-2 mt-3">Fri</span>
        </div>

        <div className="flex gap-1 overflow-x-auto mx-auto w-fit">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-1">
              {week.map((day, j) => {
                const isEmpty = day.contributionCount === 0;
                return (
                  <div
                    key={j}
                    className={`w-2 h-2 transition-opacity duration-200`}
                    style={{
                      backgroundColor: day.color,
                      opacity: isEmpty ? 0.2 : 0.8,
                    }}
                    title={formatTooltip(day)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = isEmpty ? 0.4 : 1)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = isEmpty ? 0.2 : 0.8)
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
