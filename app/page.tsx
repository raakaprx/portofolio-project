import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-zinc-800 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <TechStack />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  );
}