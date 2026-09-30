import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import CoreFocus from '@/components/sections/CoreFocus';

// Dynamic imports without ssr:false (allowed in server components)
const Skills = dynamic(() => import('@/components/sections/Skills'));
const Projects = dynamic(() => import('@/components/sections/Projects'));
const Certificates = dynamic(() => import('@/components/sections/Certificates'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const Journey = dynamic(() => import('@/components/sections/Journey'));
const GitHubSection = dynamic(() => import('@/components/sections/GitHubSection'));
const Contact = dynamic(() => import('@/components/sections/Contact'));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <CoreFocus />
        <Skills />
        <Projects />
        <Certificates />
        <Testimonials />
        <Journey />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
