"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Linkedin, Github } from "lucide-react";
import Skills from "./Skills";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 md:px-12 lg:px-24 text-center bg-background text-foreground">
      <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6">
        <Image
          src="/profile.png"
          alt="Portrait of Lukas Kouril"
          fill
          className="rounded-full object-cover border border-border shadow-md"
          priority
        />
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">
        Lukas Kouril
      </h1>
      <p className="text-muted-foreground text-base md:text-lg mb-6">
        Frontend Engineer · TypeScript · React · Next.js
      </p>

      <Card className="max-w-xl border-muted shadow-sm mb-12">
        <CardContent className="p-6 text-sm md:text-base leading-relaxed text-muted-foreground">
          Passionate about building clean, user-friendly web applications and
          continuously improving through learning and experimentation. Beyond
          code, I write books and travel — creativity and curiosity fuel
          everything I do.
        </CardContent>
        <CardContent className="p-6 text-sm md:text-base leading-relaxed text-muted-foreground">
          <Skills />
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 mt-2">
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <a href="/pdf/cv_lukaskouril.pdf" download>
            <Download className="w-4 h-4 mr-2" /> Download CV
          </a>
        </Button>
        <Button asChild className="w-full sm:w-auto">
          <Link href="#contact">Let’s talk</Link>
        </Button>
      </div>

      <div className="flex gap-5">
        <a
          href="https://linkedin.com/in/lukas-kouril/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="https://github.com/lukaskourilcz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}
