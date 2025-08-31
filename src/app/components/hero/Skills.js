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
  const itemsPerPage = 8;

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? prev : prev - itemsPerPage));
  };

  const handleNext = () => {
    setIndex((prev) =>
      prev + itemsPerPage >= midSkills.length ? prev : prev + itemsPerPage
    );
  };

  const visibleSkills = midSkills.slice(index, index + itemsPerPage);

  return (
    <div className="mt-10 px-6 text-center">
      <div className="flex flex-wrap justify-center gap-7 mb-6">
        {bigSkills.map((skill, i) => (
          <div
            key={i}
            className="flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity"
          >
            <i className={`${skill.icon} text-4xl`}></i>
            <span className="text-[0.8rem] mt-1 text-gray-500">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-center mb-6 w-full">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className={`absolute -left-5 px-2 py-1 rounded-full z-10 cursor-pointer transition-all duration-300 ${
            index === 0
              ? "text-gray-300 cursor-not-allowed opacity-50"
              : "text-gray-400 hover:text-gray-200 opacity-100"
          }`}
        >
          &lt;
        </button>

        <div className="flex justify-center gap-5 w-[90%] max-w-3xl">
          {visibleSkills.map((skill, i) => (
            <div
              key={i}
              className="flex flex-col items-center transition-all duration-500 ease-in-out animate-fadeIn"
            >
              <i
                className={`${skill.icon} text-2xl opacity-80 hover:opacity-100 transition-opacity duration-300`}
              ></i>
              <span className="text-[0.6rem] text-gray-500 mt-1">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={index >= midSkills.length - itemsPerPage}
          className={`absolute -right-4 px-2 py-1 rounded-full z-10 cursor-pointer transition-all duration-300 ${
            index >= midSkills.length - itemsPerPage
              ? "text-gray-300 cursor-not-allowed opacity-50"
              : "text-gray-400 hover:text-gray-200 opacity-100"
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
