import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Earnings from './components/Earnings';
import Parallax from './components/Parallax';
import Testimonials from './components/Testimonials';
import RegisterCTA from './components/RegisterCTA';
import Footer from './components/Footer';
import Register from './components/Register';

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Parallax />
      <Earnings />
      <Testimonials />
      <RegisterCTA />
      <Footer />
    </>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
