import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import ProjectJourney from "./components/ProjectJourney";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <ProjectJourney />
      <Certificates />
      <Contact />
    </main>
  );
}