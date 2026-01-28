import { useEffect, useLayoutEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { CategoriesSection } from './components/CategoriesSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Use useLayoutEffect only on client side
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function App() {
  useIsomorphicLayoutEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Create a context for cleanup
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      const sections = gsap.utils.toArray('.animate-section');
      
      sections.forEach((section: any) => {
        gsap.fromTo(section, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              end: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Animate cards
      const cards = gsap.utils.toArray('.animate-card');
      
      cards.forEach((card: any, index) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            delay: index * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Parallax effect on hero image
      gsap.to('.parallax-image', {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-image',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CategoriesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
