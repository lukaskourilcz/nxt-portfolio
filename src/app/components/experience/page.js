import React from "react";

export default function ExperienceSection() {
  const experiences = [
    {
      company: "BeKind",
      role: "Frontend Engineer",
      period: "Nov 2024 – Jun 2025",
      location: "Barcelona, Catalonia, Spain",
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
      role: "Frontend Engineer",
      period: "Jan 2025 – Feb 2025",
      location: "Brno, South Moravia, Czechia",
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
      role: "Full Stack Developer",
      period: "May 2024 – Nov 2024",
      location: "Barcelona, Catalonia, Spain",
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
      role: "Technical Customer Analyst",
      period: "Nov 2021 – Nov 2024",
      location: "Reykjavík, Capital Region, Iceland",
      responsibilities: [
        "Handled logistics inquiries for pharmaceutical products, ensuring safe transport worldwide",
        "Monitored shipment data, identifying and resolving anomalies with data-driven insights",
        "Conducted root-cause analysis on operational trends, delivering regulatory-compliant solutions",
      ],
    },
    {
      company: "GVC Group",
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
      role: "Customer Relations Advisor",
      period: "Dec 2015 – Nov 2019",
      location: "Brno, South Moravia, Czechia",
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
      className="bg-gradient-to-t from-gray-100 to-gray-200 py-20 px-6 lg:px-20"
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Experience
      </h2>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full rounded"></div>

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`relative bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 hover:shadow-xl transition ${
                i % 2 === 0 ? "md:mr-8" : "md:ml-8"
              }`}
            >
              <div
                className="absolute top-6 w-4 h-4 bg-[#2ea44f] border-2 border-white rounded-full shadow-md
                left-[-1.5rem] md:left-auto md:right-[-1.5rem]"
              ></div>

              <h3 className="text-2xl font-bold text-gray-900">
                {exp.company}
              </h3>
              <p className="text-lg text-gray-700">{exp.role}</p>
              <p className="text-sm text-gray-500">
                {exp.period} • {exp.location}
              </p>

              <ul className="list-disc list-inside mt-4 text-gray-700 space-y-1">
                {exp.responsibilities.map((res, j) => (
                  <li key={j}>{res}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
