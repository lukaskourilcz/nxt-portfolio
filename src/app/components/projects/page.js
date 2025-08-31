import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsSection() {
  const projects = [
    {
      title: "AI Powered React Quiz App",
      description:
        "A quiz app generating random React-related questions, built with Next.js. GeminiAI grades your answers in real-time and provides personalized feedback.",
      tech: ["Next.js", "React", "Gemini AI"],
      vercel: "https://react-quiz-app.vercel.app",
      github: "https://github.com/lukaskourilcz/react-quiz-app",
      image: "/projects/react-quiz.png",
    },
    {
      title: "AI Powered Vue Quiz App",
      description:
        "A Vue 3 quiz app that challenges your frontend knowledge. GeminiAI evaluates your answers, offering hints and feedback to guide your learning.",
      tech: ["Vue 3", "Vite", "Gemini AI"],
      vercel: "https://vue-quiz-app.vercel.app",
      github: "https://github.com/lukaskourilcz/vue-quiz-app",
      image: "/projects/vue-quiz.png",
    },
    {
      title: "Dont Wanna Know",
      description:
        "A thought-provoking web app that asks you personal input questions. Once answered, GeminiAI reveals uncomfortable truths like your estimated remaining lifespan or how often you’ll see loved ones.",
      tech: ["Next.js", "Node.js", "Gemini AI"],
      vercel: "https://dontwannaknow.vercel.app",
      github: "https://github.com/lukaskourilcz/dontwannaknow",
      image: "/projects/dontwannaknow.png",
    },
  ];

  return (
    <section
      id="projects"
      className="bg-gradient-to-br from-gray-900 to-black text-white py-20 px-6 lg:px-20"
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-yellow-200">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-yellow-300/30 transition-transform duration-300 group overflow-hidden"
          >
            <div className="relative w-full h-40 overflow-hidden rounded-t-2xl">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-6 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-yellow-100">
                  {proj.title}
                </h3>
                <div className="flex gap-3">
                  {proj.vercel && (
                    <Link href={proj.vercel} target="_blank">
                      <Image
                        src="/icons/vercel.svg"
                        alt="Vercel"
                        width={22}
                        height={22}
                        className="opacity-70 hover:opacity-100 hover:scale-110 transition"
                      />
                    </Link>
                  )}
                  {proj.github && (
                    <Link href={proj.github} target="_blank">
                      <Image
                        src="/icons/github.svg"
                        alt="GitHub"
                        width={22}
                        height={22}
                        className="opacity-70 hover:opacity-100 hover:scale-110 transition invert"
                      />
                    </Link>
                  )}
                </div>
              </div>

              <p className="text-gray-300 mb-4">{proj.description}</p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {proj.tech.map((t, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 text-xs font-semibold bg-yellow-200/20 text-yellow-100 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
