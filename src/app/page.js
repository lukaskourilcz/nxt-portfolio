import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BackgroundGrid } from "@/components/background-grid";
import HeroSection from "./components/hero/HeroSection";
import StackSection from "./components/stack/StackSection";
import ExperienceSection from "./components/experience/ExperienceSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import ContactSection from "./components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <BackgroundGrid />
      <Nav />
      <main>
        <HeroSection />
        <StackSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
