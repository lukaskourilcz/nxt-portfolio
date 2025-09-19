"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const projects = [
    {
      title: "AI Powered React Quiz App",
      description:
        "A quiz app generating random React-related questions, built with Next.js. GeminiAI grades your answers in real-time and provides personalized feedback.",
      tech: ["Next.js", "React", "Gemini AI"],
      vercel: "https://react-quiz-app.vercel.app",
      github: "https://github.com/lukaskourilcz/react-quiz-app",
      image: "/wip.png",
    },
    {
      title: "AI Powered Vue Quiz App",
      description:
        "A Vue 3 quiz app that challenges your frontend knowledge. GeminiAI evaluates your answers, offering hints and feedback to guide your learning.",
      tech: ["Vue 3", "Vite", "Gemini AI"],
      vercel: "https://vue-quiz-app.vercel.app",
      github: "https://github.com/lukaskourilcz/vue-quiz-app",
      image: "/wip.png",
    },
    {
      title: "Dont Wanna Know",
      description:
        "A thought-provoking web app that asks you personal input questions. Once answered, GeminiAI reveals uncomfortable truths like your estimated remaining lifespan or how often you’ll see loved ones.",
      tech: ["Next.js", "Node.js", "Gemini AI"],
      vercel: "https://dontwannaknow.vercel.app",
      github: "https://github.com/lukaskourilcz/dontwannaknow",
      image: "/wip.png",
    },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-16 px-4 sm:px-8 lg:px-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_2px)] bg-[length:20px_20px] sm:bg-[length:30px_30px]"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full flex justify-center relative z-10 -mt-25 mb-16 sm:mb-16"
      >
        <h2
          className="absolute text-[4rem] sm:text-[8rem] md:text-[12rem] lg:text-[18rem] font-bold text-transparent 
      [-webkit-text-stroke:14px_rgba(202,138,4)] sm:[-webkit-text-stroke:6px_rgba(202,138,4)] 
      text-center leading-none"
        >
          PROJECTS
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 relative z-10"
      >
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group bg-white/5 mt-10 sm:mt-12 lg:mt-19 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg hover:shadow-yellow-400/10 transition-transform duration-300 hover:-translate-y-1 overflow-hidden"
          >
            <div className="relative w-full h-40 sm:h-48 overflow-hidden rounded-t-2xl">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4 sm:p-6 flex flex-col">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-100 group-hover:text-yellow-300 transition mb-3 sm:mb-4">
                {proj.title}
              </h3>

              <p className="text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">
                {proj.description}
              </p>

              <div className="flex justify-between items-end mt-auto">
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t, j) => (
                    <span
                      key={j}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium border border-yellow-200/40 text-yellow-100 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 sm:gap-3">
                  {proj.vercel && (
                    <Link href={proj.vercel} target="_blank">
                      <Image
                        src="/icons/vercel.svg"
                        alt="Vercel"
                        width={20}
                        height={20}
                        className="sm:w-[22px] sm:h-[22px] opacity-80 hover:opacity-100 hover:scale-110 transition invert"
                      />
                    </Link>
                  )}
                  {proj.github && (
                    <Link href={proj.github} target="_blank">
                      <Image
                        src="/icons/github.svg"
                        alt="GitHub"
                        width={20}
                        height={20}
                        className="sm:w-[22px] sm:h-[22px] opacity-80 hover:opacity-100 hover:scale-110 transition"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
