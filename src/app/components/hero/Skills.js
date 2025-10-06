"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML5", icon: "devicon-html5-plain colored" },
  { name: "CSS3", icon: "devicon-css3-plain colored" },
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored" },
  { name: "React", icon: "devicon-react-original colored" },
  { name: "Next.js", icon: "devicon-nextjs-plain" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
  { name: "TailwindCSS", icon: "devicon-tailwindcss-original colored" },
  { name: "MySQL", icon: "devicon-mysql-original colored" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
  { name: "Docker", icon: "devicon-docker-plain colored" },
  { name: "GitHub", icon: "devicon-github-original" },
  { name: "Figma", icon: "devicon-figma-plain colored" },
];

export default function Skills() {
  return (
    <section className="w-full max-w-3xl mx-auto text-center py-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-6 text-foreground">
        Tech Stack
      </h2>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={skill.name}
          >
            <Card className="border-muted shadow-sm hover:shadow-md transition-all aspect-square flex items-center justify-center cursor-default p-0">
              <CardContent className="flex items-center justify-center p-0 m-0 w-full h-full">
                <i
                  className={`${skill.icon} text-2xl sm:text-3xl transition-all duration-300 hover:brightness-110`}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
