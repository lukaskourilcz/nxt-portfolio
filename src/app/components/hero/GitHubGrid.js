"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function getMonthsBack(width) {
  if (width < 480) return 6;
  if (width < 640) return 7;
  if (width < 800) return 8;
  if (width < 1024) return 10;
  return 12;
}

function formatTooltip(day) {
  const d = new Date(day.date);
  const count = day.contributionCount;
  return `${count} contribution${count !== 1 ? "s" : ""} on ${d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}

export default function GitHubGrid() {
  const [weeks, setWeeks] = useState([]);
  const [monthsBack, setMonthsBack] = useState(
    typeof window !== "undefined" ? getMonthsBack(window.innerWidth) : 12
  );

  useEffect(() => {
    function handleResize() {
      setMonthsBack(getMonthsBack(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/contributions");
        const data = await res.json();

        const cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - monthsBack);

        const filtered = data.contributions
          .map((week) => week.filter((day) => new Date(day.date) >= cutoff))
          .filter((week) => week.length > 0);

        setWeeks(filtered);
      } catch (err) {
        console.error("Failed to load contributions:", err);
      }
    }
    loadData();
  }, [monthsBack]);

  if (!weeks.length) {
    return <p className="text-center text-gray-400 my-10">Loading contributions…</p>;
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

      <div className="flex gap-[3px] overflow-x-auto mx-auto w-fit">
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
                    (e.currentTarget.style.opacity = isEmpty ? "0.15" : "0.85")
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
