import Image from "next/image";
import Link from "next/link";
import GitHubGrid from "./GitHubGrid";
import Skills from "./Skills";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

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
    <header className="flex flex-col lg:flex-row min-h-screen relative">
      <nav
        className="hidden lg:flex absolute top-22 left-16 flex-col gap-6 font-bold text-4xl text-gray-400 z-30"
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
      <div className="hidden lg:flex absolute top-14 left-[62.3%] transform -translate-x-1/2 z-10 items-center">
        <div className="relative z-20 rounded-full p-[4px] bg-gradient-to-br from-white/30 to-gray-200/10 border border-white/30 shadow-2xl shadow-black/40 backdrop-blur-md w-64 h-64 lg:w-80 lg:h-80">
          <div className="rounded-full overflow-hidden w-full h-full">
            <Image
              src="/profile.png"
              alt="Portrait of Lukas Kouril"
              width={600}
              height={600}
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative -ml-18 mb-14 z-10 rounded-3xl p-[4px] bg-gradient-to-br from-white/30 to-gray-200/10 border border-white/30 shadow-xl shadow-black/40 backdrop-blur-md w-[700px] lg:w-[800px] h-[200px]">
          <div className="rounded-3xl overflow-hidden w-full h-full">
            <Image
              src="/profile2.png"
              alt="Decorative profile background"
              width={1048}
              height={262}
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center relative z-20 lg:hidden">
        <div className="w-full h-[140px] sm:h-[140px] md:h-[180px]">
          <Image
            src="/profile2.png"
            alt="Decorative profile background"
            width={1048}
            height={262}
            className="object-cover w-full h-full"
          />
        </div>

        <div
          className="relative -mt-36 sm:-mt-22 md:-mt-45 z-30 rounded-full p-[4px] 
          bg-gradient-to-br from-white/30 to-gray-200/10 border border-white/30 
          shadow-2xl shadow-black/40 backdrop-blur-md w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80"
        >
          <div className="rounded-full overflow-hidden w-full h-full">
            <Image
              src="/profile.png"
              alt="Portrait of Lukas Kouril"
              width={600}
              height={600}
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/5 bg-gradient-to-tl from-black to-gray-900 text-white flex flex-col relative">
        <div className="mt-8 lg:mt-[19rem] w-full px-8 flex flex-col gap-10 items-center mb-4">
          <Skills />
          <GitHubGrid />
        </div>
      </div>
      <div
        className="w-full lg:w-3/5 bg-gradient-to-br from-white to-yellow-600/15 
  flex flex-col justify-center px-6 md:px-12 lg:px-16 relative 
  min-h-[80vh] lg:min-h-screen"
      >
        <div className="hidden lg:flex justify-center md:justify-end gap-4 p-2 absolute top-6 right-6">
          {socialLinks.map(({ href, icon, alt }) => (
            <Link key={href} href={href} target="_blank" aria-label={alt}>
              <Image
                src={icon}
                alt={alt}
                width={32}
                height={32}
                className="opacity-70 hover:opacity-100 transition-opacity filter invert sm:w-8 sm:h-8"
              />
            </Link>
          ))}
        </div>

        <div className="max-w-full px-6 md:px-12 text-center md:text-right lg:mt-60">
          <h3 className="text-gray-600 text-base md:text-lg">
            Frontend Engineer
          </h3>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
            Lukas Kouril
          </h1>
          <p className="text-gray-700 mt-4 leading-relaxed text-sm sm:text-base">
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

        <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-4 mt-6 px-6 md:px-12">
          <a
            href="/pdf/resume.pdf"
            download
            className="bg-transparent border-2 border-black text-gray-700 px-6 sm:px-8 py-2 rounded-full hover:bg-yellow-200/10 transition text-center"
          >
            Download CV
          </a>
          <Link
            href="#contact"
            className="flex items-center justify-center gap-2 bg-black border-2 text-yellow-100/90 px-6 sm:px-8 py-2 rounded-full hover:bg-gray-900 transition group"
          >
            Let’s talk!
            <ChevronDownIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
