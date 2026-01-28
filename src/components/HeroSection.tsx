import { useEffect, useLayoutEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Ticket } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import gsap from 'gsap';

// Use useLayoutEffect only on client side
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function HeroSection() {
  useIsomorphicLayoutEffect(() => {
    // Create a context for cleanup
    const ctx = gsap.context(() => {
      // Animate hero content on load
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-title', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo('.hero-buttons',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-24 xl:pt-28 2xl:pt-32">
      {/* Background Image with Parallax */}
      <div className="parallax-image absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a] z-10" />
        <ImageWithFallback
          src="/pega-de-boi.svg"
          alt="Vaquejada Competition"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16 lg:mt-20 xl:mt-24 2xl:mt-28">
        <div className="hero-title">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Garanta Sua Senha na
            <span className="block text-[#c41e3a] mt-2">Próxima Vaquejada</span>
          </h1>
        </div>
        
        <div className="hero-subtitle">
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Compre suas senhas online de forma rápida e segura. Participe das melhores competições de vaquejada do país.
          </p>
        </div>

        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-[#c41e3a] hover:bg-[#a01828] text-white px-8 py-6 text-lg">
            <Ticket className="mr-2" size={24} />
            Comprar Senhas
            <ArrowRight className="ml-2" size={24} />
          </Button>
          <button
            className="px-8 py-5 text-lg font-medium rounded-md transition-all duration-300 hover:text-white hover:cursor-pointer"
            style={{ 
              border: '2px solid #e67e22', 
              color: 'white',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e67e22';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#e67e22';
            }}
          >
            Saiba Mais
          </button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-black/40 backdrop-blur-sm rounded-lg" style={{ border: '1px solid rgba(230, 126, 34, 0.3)' }}>
            <div className="text-4xl font-bold text-[#c41e3a] mb-2">500+</div>
            <div className="text-gray-300">Eventos Realizados</div>
          </div>
          <div className="p-6 bg-black/40 backdrop-blur-sm rounded-lg" style={{ border: '1px solid rgba(230, 126, 34, 0.3)' }}>
            <div className="text-4xl font-bold text-[#c41e3a] mb-2">10k+</div>
            <div className="text-gray-300">Vaqueiros Cadastrados</div>
          </div>
          <div className="p-6 bg-black/40 backdrop-blur-sm rounded-lg" style={{ border: '1px solid rgba(230, 126, 34, 0.3)' }}>
            <div className="text-4xl font-bold text-[#c41e3a] mb-2">50k+</div>
            <div className="text-gray-300">Senhas Vendidas</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center animate-bounce">
          <div className="w-6 h-10 rounded-full flex justify-center" style={{ border: '2px solid #e67e22' }}>
            <div className="w-1 h-3 rounded-full mt-2" style={{ backgroundColor: '#e67e22' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
