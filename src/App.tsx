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
    // GSAP: Smooth scroll anchoring
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (!href) return;
        const target = document.querySelector(href);
        if (target) {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: target as Element, offsetY: 80 },
            ease: 'power3.inOut',
          });
        }
      });
    });

    return () => {
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
