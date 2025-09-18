import Image from "next/image";
import React from "react";

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
        "Collaborated on the development of a full-stack B2B web application for scheduling meditation sessions using Next.js and TypeScript",
        "Built a modern, responsive UI with React, TailwindCSS, and ShadCN",
        "Managed databases with PostgreSQL and Prisma, optimizing performance and data integrity",
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
        "Monitored shipment data, identifying and resolving anomalies with data-driven insights",
        "Conducted root-cause analysis on operational trends, delivering regulatory-compliant solutions",
        "Analyzed existing quality processes and identified opportunities for AI-driven and automation improvements",
        "Raised and approved investigation of nonconformities (deviations / complaints / audit observations)",
        "Compiled quality documentation such as quality reports, statistical reviews, and audit plans",
      ],
    },
    {
      company: "Entain Group",
      logo: "/logos/entain_logo.png",
      role: "Customer Protection Expert",
      period: "Jan 2020 – Sep 2021",
      location: "Gibraltar",
      responsibilities: [
        "Acquired specialized knowledge in gaming platforms and anti-money laundering frameworks",
        "Utilized data analytics to detect and mitigate suspicious financial behaviors",
        "Delivered regulatory-compliant solutions to ensure adherence to industry standards",
      ],
    },
    {
      company: "Kiwi.com",
      logo: "/logos/kiwi_logo.png",
      role: "Customer Relations Advisor",
      period: "Dec 2015 – Nov 2019",
      location: "Brno, Czech Republic",
      responsibilities: [
        "Resolved customer complaints with optimized communication pipelines",
        "Maintained knowledge of aviation industry trends and CRM tools",
        "Provided actionable feedback to stakeholders and collaborated on workflow optimization",
        "Supported KAYAK operations as a contractor with data-backed resolutions",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="relative bg-gradient-to-bl from-white to-gray-200 py-16 px-6 lg:px-20 overflow-hidden"
    >
      <div className="w-full flex justify-center">
        <h2 className="text-[15rem] font-bold text-transparent [-webkit-text-stroke:10px_black] opacity-90 text-center leading-none -mt-23">
          EXPERIENCE
        </h2>
      </div>
      <div
        className="absolute inset-0 
  bg-[radial-gradient(circle,rgba(0,0,0,0.02)_2px,transparent_2px),radial-gradient(circle,rgba(0,0,0,0.04)_2px,transparent_2px)] 
  bg-[length:60px_60px,30px_30px] 
  bg-[position:0_0,15px_15px]"
      ></div>

      <div className="relative -mt-31">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 top-1/6 bottom-5 bg-gray-300 rounded"></div>

        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`relative bg-white/70 backdrop-blur-md opacity-97 rounded-2xl shadow-md p-6 hover:shadow-xl transition ${
                i % 2 === 0 ? "md:mr-8" : "md:ml-8"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-1">
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={exp.company === "Autodoprava Kopeček" ? 56 : 32}
                    height={exp.company === "Autodoprava Kopeček" ? 56 : 32}
                  />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {exp.company}
                  </h3>
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  {exp.role}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {exp.period} • {exp.location}
              </p>

              <ul className="mt-4 space-y-2 text-gray-700">
                {exp.responsibilities.map((res, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs">
                    <span className="text-black font-bold">›</span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
