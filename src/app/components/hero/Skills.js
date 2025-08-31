export default function Skills() {
  const bigSkills = [
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored" },
    { name: "HTML5", icon: "devicon-html5-plain colored" },
    { name: "CSS3", icon: "devicon-css3-plain colored" },
    { name: "MySQL", icon: "devicon-mysql-plain colored" },
    { name: "React", icon: "devicon-react-original colored" },
    { name: "Next.js", icon: "devicon-nextjs-original" },
    { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    { name: "Express", icon: "devicon-express-original" },
  ];

  const smallSkills = [
    { name: "Vite", icon: "devicon-vitejs-plain colored" },
    { name: "Prisma", icon: "devicon-prisma-original colored" },
    { name: "Mocha", icon: "devicon-mocha-plain colored" },
    { name: "Jest", icon: "devicon-jest-plain colored" },
    { name: "Cypress", icon: "devicon-cypress-plain colored" },
    { name: "Vercel", icon: "devicon-vercel-original" },
    { name: "TailwindCSS", icon: "devicon-tailwindcss-original colored" },
    { name: "Docker", icon: "devicon-docker-plain colored" },
    { name: "AWS", icon: "devicon-amazonwebservices-plain colored" },
    { name: "GCP", icon: "devicon-googlecloud-plain colored" },
    { name: "NPM", icon: "devicon-npm-original-wordmark colored" },
    { name: "GitHub", icon: "devicon-github-original" },
    { name: "VS Code", icon: "devicon-vscode-plain colored" },
    { name: "Postman", icon: "devicon-postman-plain colored" },
    { name: "Figma", icon: "devicon-figma-plain colored" },
    { name: "Photoshop", icon: "devicon-photoshop-plain colored" },
    { name: "Canva", icon: "devicon-canva-original colored" },
  ];

  return (
    <div className="mt-10 px-6 text-center">
      <h3 className="text-sm font-semibold mb-4">Skills ⚡</h3>

      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {bigSkills.map((skill, i) => (
          <div key={i} className="flex flex-col items-center">
            <i className={`${skill.icon} text-5xl`}></i>
            <span className="text-xs mt-1">{skill.name}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {smallSkills.map((skill, i) => (
          <div key={i} className="flex flex-col items-center">
            <i className={`${skill.icon} text-3xl`}></i>
            <span className="text-xs mt-1">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
