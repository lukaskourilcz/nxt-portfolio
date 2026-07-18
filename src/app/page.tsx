import { cookies } from "next/headers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BackgroundGrid } from "@/components/background-grid";
import { LanguageProvider } from "@/components/language-provider";
import { LANG_COOKIE, type Language } from "@/lib/i18n";
import HeroSection from "./components/hero/HeroSection";
import StackSection from "./components/stack/StackSection";
import ExperienceSection from "./components/experience/ExperienceSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import EducationSection from "./components/education/EducationSection";
import ContactSection from "./components/contact/ContactSection";

export default async function Home() {
  // Read the language preference on the server so the initial HTML is already
  // in the visitor's chosen language — no client-side swap / flash on reload.
  const stored = (await cookies()).get(LANG_COOKIE)?.value;
  const initialLang: Language = stored === "cs" ? "cs" : "en";

  return (
    <LanguageProvider initialLang={initialLang}>
      <BackgroundGrid />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection />
        <StackSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
