import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BackgroundGrid } from "@/components/background-grid";
import HeroSection from "./components/hero/HeroSection";
import StackSection from "./components/stack/StackSection";
import ExperienceSection from "./components/experience/ExperienceSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import EducationSection from "./components/education/EducationSection";
import ContactSection from "./components/contact/ContactSection";

export default function Home() {
  return (
    <>
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
    </>
  );
}
