"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Portfolio",
      description:
        "My personal portfolio showcasing projects and skills. Built with Next.js, TailwindCSS, and Framer Motion.",
      tech: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/lukaskourilcz/portfolio",
      vercel: "https://lukaskouril.vercel.app/",
      image: "/projects/portfolio_projekt.png",
    },
    {
      title: "AutobusyHodonín.cz",
      description:
        "Developed and deployed a modern Next.js website for a transport company with SEO and accessibility in mind.",
      tech: ["TypeScript", "Next.js", "React", "TailwindCSS", "SEO", "i18n"],
      vercel: "https://autobusyhodonin.cz",
      github: "https://github.com/lukaskourilcz/autodoprava-kopecek",
      image: "/projects/autodopravakopecek_projekt.png",
    },
    {
      title: "AI Powered Quiz App",
      description:
        "Quiz app built with Next.js and Gemini AI that generates random React-related questions and grades answers in real time.",
      tech: ["Next.js", "React", "Gemini AI", "TypeScript", "Vercel"],
      vercel: "https://quiz-app-nxt.vercel.app/",
      github: "https://github.com/lukaskourilcz/react-quiz-app",
      image: "/projects/aiquiz_projekt.png",
    },
    {
      title: "Dont Wanna Know",
      description:
        "Web app using Gemini AI to reveal life stats after answering personal questions. Built with Next.js and Node.js.",
      tech: ["Next.js", "Node.js", "Gemini AI", "Prisma", "Vercel"],
      github: "https://github.com/lukaskourilcz/dontwannaknow",
      image: "/wip.png",
    },
    {
      title: "beKind Web App",
      description:
        "Contributed to rebranding and building the company web app with a focus on UX/UI and performance.",
      tech: ["TypeScript", "Next.js", "React", "Node.js", "Prisma", "PostgreSQL", "UX/UI"],
      image: "/projects/bekind_projekt.png",
    },
    {
      title: "Take a Break Web App",
      description:
        "Full-stack B2B meditation scheduling app. Built with Next.js, TypeScript, Prisma, and PostgreSQL.",
      tech: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "Digital Twin", "UX/UI", "Vercel"],
      github: "https://github.com/lukaskourilcz/TakeABreak",
      image: "/projects/takeabreak_projekt.png",
    },
    {
      title: "Habit Tracker",
      description:
        "Web app to track personal habits and skills using React, TypeScript, and ShadCN components.",
      tech: ["TypeScript", "React", "Node.js", "ShadCN", "TailwindCSS", "Vercel"],
      github: "https://github.com/lukaskourilcz/habit-tracker",
      image: "/projects/habittracker_projekt.png",
    },
    {
      title: "Vue Quiz App",
      description:
        "Vue 3 quiz app that tests frontend knowledge. Takes questions from JSON and evaluates score at the end.",
      tech: ["Vue 3", "Vite", "Bootstrap", "Netlify"],
      vercel: "https://quiz-app-sable-eight-67.vercel.app/",
      github: "https://github.com/lukaskourilcz/vue-quiz-app",
      image: "/projects/vuequiz_projekt.png",
    },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-[70vh] bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 sm:px-8 lg:px-20 overflow-hidden"
    >

            <h2 className="relative z-10 block lg:hidden text-4xl sm:text-5xl md:text-6xl font-bold text-gray-400 text-center mb-10">
        PROJECTS
      </h2>

      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="hidden sm:flex absolute inset-0 items-center justify-center text-[6rem] md:text-[10rem] lg:text-[16.5rem] font-bold text-transparent
                 [-webkit-text-stroke:3px_rgba(202,138,4,0.5)] md:[-webkit-text-stroke:5px_rgba(202,138,4,0.5)] lg:[-webkit-text-stroke:6px_rgba(202,138,4,0.5)]
                 leading-none pointer-events-none text-center"
      >
        PROJECTS
      </motion.h2>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="group relative bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-md overflow-hidden p-4 hover:shadow-yellow-400/20 transition-transform hover:scale-[1.02]"
          >
            <div className="relative w-full h-40 sm:h-48 md:h-40 lg:h-32 mb-3 rounded-4xl overflow-hidden">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-contain p-1"
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md sm:text-lg font-bold text-yellow-100">
                {proj.title}
              </h3>
              <div className="flex gap-2">
                {proj.vercel && (
                  <Link href={proj.vercel} target="_blank">
                    <Image
                      src="/icons/vercel.svg"
                      alt="Vercel"
                      width={18}
                      height={18}
                      className="invert opacity-80 hover:opacity-100 hover:scale-110 transition"
                    />
                  </Link>
                )}
                {proj.github && (
                  <Link href={proj.github} target="_blank">
                    <Image
                      src="/icons/github.svg"
                      alt="GitHub"
                      width={18}
                      height={18}
                      className="opacity-80 hover:opacity-100 hover:scale-110 transition"
                    />
                  </Link>
                )}
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-snug mb-3">
              {proj.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {proj.tech.map((t, j) => (
                <span
                  key={j}
                  className="px-2 py-0.5 text-[9px] sm:text-[10px] border border-yellow-200/40 text-yellow-100 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
