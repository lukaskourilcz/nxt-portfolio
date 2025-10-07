"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function ExperienceSection() {
  const experiences = [
    {
      company: "beKind",
      logo: "/logos/bekind_logo.png",
      role: "Frontend Engineer",
      period: "Nov 2024 – Jun 2025",
      location: "Barcelona, Spain",
      responsibilities: [
        "Developed the site with Next.js to ensure high performance, modern standards, and strong SEO capabilities",
        "Contributed to the UX/UI design process, emphasizing intuitive navigation and user-centered design",
        "Implemented responsive and clean front-end interfaces using reusable components and best practices",
        "Assisted with deployment and optimized the site for speed, accessibility, and scalability",
        "Collaborated across departments to guide the project from planning through production release",
      ],
    },
    {
      company: "Autodoprava Kopeček",
      logo: "/logos/autodopravakopecek_logo.png",
      role: "Frontend Engineer",
      period: "Jan 2025 – Feb 2025",
      location: "Brno, Czech Republic",
      responsibilities: [
        "Developed the website using Next.js, ensuring a modern, high-performance, and SEO-friendly platform",
        "Implemented UI components from ShadCN to create a sleek and responsive interface",
        "Designed UX/UI focused on seamless customer experience",
        "Deployed and optimized the site for performance, accessibility, and scalability",
        "Managed the full development lifecycle from concept to production",
      ],
    },
    {
      company: "Take a Break",
      logo: "/logos/takeabreak_logo.png",
      role: "Full Stack Developer",
      period: "May 2024 – Nov 2024",
      location: "Barcelona, Spain",
      responsibilities: [
        "Collaborated on a full-stack B2B web app for scheduling meditation sessions using Next.js & TypeScript",
        "Built a modern UI with React, TailwindCSS, and ShadCN",
        "Managed PostgreSQL & Prisma databases, optimizing performance and integrity",
        "Integrated third-party APIs for real-time updates and authentication",
        "Used Figma for UI/UX design and Linear for agile task management",
        "Deployed the app on Vercel for scalability and fast load times",
      ],
    },
    {
      company: "Controlant",
      logo: "/logos/controlant_logo.png",
      role: "Technical Customer Analyst",
      period: "Nov 2021 – Nov 2024",
      location: "Reykjavík, Iceland",
      responsibilities: [
        "Handled logistics inquiries for pharmaceutical products, ensuring safe transport worldwide",
        "Monitored shipment data and resolved anomalies using data insights",
        "Performed root-cause analysis and delivered regulatory-compliant solutions",
        "Identified opportunities for AI-driven automation improvements",
        "Compiled quality documentation and audit reports",
      ],
    },
    {
      company: "Entain Group",
      logo: "/logos/entain_logo.png",
      role: "Customer Protection Expert",
      period: "Jan 2020 – Sep 2021",
      location: "Gibraltar",
      responsibilities: [
        "Developed expertise in gaming compliance and anti-money laundering frameworks",
        "Used data analytics to detect suspicious behavior",
        "Delivered regulatory-compliant solutions ensuring adherence to standards",
      ],
    },
    {
      company: "Kiwi.com",
      logo: "/logos/kiwi_logo.png",
      role: "Customer Relations Advisor",
      period: "Dec 2015 – Nov 2019",
      location: "Brno, Czech Republic",
      responsibilities: [
        "Resolved customer issues with efficient communication workflows",
        "Stayed updated on aviation trends and CRM systems",
        "Provided feedback to stakeholders and optimized workflows",
        "Supported KAYAK operations through data-backed resolutions",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="relative bg-gray-50 py-14 px-4 sm:px-8 lg:px-20 overflow-hidden"
    >
      <div
        className="absolute inset-0 
        bg-[radial-gradient(circle,rgba(0,0,0,0.02)_2px,transparent_2px),radial-gradient(circle,rgba(0,0,0,0.04)_2px,transparent_2px)] 
        bg-[length:40px_40px,20px_20px] 
        bg-[position:0_0,10px_10px]"
      ></div>

      <div className="relative z-10 text-center mb-10">
        <h2 className="text-3xl uppercase sm:text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
          Experience
        </h2>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] top-1/6 bottom-10 bg-gray-300 rounded hidden lg:block"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.1 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col lg:block"
      >
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`text-left relative lg:w-1/2 ${
              i % 2 === 0
                ? "lg:pr-10 lg:ml-0"
                : "lg:pl-10 lg:ml-auto lg:-translate-y-[210px]"
            }`}
          >
            <Card className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-sm hover:shadow-lg transition rounded-2xl">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-0">
                <div className="flex items-center gap-3">
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {exp.company}
                  </h3>
                </div>
                <span className="text-sm sm:text-base font-semibold text-gray-700">
                  {exp.role}
                </span>
              </CardHeader>

              <CardContent className="pt-2">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
                  {exp.period} • {exp.location}
                </p>
                <ul className="space-y-1 text-gray-700">
                  {exp.responsibilities.map((res, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm leading-snug"
                    >
                      <span className="text-black font-bold">›</span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
