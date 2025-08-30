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
    <div className="mt-8">
      <h3 className="text-sm font-semibold mb-2 text-center">
        My GitHub garden 📊
      </h3>

      <div className="flex gap-1 overflow-x-auto mx-auto w-fit">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1">
            {week.map((day, j) => (
              <div
                key={j}
                className="w-2 h-2 rounded-sm"
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
