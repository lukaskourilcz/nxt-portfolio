import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroSection from "@/app/components/hero/HeroSection";
import ProjectsSection from "@/app/components/projects/ProjectsSection";
import ExperienceSection from "@/app/components/experience/ExperienceSection";
import ApproachSection from "@/app/components/approach/ApproachSection";
import AdditionalWorkSection from "@/app/components/projects/AdditionalWorkSection";
import StackSection from "@/app/components/stack/StackSection";
import EducationSection from "@/app/components/education/EducationSection";
import ContactSection from "@/app/components/contact/ContactSection";
import { getContent, isLocale } from "@/lib/content";
import { homeMetadata } from "@/lib/metadata";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return homeMetadata(locale, getContent(locale));
}

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <HeroSection locale={locale} content={content} />
      <ProjectsSection locale={locale} content={content} />
      <ExperienceSection locale={locale} content={content} />
      <ApproachSection content={content} />
      <AdditionalWorkSection locale={locale} content={content} />
      <StackSection content={content} />
      <EducationSection content={content} />
      <ContactSection content={content} />
    </main>
  );
}
