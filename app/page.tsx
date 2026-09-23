import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import { SectionSkeleton } from "@/components/ui/section-skeleton";
import {
  getProjects,
  getExperiences,
  getCertificates,
  getTechStacks,
  getProfile,
  getAboutContent,
} from "@/lib/portfolio-data";

// Selalu render data dinamis terbaru secara real-time dari database CMS
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [profile, about, projects, experiences, certificates, techGroups] = await Promise.all([
    getProfile(),
    getAboutContent(),
    getProjects(),
    getExperiences(),
    getCertificates(),
    getTechStacks(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-zinc-200 selection:text-zinc-950 dark:selection:bg-zinc-800 dark:selection:text-white transition-colors duration-300">
      <Navbar />
      <Hero initialProfile={profile} />
      <Suspense fallback={<SectionSkeleton lines={2} />}>
        <About initialAbout={about} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton lines={2} />}>
        <Experience initialExperiences={experiences} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton lines={3} />}>
        <Projects initialProjects={projects} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton lines={4} />}>
        <TechStack initialTechGroups={techGroups} />
      </Suspense>
      <Suspense fallback={<SectionSkeleton lines={3} />}>
        <Certificates initialCertificates={certificates} />
      </Suspense>
      <Contact initialProfile={profile} />
      <Footer initialProfile={profile} />
    </main>
  );
}