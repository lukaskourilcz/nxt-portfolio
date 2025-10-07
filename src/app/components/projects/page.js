"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Portfolio",
      description:
        "My personal portfolio showcasing projects and skills. Built with Next.js, TailwindCSS, and Framer Motion.",
      tech: ["JavaScript", "Next.js", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/lukaskourilcz/portfolio",
      vercel: "https://lukaskouril.vercel.app/",
      image: "/projects/portfolio_projekt.png",
    },
    {
      title: "AutobusyHodonín.cz",
      description:
        "Developed and deployed a modern Next.js website for a transport company with SEO and accessibility in mind.",
      tech: ["TypeScript", "Next.js", "TailwindCSS", "SEO", "i18n"],
      vercel: "https://autobusyhodonin.cz",
      github: "https://github.com/lukaskourilcz/autodoprava-kopecek",
      image: "/projects/autodopravakopecek_projekt.png",
    },
    {
      title: "AI Powered Quiz App",
      description:
        "Quiz app built with Next.js and Gemini AI that generates random React-related questions and grades answers in real time.",
      tech: ["TypeScript", "Next.js", "Gemini AI", "Vercel"],
      vercel: "https://quiz-app-nxt.vercel.app/",
      github: "https://github.com/lukaskourilcz/react-quiz-app",
      image: "/projects/aiquiz_projekt.png",
    },
    {
      title: "Dont Wanna Know",
      description:
        "Web app using Gemini AI to reveal life stats after answering personal questions. Built with Next.js and Node.js.",
      tech: ["JavaScript", "React", "Node.js", "Gemini AI", "Vercel"],
      github: "https://github.com/lukaskourilcz/dontwannaknow",
      image: "/wip.png",
    },
    {
      title: "beKind Web App",
      description:
        "Contributed to rebranding and building the company web app with a focus on UX/UI and performance.",
      tech: ["TypeScript", "Next.js", "Node.js", "Prisma", "PostgreSQL"],
      image: "/projects/bekind_projekt.png",
    },
    {
      title: "Take a Break Web App",
      description:
        "Full-stack B2B meditation scheduling app. Built with Next.js, TypeScript, Prisma, and PostgreSQL.",
      tech: [
        "TypeScript",
        "Next.js",
        "Node.js",
        "Prisma",
        "PostgreSQL",
        "Digital Twin",
        "UX/UI",
        "Vercel",
      ],
      github: "https://github.com/lukaskourilcz/TakeABreak",
      image: "/projects/takeabreak_projekt.png",
    },
    {
      title: "Habit Tracker",
      description:
        "Web app to track personal habits and skills using React, TypeScript, and ShadCN components.",
      tech: [
        "TypeScript",
        "React",
        "Node.js",
        "ShadCN",
        "TailwindCSS",
        "Vercel",
      ],
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
      className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-16 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.02)_2px,transparent_2px),radial-gradient(circle,rgba(0,0,0,0.04)_2px,transparent_2px)]
        bg-[length:40px_40px,20px_20px] bg-[position:0_0,10px_10px]"
      ></div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative uppercase z-10 text-4xl md:text-5xl font-bold text-gray-800 text-center mb-10 tracking-wider"
      >
        Projects
      </motion.h2>

      <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <Card
              className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01]
                         h-full flex flex-col justify-between"
            >
              <CardHeader className="relative w-full h-40 overflow-hidden rounded-t-xl">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  className="object-contain p-2"
                />
              </CardHeader>

              <CardContent className="p-4 flex flex-col justify-between flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{proj.title}</h3>
                  <div className="flex gap-2">
                    {proj.vercel && (
                      <Link href={proj.vercel} target="_blank">
                        <ExternalLink className="w-4 h-4 text-gray-500 hover:text-gray-800 transition" />
                      </Link>
                    )}
                    {proj.github && (
                      <Link href={proj.github} target="_blank">
                        <Github className="w-4 h-4 text-gray-500 hover:text-gray-800 transition" />
                      </Link>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-snug flex-grow">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.tech.map((t, j) => (
                    <Badge
                      key={j}
                      variant="secondary"
                      className="text-xs bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
