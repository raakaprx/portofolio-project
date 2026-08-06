"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import FeaturedProjects from "./components/FeaturedProjects";
import ProjectJourney from "./components/ProjectJourney";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white font-sans flex flex-col selection:bg-white selection:text-black">
      {/* Dynamic Blur Navbar */}
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Hero Banner Area */}
        <Hero />

        {/* Biography & Objectives */}
        <About />

        {/* Skills Capabilities Group */}
        <Skills />

        {/* Work Timeline */}
        <Experience />

        {/* High Impact Project Cards */}
        <FeaturedProjects />

        {/* Project Journey/Growth Timeline */}
        <ProjectJourney />

        {/* Complete Project Catalog */}
        <Projects />

        {/* Certificates & Verification Credentials */}
        <Certificates />

        {/* Detailed Tech Catalog badges */}
        <TechStack />

        {/* Simple Contact card grid */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
