"use client";
import { useEffect, useState } from "react";

export default function ContributionGrid() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    fetch("https://github-contributions-api.deno.dev/lukaskourilcz.json")
      .then((res) => res.json())
      .then((data) => {
        setDays(data.contributions || []);
      });
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold mb-2 text-center">
        My GitHub Contributions 📊
      </h3>

      <div className="grid grid-cols-53 gap-1 overflow-x-auto">
        {days.map((day, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: day.color }}
            title={`${day.count} contributions on ${day.date}`}
          />
        ))}
      </div>
    </div>
  );
}
