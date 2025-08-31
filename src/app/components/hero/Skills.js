"use client";
import { useState } from "react";

export default function Skills() {
  const bigSkills = [
    { name: "HTML5", icon: "devicon-html5-plain colored" },
    { name: "CSS3", icon: "devicon-css3-plain colored" },
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored" },
    { name: "React", icon: "devicon-react-original colored" },
    { name: "Next.js", icon: "devicon-nextjs-plain" },
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  ];

  const midSkills = [
    { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
    { name: "TailwindCSS", icon: "devicon-tailwindcss-original colored" },
    { name: "MySQL", icon: "devicon-mysql-plain colored" },
    { name: "NPM", icon: "devicon-npm-original-wordmark colored" },
    { name: "Prisma", icon: "devicon-prisma-original colored" },
    { name: "Docker", icon: "devicon-docker-plain colored" },
    { name: "Jest", icon: "devicon-jest-plain colored" },
    { name: "Vite", icon: "devicon-vitejs-plain colored" },
    { name: "Mocha", icon: "devicon-mocha-plain colored" },
    { name: "GCP", icon: "devicon-googlecloud-plain colored" },
    { name: "GitHub", icon: "devicon-github-original" },
    { name: "Postman", icon: "devicon-postman-plain colored" },
    { name: "Figma", icon: "devicon-figma-plain colored" },
    { name: "Canva", icon: "devicon-canva-original colored" },
  ];

  const [index, setIndex] = useState(0);
  const itemsPerPage = 9;

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, midSkills.length - itemsPerPage));
  };

  return (
    <div className="mt-10 text-center">
<h2 className="flex items-center gap-2 mb-4 text-gray-400 group">
  <span
    role="img"
    aria-label="ninja"
    className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12"
  >
    🥷
  </span>
  <span className="transition-opacity duration-300 group-hover:text-gray-300">
    Tech stack:
  </span>
</h2>
      <div className="flex flex-wrap justify-center gap-7 mb-8">
        {bigSkills.map((skill, i) => (
          <div
            key={i}
            className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity fade-in"
          >
            <i className={`${skill.icon} text-4xl`}></i>
            <span className="text-[0.8rem] mt-1 text-gray-500">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
      <div className="relative flex items-center justify-center w-full">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className={`absolute -left-4 px-2 py-1 z-10 transition-all duration-300 ${
            index === 0
              ? "text-gray-300 opacity-35"
              : "text-gray-400 hover:text-gray-200 opacity-100 cursor-pointer"
          }`}
        >
          &lt;
        </button>

        <div className="overflow-hidden w-[90%] max-w-4xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * (100 / itemsPerPage)}%)`,
              width: `${(midSkills.length / itemsPerPage) * 100}%`,
            }}
          >
            {midSkills.map((skill, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[calc(100%/11)] flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity fade-in"
              >
                <i className={`${skill.icon} text-2xl`}></i>
                <span className="text-[0.6rem] text-gray-500 mt-1">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={index >= midSkills.length - itemsPerPage}
          className={`absolute -right-4 px-2 py-1 z-10 transition-all duration-300 ${
            index >= midSkills.length - itemsPerPage
              ? "text-gray-300 opacity-35"
              : "text-gray-400 hover:text-gray-200 opacity-100 cursor-pointer"
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
