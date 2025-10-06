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
    <section className="flex flex-col items-center text-center">
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
      <Card className="max-w-3xl border-muted shadow-sm mb-8 bg-card/60 backdrop-blur-sm">
        <CardContent className="p-8 space-y-10">
          <div className="space-y-3">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              Passionate about building{" "}
              <span className="text-foreground font-medium">
                clean, user-friendly web applications
              </span>{" "}
              and continuously improving through learning and experimentation.
              Beyond code, I write and travel. Creativity and curiosity fuel
              everything I do.
            </p>

            <p className="text-xs uppercase tracking-wide text-muted-foreground/70 mt-2">
              Check out my tech stack and my past{" "}
              <span className="font-semibold text-foreground">
                {monthsBack}
              </span>{" "}
              months GitHub contributions ↓
            </p>
          </div>

          <div className="h-px bg-muted/60 mx-auto w-3/4" />

          <div className="flex flex-col items-center space-y-8">
            <div className="w-full max-w-lg">
              <Skills />
            </div>
            <div className="w-full max-w-lg">
              <GitHubGrid />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <a href="/pdf/cv_lukaskouril.pdf" download>
            <Download className="w-4 h-4 mr-2" /> Download CV
          </a>
        </Button>
        <Button asChild className="w-full sm:w-auto">
          <Link href="#contact">Let’s talk</Link>
        </Button>
      </div>

      <div className="flex gap-5 mb-2">
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
