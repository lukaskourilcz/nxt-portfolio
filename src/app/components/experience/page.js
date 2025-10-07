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
      tags: [
        "TYPESCRIPT",
        "NEXT.JS",
        "TAILWIND",
        "POSTGRESQL",
        "SEO",
        "NODE.JS",
      ],
    },
    {
      company: "Autodoprava Kopeček",
      logo: "/logos/autodopravakopecek_logo.png",
      role: "Frontend Engineer",
      period: "Jan 2025 – Feb 2025",
      location: "Brno, Czech Republic",
      responsibilities: [
        "Developed the website using Next.js, ensuring a modern, high-performance, and mobile-responsive SEO-friendly platform",
        "Implemented UI components from ShadCN to create a sleek and visually appealing interface",
        "Designed key aspects of the UX/UI focused on seamless customer experience and high conversion",
        "Deployed and optimized the site for performance, accessibility, and scalability using Vercel",
        "Managed the full development lifecycle from initial concept and design through testing and production release",
        "Collaborated closely with the client to deliver a product that met all business requirements",
      ],
      tags: [
        "TYPESCRIPT",
        "NEXT.JS",
        "SEO",
        "UX/UI",
        "VERCEL",
        "AI18N",
        "ShadCN",
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
        "Built a modern UI with reusable React, TailwindCSS, and ShadCN components",
        "Managed PostgreSQL & Prisma databases, optimizing performance and ensuring data integrity",
        "Integrated Stripe and other third-party APIs for real-time updates and secure authentication",
        "Used Figma for detailed UI/UX design and Linear for agile task management across sprints",
        "Deployed the app on Vercel for scalability, fast load times, and easy continuous integration",
      ],
      tags: [
        "TYPESCRIPT",
        "NEXT.JS",
        "TAILWIND",
        "POSTGRESQL",
        "ShadCN",
        "PRISMA",
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
        "Monitored shipment data and resolved critical anomalies using advanced data insights and tracking tools",
        "Performed detailed root-cause analysis and delivered regulatory-compliant solutions to global clients",
        "Identified opportunities for AI-driven automation improvements in data processing and client communication",
        "Compiled quality documentation, audit reports, and presented findings to senior management",
        "Managed high-stakes technical issues requiring coordination between multiple international teams",
      ],
      tags: [
        "DATA ANALYSIS",
        "AI AUTOMATION",
        "LOGISTICS",
        "ROOT-CAUSE ANALYSIS",
      ],
    },
    {
      company: "Entain Group",
      logo: "/logos/entain_logo.png",
      role: "Customer Protection Expert",
      period: "Jan 2020 – Sep 2021",
      location: "Gibraltar",
      responsibilities: [
        "Developed expertise in gaming compliance and anti-money laundering (AML) frameworks",
        "Used data analytics and specialized tools to detect suspicious behavior and prevent financial fraud",
        "Delivered regulatory-compliant solutions ensuring adherence to strict EU and local standards",
        "Conducted in-depth investigations and processed sensitive customer data in line with GDPR",
        "Provided training and guidance to junior team members on compliance protocols and risk mitigation",
        "Maintained a zero-tolerance approach to breaches of regulatory policy",
      ],
      tags: ["COMPLIANCE", "AML/KYC", "DATA ANALYTICS", "RISK MANAGEMENT"],
    },
    {
      company: "Kiwi.com",
      logo: "/logos/kiwi_logo.png",
      role: "Customer Relations Advisor",
      period: "Dec 2015 – Nov 2019",
      location: "Brno, Czech Republic",
      responsibilities: [
        "Resolved complex customer issues with efficient communication workflows across multiple channels",
        "Stayed updated on aviation trends and mastered various CRM systems to ensure high quality support",
        "Provided feedback to stakeholders and management and optimized workflows to reduce resolution time",
        "Supported KAYAK operations through data-backed resolutions and provided support for B2B partners",
        "Consistently maintained a high customer satisfaction (CSAT) score exceeding team goals",
        "Trained new hires on company policies, products, and customer service best practices",
      ],
      tags: [
        "CRM SYSTEMS",
        "STAKEHOLDER COMMUNICATION",
        "WORKFLOW OPTIMIZATION",
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

      <div className="relative z-10 text-center mb-14 -mt-12">
        <h2 className="uppercase sm:text-3xl md:text-5xl font-extrabold text-gray-800 tracking-wider">
          Experience
        </h2>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] top-50 bottom-20 bg-gray-300 rounded hidden lg:block"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.1 }}
        viewport={{ once: true }}
        className="relative z-10 grid gap-6 lg:grid-cols-2 lg:gap-y-0 lg:timeline-grid"
      >
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`text-left relative
              ${
                i % 2 === 0
                  ? "lg:col-start-1 lg:pr-10"
                  : "lg:col-start-2 lg:pl-10"
              }
              ${i > 0 ? "mt-2 lg:mt-0" : "lg:mt-0"}
              
              ${i % 2 === 1 ? "lg:mt-10" : ""}
            `}
          >
            <Card className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-sm hover:shadow-lg transition rounded-2xl">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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

              <CardContent className="pt-0 pb-4 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {exp.period} • {exp.location}
                  </p>
                  <ul className="space-y-1 text-gray-700 mt-2">
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
                </div>

                {exp.tags && exp.tags.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-gray-100 flex flex-wrap gap-2">
                    {exp.tags.map((tag, k) => (
                      <span
                        key={k}
                        className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
