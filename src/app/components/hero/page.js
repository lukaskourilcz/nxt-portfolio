import Image from "next/image";
import Link from "next/link";
import GitHubGrid from "./GitHubGrid";
import Skills from "./Skills";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const navLinks = [
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#contact", label: "CONTACT" },
];

const socialLinks = [
  {
    href: "https://linkedin.com/in/lukas-kouril/",
    icon: "/icons/linkedin.svg",
    alt: "LinkedIn",
  },
  {
    href: "https://github.com/lukaskourilcz",
    icon: "/icons/github.svg",
    alt: "GitHub",
  },
];

export default function HeroSection() {
  return (
    <header className="flex min-h-screen relative">
      <nav
        className="absolute top-28 left-20 flex flex-col gap-6 font-bold text-5xl text-gray-400 z-30"
        aria-label="Main navigation"
      >
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-2 transition duration-300 hover:text-[#2ea44f]"
          >
            {label}
            <ChevronDownIcon className="w-8 h-8 relative top-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1" />
          </Link>
        ))}
      </nav>

      <div className="absolute top-12 left-[62.3%] transform -translate-x-1/2 z-10 flex items-center">
        <div className="relative z-20 rounded-full p-[4px] bg-gradient-to-br from-white/30 to-gray-200/10 border border-white/30 shadow-2xl shadow-black/40 backdrop-blur-md w-64 h-64 lg:w-90 lg:h-90">
          <div className="rounded-full overflow-hidden w-full h-full">
            <Image
              src="/profile.png"
              alt="Profile"
              width={600}
              height={600}
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative -ml-18 mb-14 z-10 rounded-3xl p-[4px] bg-gradient-to-br from-white/30 to-gray-200/10 border border-white/30 shadow-xl shadow-black/40 backdrop-blur-md w-[800px] h-[200px]">
          <div className="rounded-3xl overflow-hidden w-full h-full">
            <Image
              src="/profile2.png"
              alt="Profile background"
              width={1048}
              height={262}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-tl from-black to-gray-900 text-white w-2/5 flex flex-col relative">
        <div className="mt-[22rem] w-full px-8 flex flex-col gap-10 items-center">
          <Skills />
          <GitHubGrid />
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-yellow-600/15 w-3/5 flex flex-col justify-center px-16 relative">
        <div className="absolute top-6 right-6 flex gap-4 p-2">
          {socialLinks.map(({ href, icon, alt }) => (
            <Link key={href} href={href} target="_blank" aria-label={alt}>
              <Image
                src={icon}
                alt={alt}
                width={32}
                height={32}
                className="opacity-70 hover:opacity-100 transition-opacity filter invert"
              />
            </Link>
          ))}
        </div>

        <div className="max-w-full ml-12 px-12 mt-64">
          <h3 className="text-gray-600 text-lg text-right">
            Frontend Engineer
          </h3>
          <h1 className="text-4xl font-bold mt-2 text-right">Lukas Kouril</h1>
          <p className="text-gray-700 mt-4 leading-relaxed text-right">
            Software engineer with a strong passion for design and web
            development. I started building my first websites at 13 and ever
            since, creating digital products has been a constant element in my
            day-to-day activities. Currently, the main focus is on JavaScript,
            TypeScript, React and Next.js, but I&apos;m always looking for
            opportunities to evolve my skills and explore new advancements.
            Driven by a passion for learning and a growth-oriented mindset,
            software development has been the core part of my life. Beyond tech,
            writing is a long-standing passion of mine, with several published
            articles and, most recently, my first book. As a big fan of tacos
            and music, I love blending creativity, spices, and technology in
            everything I do.
          </p>
        </div>

        <div className="flex justify-end gap-4 mt-6 px-12">
          <a
            href="/pdf/resume.pdf"
            download
            className="bg-transparent border-2 border-black text-gray-700 px-8 py-2 rounded-full hover:bg-yellow-200/10 transition"
          >
            Download CV
          </a>
          <Link
            href="#contact"
            className="flex items-center gap-2 bg-black border-2 text-yellow-100/90 px-8 py-2 rounded-full hover:bg-gray-900 transition group"
          >
            Let’s talk!
            <ChevronDownIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
