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
        "Quiz app built with Next.js and Gemini AI that generates random React-related questions and grades answers in real time.",
      tech: ["Next.js", "React", "Gemini AI", "TypeScript", "Vercel"],
      vercel: "https://react-quiz-app.vercel.app",
      github: "https://github.com/lukaskourilcz/react-quiz-app",
      image: "/wip.png",
    },
    {
      title: "AI Powered Vue Quiz App",
      description:
        "Vue 3 quiz app that tests frontend knowledge. Gemini AI evaluates your answers and provides hints.",
      tech: ["Vue 3", "Vite", "Gemini AI", "TailwindCSS", "Netlify"],
      vercel: "https://vue-quiz-app.vercel.app",
      github: "https://github.com/lukaskourilcz/vue-quiz-app",
      image: "/wip.png",
    },
    {
      title: "Dont Wanna Know",
      description:
        "Web app using Gemini AI to reveal life stats after answering personal questions. Built with Next.js and Node.js.",
      tech: ["Next.js", "Node.js", "Gemini AI", "Prisma", "Vercel"],
      vercel: "https://dontwannaknow.vercel.app",
      github: "https://github.com/lukaskourilcz/dontwannaknow",
      image: "/wip.png",
    },
    {
      title: "Autobusy Hodonín",
      description:
        "Developed and deployed a modern Next.js website for a transport company with SEO and accessibility in mind.",
      tech: ["Next.js", "ShadCN", "TailwindCSS", "SEO", "Vercel"],
      github: "https://github.com/lukaskourilcz/autodoprava-kopecek",
      image: "/wip.png",
    },
    {
      title: "beKind Web App",
      description:
        "Contributed to rebranding and building the company web app with a focus on UX/UI and performance.",
      tech: ["Next.js", "React", "TailwindCSS", "UX/UI", "Vercel"],
      image: "/wip.png",
    },
    {
      title: "Take a Break App",
      description:
        "Full-stack B2B meditation scheduling app. Built with Next.js, TypeScript, Prisma, and PostgreSQL.",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Vercel"],
      github: "https://github.com/lukaskourilcz/TakeABreak",
      image: "/wip.png",
    },
    {
      title: "Habit Tracker",
      description:
        "Web app to track personal habits and skills using React, TypeScript, and ShadCN components.",
      tech: ["React", "TypeScript", "ShadCN", "TailwindCSS", "Vercel"],
      github: "https://github.com/lukaskourilcz/habit-tracker",
      image: "/wip.png",
    },
    {
      title: "Portfolio",
      description:
        "My personal portfolio showcasing projects and skills. Built with Next.js, TailwindCSS, and Framer Motion.",
      tech: ["Next.js", "React", "TailwindCSS", "Framer Motion", "Vercel"],
      github: "https://github.com/lukaskourilcz/portfolio",
      image: "/wip.png",
    },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-[70vh] bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 sm:px-8 lg:px-20 overflow-hidden"
    >
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
            <div className="relative w-full h-28 sm:h-32 mb-3">
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                className="object-contain p-2"
              />
            </div>
            <h3 className="text-md sm:text-lg font-bold text-yellow-100 mb-2">
              {proj.title}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-snug mb-3">
              {proj.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-8">
              {proj.tech.map((t, j) => (
                <span
                  key={j}
                  className="px-2 py-0.5 text-[9px] sm:text-[10px] border border-yellow-200/40 text-yellow-100 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="absolute bottom-3 right-3 flex gap-2">
              {proj.vercel && (
                <Link href={proj.vercel} target="_blank">
                  <Image
                    src="/icons/vercel.svg"
                    alt="Vercel"
                    width={20}
                    height={20}
                    className="invert opacity-80 hover:opacity-100 hover:scale-110 transition"
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
                    className="opacity-80 hover:opacity-100 hover:scale-110 transition"
                  />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
