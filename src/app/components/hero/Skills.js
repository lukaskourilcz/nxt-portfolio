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
  { name: "Prisma", icon: "devicon-prisma-original colored" },
  { name: "Docker", icon: "devicon-docker-plain colored" },
  { name: "GitHub", icon: "devicon-github-original" },
  { name: "Figma", icon: "devicon-figma-plain colored" },
];

export default function Skills() {
  return (
    <section className="w-full max-w-4xl mx-auto text-center py-16">
      <h2 className="text-2xl font-bold mb-10 text-foreground">Tech Stack</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="border-muted shadow-sm hover:shadow-md transition-all w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center">
              <CardContent className="flex flex-col items-center justify-center p-2">
                <i className={`${skill.icon} text-xl sm:text-2xl mb-1`}></i>
                <span className="text-[0.65rem] sm:text-xs text-muted-foreground">
                  {skill.name}
                </span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
