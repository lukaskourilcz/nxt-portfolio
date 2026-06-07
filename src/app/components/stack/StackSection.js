import Link from "next/link";
import {
  Github,
  Sparkles,
  Layers,
  ShieldCheck,
  KeyRound,
  Zap,
  Wand2,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import GitHubGrid from "@/components/github-grid";

// shadcn/ui has no devicon glyph — render its two-stroke logo inline.
function ShadcnIcon({ className, style, ...props }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      {...props}
    >
      <line x1="208" y1="128" x2="128" y2="208" />
      <line x1="192" y1="40" x2="40" y2="192" />
    </svg>
  );
}

// Items use a devicon class (`icon`) or a component (`Icon` + optional `color`)
// for brands that devicon doesn't ship (e.g. Claude Code, shadcn/ui). Brand
// icons whose natural color is dark are left uncolored so they inherit the text.
const STACK = [
  {
    label: "languages",
    items: [
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "TypeScript", icon: "devicon-typescript-plain colored" },
      { name: "HTML5", icon: "devicon-html5-plain colored" },
      { name: "CSS3", icon: "devicon-css3-plain colored" },
    ],
  },
  {
    label: "frontend",
    items: [
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Next.js", icon: "devicon-nextjs-plain" },
      { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
      { name: "Astro", icon: "devicon-astro-plain" },
      { name: "TailwindCSS", icon: "devicon-tailwindcss-original colored" },
      { name: "shadcn/ui", Icon: ShadcnIcon },
      { name: "MUI", icon: "devicon-materialui-plain colored" },
      { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
      { name: "Framer Motion", icon: "devicon-framermotion-original" },
    ],
  },
  {
    label: "backend & data",
    items: [
      { name: "Node.js", icon: "devicon-nodejs-plain colored" },
      { name: "Express.js", icon: "devicon-express-original" },
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "MySQL", icon: "devicon-mysql-original colored" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "Prisma", icon: "devicon-prisma-original" },
      { name: "Payload CMS", Icon: Layers },
      { name: "Better Auth", Icon: ShieldCheck },
      { name: "Auth0", Icon: KeyRound, color: "#EB5424" },
    ],
  },
  {
    label: "tools",
    items: [
      { name: "Git", icon: "devicon-git-plain colored" },
      { name: "GitHub", icon: "devicon-github-original" },
      { name: "GitLab", icon: "devicon-gitlab-plain colored" },
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "Vercel", icon: "devicon-vercel-original" },
      { name: "Netlify", icon: "devicon-netlify-plain colored" },
      { name: "Vite", icon: "devicon-vitejs-plain colored" },
      { name: "Postman", icon: "devicon-postman-plain colored" },
      { name: "Google Cloud", icon: "devicon-googlecloud-plain colored" },
      { name: "Figma", icon: "devicon-figma-plain colored" },
    ],
  },
  {
    label: "ai",
    items: [
      { name: "Claude Code", Icon: Sparkles, color: "#D97757" },
      { name: "Superpowers", Icon: Zap, color: "#f59e0b" },
      { name: "Matt Pocock Skills", Icon: Wand2, color: "#3178c6" },
    ],
  },
];

export default function StackSection() {
  return (
    <section id="stack" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading index="01" command="stack" title="Tech Stack" />

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {STACK.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.08}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              <span className="text-emerald-500">{"//"}</span> {group.label}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((it) => (
                <div
                  key={it.name}
                  className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-sm"
                >
                  {it.icon ? (
                    <i className={`${it.icon} text-lg`} aria-hidden />
                  ) : (
                    <it.Icon
                      className="h-[1.125rem] w-[1.125rem] shrink-0"
                      style={{ color: it.color }}
                      aria-hidden
                    />
                  )}
                  <span className="font-mono text-xs text-zinc-300">
                    {it.name}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-16">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="font-mono text-xs text-zinc-400">
              <span className="text-emerald-400">$</span> git log --graph
            </p>
            <Link
              href="https://github.com/lukaskourilcz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 transition-colors hover:text-emerald-400"
            >
              <Github className="h-3.5 w-3.5" /> @lukaskourilcz
            </Link>
          </div>
          <GitHubGrid />
        </div>
      </Reveal>
    </section>
  );
}
