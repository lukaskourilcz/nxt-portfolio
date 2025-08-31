"use client";
import { useEffect, useState } from "react";

export default function GitHubgrid() {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/contributions");
        const data = await res.json();
        console.log("API response:", data);
        setWeeks(data.contributions || []);
      } catch (err) {
        console.error("Failed to load contributions:", err);
      }
    }
    loadData();
  }, []);

  if (!weeks.length) {
    return <p className="text-center text-gray-400">Loading contributions…</p>;
  }

  return (
    <div className="my-6">
      <h2 className="flex mb-4 text-gray-400">GitHub contributions:</h2>

      <div className="flex gap-1 overflow-x-auto mx-auto w-fit">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1">
            {week.map((day, j) => (
              <div
                key={j}
                className="w-2 h-2 opacity-80"
                style={{ backgroundColor: day.color || "#ebedf0" }}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
