"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Linkedin, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Skills from "./Skills";
import GitHubGrid, { getMonthsBack } from "./GitHubGrid";

export default function AboutCard() {
  const [monthsBack, setMonthsBack] = useState(12);

  useEffect(() => {
    function updateMonths() {
      setMonthsBack(getMonthsBack(window.innerWidth));
    }
    updateMonths();
    window.addEventListener("resize", updateMonths);
    return () => window.removeEventListener("resize", updateMonths);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50 overflow-hidden">
      <div
        className="absolute inset-0 
        bg-[radial-gradient(circle,rgba(0,0,0,0.02)_2px,transparent_2px),radial-gradient(circle,rgba(0,0,0,0.04)_2px,transparent_2px)] 
        bg-[length:40px_40px,20px_20px] 
        bg-[position:0_0,10px_10px]"
      ></div>

      <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 mb-12 z-10 mt-8">
        <div className="relative w-40 h-40 md:w-52 md:h-52 mb-4 md:mb-0">
          <Image
            src="/profile.png"
            alt="Portrait of Lukas Kouril"
            fill
            className="rounded-full object-cover border border-border shadow-lg"
            priority
          />
        </div>

        <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Lukas Kouril
          </h1>
          <p className="text-muted-foreground text-xl font-semibold md:text-2xl">
            Software Engineer <br />
          </p>
          <p className="text-muted-foreground text-xs font-medium md:text-lg -mt-1">
            with passion for TypeScript, Next.js, Node.js & SQL
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
            <Button asChild variant="outline" className="w-auto">
              <a href="/pdf/cv_lukaskouril.pdf" download>
                <Download className="w-4 h-4 mr-2" /> Download CV
              </a>
            </Button>

            <Button asChild className="w-auto">
              <Link href="#contact">Let’s talk</Link>
            </Button>

            <div className="flex gap-4 ml-1">
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
          </div>
        </div>
      </div>

      <Card className="relative z-10 max-w-3xl border-muted shadow-sm mb-6 bg-card/60 backdrop-blur-sm">
        <CardContent className="py-6 px-10 md:p-8 space-y-3">
          <div className="space-y-3">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              👋 Hello and welcome to my portfolio! I am a software engineer
              from the Czech Republic who loves building{" "}
              <span className="text-foreground font-medium">
                clean, user-friendly web applications
              </span>{" "}
              and continuously improving through learning and experimentation.
              Beyond code, I like to explore new tech, write and travel.
              Creativity and curiosity fuel everything I do. 🌍
            </p>

            <p
              className="text-[0.65rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[0.8rem]
uppercase tracking-wide text-muted-foreground/70 mt-6"
            >
              💻 See my tech stack and my past{" "}
              <span className="font-semibold text-foreground">
                {monthsBack}
              </span>{" "}
              months GitHub contributions ↓
            </p>
          </div>

          <div className="h-px bg-muted/60 mx-auto w-3/4" />

          <div className="flex flex-col items-center space-y-0">
            <div className="w-full max-w-lg">
              <Skills />
            </div>
            <div className="w-full max-w-full overflow-hidden">
              <GitHubGrid />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
