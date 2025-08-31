"use client";
import { useEffect, useState } from "react";

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
    return <p className="text-center text-gray-400">Loading contributions…</p>;
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

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-gray-400">GitHub contributions:</h2>

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
              {week.map((day, j) => (
                <div
                  key={j}
                  className="w-2 h-2"
                  style={{
                    backgroundColor: day.color,
                    opacity: day.contributionCount === 0 ? 0.2 : 1,
                  }}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
