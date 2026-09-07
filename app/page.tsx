import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import {
  getProjects,
  getExperiences,
  getCertificates,
  getTechStacks,
} from "@/lib/portfolio-data";

export default async function Home() {
  const [projects, experiences, certificates, techGroups] = await Promise.all([
    getProjects(),
    getExperiences(),
    getCertificates(),
    getTechStacks(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-zinc-200 selection:text-zinc-950 dark:selection:bg-zinc-800 dark:selection:text-white transition-colors duration-300">
      <AnalyticsTracker />
      <Navbar />
      <Hero />
      <About />
      <Experience initialExperiences={experiences} />
      <Projects initialProjects={projects} />
      <TechStack initialTechGroups={techGroups} />
      <Certificates initialCertificates={certificates} />
      <Contact />
      <Footer />
    </main>
  );
}