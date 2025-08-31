import Image from "next/image";
import Link from "next/link";
import GitHubGrid from "./GitHubGrid";
import Skills from "./Skills";

export default function HeroSection() {
  return (
    <section className="flex min-h-screen relative">
      <div className="absolute top-12 left-[62%] transform -translate-x-1/2 z-10 flex items-center">
        <div className="relative z-20 rounded-full p-[4px] bg-gradient-to-br from-white/30 to-gray-200/10 border border-white/30 shadow-2xl shadow-black/40 backdrop-blur-md w-64 h-64 lg:w-80 lg:h-80">
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
        <div className="relative -ml-18 mb-10 z-10 rounded-3xl p-[4px] bg-gradient-to-br from-white/30 to-gray-200/10 border border-white/30 shadow-xl shadow-black/40 backdrop-blur-md w-[800px] h-[200px]">
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

      <div className="bg-black text-white w-2/5 flex flex-col relative">
        <div className="mt-[22rem] w-full px-8 flex flex-col gap-10 items-center">
          <Skills />
          <GitHubGrid />
        </div>
      </div>

      <div className="bg-gray-100 w-3/5 flex flex-col justify-center px-16 relative">
        <div className="absolute top-6 right-6 flex gap-4 p-2">
          <Link href="https://linkedin.com/in/lukas-kouril/" target="_blank">
            <Image
              src="/icons/linkedin.svg"
              alt="LinkedIn"
              width={32}
              height={32}
              className="opacity-70 hover:opacity-100 transition-opacity filter invert"
            />
          </Link>
          <Link href="https://github.com/lukaskourilcz" target="_blank">
            <Image
              src="/icons/github.svg"
              alt="GitHub"
              width={32}
              height={32}
              className="opacity-70 hover:opacity-100 transition-opacity filter invert"
            />
          </Link>
        </div>
        <div className="max-w-full ml-12 px-12 mt-60">
          <h3 className="text-gray-600 text-lg text-right">
            Frontend Engineer
          </h3>
          <h1 className="text-4xl font-bold mt-2 text-right">Lukas Kouril</h1>
          <p className="text-gray-700 mt-4 leading-relaxed text-right">
            Software engineer with a strong passion for design and web
            development. I started building my first websites at 13 and ever
            since, creating digital products has been a constant element in my
            day to day activities. Currently, the main focus is on JavaScript,
            TypeScript, React and Next.js, but I'm always looking for
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
            className="bg-white border-2 border-black text-gray-700 px-6 py-2 rounded-full hover:bg-black hover:text-gray-100 transition"
          >
            Download CV
          </a>
          <Link
            href="#contact"
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
