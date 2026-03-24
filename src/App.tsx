import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Earnings from './components/Earnings';
import Parallax from './components/Parallax';
import Testimonials from './components/Testimonials';
import SignUp from './components/SignUp';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const anchor = (e.target as Element).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = 80;
        const y = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Parallax />
      <Earnings />
      <Testimonials />
      <SignUp />
      <Footer />
    </div>
  );
}
