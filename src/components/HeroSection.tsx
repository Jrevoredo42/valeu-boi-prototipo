import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Ticket, UserPlus, Calendar, CreditCard, Trophy } from 'lucide-react';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import { useRouter } from 'next/navigation';
import  Link  from 'next/link';
import gsap from 'gsap';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Wrap in gsap.context scoped to the hero section for proper cleanup
    const ctx = gsap.context(() => {
      // Ensure elements start visible, then animate
      gsap.set(['.hero-title', '.hero-subtitle', '.hero-buttons', '.how-it-works-content'], {
        clearProps: 'all',
      });

      const tl = gsap.timeline();
      
      tl.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      })
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5')
      .from('.hero-buttons', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4')
      .from('.how-it-works-content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.3');
    }, heroRef);

    // Cleanup: reverts all GSAP inline styles when component unmounts
    return () => ctx.revert();
  }, []);

  const router = useRouter();

  const steps = [
    {
      icon: UserPlus,
      number: '01',
      title: 'Crie Sua Conta',
      description: 'Cadastre-se gratuitamente em nossa plataforma com seus dados básicos.',
    },
    {
      icon: Calendar,
      number: '02',
      title: 'Escolha o Evento',
      description: 'Navegue pelos eventos disponíveis e selecione a vaquejada que deseja participar.',
    },
    {
      icon: CreditCard,
      number: '03',
      title: 'Compre Suas Senhas',
      description: 'Selecione a categoria, número de senhas e finalize o pagamento de forma segura.',
    },
    {
      icon: Trophy,
      number: '04',
      title: 'Compita e Vença',
      description: 'Compareça no dia do evento com sua senha confirmada e bata todos os bois!',
    },
  ];

  return (
    <section ref={heroRef} id="hero" className="relative pt-24 pb-20 overflow-hidden bg-linear-to-b from-black via-[#0a0a0a] to-[#1a1a1a]">
      {/* Background Image with Parallax */}
      <div className="parallax-image absolute inset-0 z-0 opacity-20">
        <ImageWithFallback
          src="/pega-de-boi.svg"
          alt="Vaquejada Competition"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Title & CTA */}
        <div className="text-center mb-20">
          <div className="hero-title">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Garanta Sua Senha na
              <span className="block text-[#ffB900] mt-2">Próxima Vaquejada</span>
            </h1>
          </div>
          
          <div className="hero-subtitle">
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Compre suas senhas online de forma rápida e segura. Participe das melhores competições de vaquejada do país.
            </p>
          </div>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/Eventos">
              <Button onClick={() => router.push('/Eventos')} size="lg" className="bg-[#ffB900] hover:bg-[#e6a700] text-black px-8 py-7 mt-7 text-lg">
                <Ticket className="mr-2" size={24} />
                Comprar Senhas
                <ArrowRight className="ml-2" size={24} />
              </Button>
            </Link>
          </div>
        </div>

        {/* How It Works - Integrated */}
        <div className="how-it-works-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Como <span className="text-[#ffB900]">Funciona</span>?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Participe de vaquejadas em 4 passos simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="animate-card p-6 bg-black/40 rounded-xl border border-[#2a2a2a] hover:border-[#ffB900] transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-linear-to-br from-[#ffB900] to-[#cc9400] rounded-full flex items-center justify-center">
                    <step.icon size={28} className="text-white" />
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-[#c41e3a]">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-[#c41e3a]/30">
              <div className="text-4xl font-bold text-[#ffB900] mb-2">500+</div>
              <div className="text-gray-300">Eventos Realizados</div>
            </div>
            <div className="p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-[#c41e3a]/30">
              <div className="text-4xl font-bold text-[#ffB900] mb-2">10k+</div>
              <div className="text-gray-300">Vaqueiros Cadastrados</div>
            </div>
            <div className="p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-[#c41e3a]/30">
              <div className="text-4xl font-bold text-[#ffB900] mb-2">50k+</div>
              <div className="text-gray-300">Senhas Vendidas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
