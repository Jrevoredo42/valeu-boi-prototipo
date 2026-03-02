"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar,
  Ticket, 
  ArrowLeft,
  Edit3,
  Check,
  Phone,
  Mail,
  Users,
  Trophy,
  DollarSign
} from 'lucide-react';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import EditableEventInfo  from '@/components/EditableEventInfo';
import gsap from 'gsap';

export default function EventDetail() {
  const [isAdmin, setIsAdmin] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const router = useRouter();
  const [salesEndDate] = useState(
    () => new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()
  );

  // Mock event data
  const event = {
    id: 1,
    name: 'Parque TJL - Grande Vaquejada',
    location: 'Serra do Ramalho',
    state: 'BA',
    startDate: '25/01/2026',
    endDate: '01/03/2026',
    salesEndDate,
    address: 'Rodovia BA-160, Km 45, Serra do Ramalho - BA',
    image: 'https://images.unsplash.com/photo-1653549257722-4be4134037d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2RlbyUyMGV2ZW50JTIwcG9zdGVyfGVufDF8fHx8MTc3MTgyOTAzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    posterImage: 'https://images.unsplash.com/photo-1587555009307-4b73aaab7d9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2RlbyUyMGV2ZW50JTIwcG9zdGVyJTIwZmx5ZXJ8ZW58MXx8fHwxNzcxODMwNzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    contact: {
      phone: '(77) 99999-9999',
      email: 'contato@parquetjl.com.br',
      whatsapp: '77999999999',
    },
  };

  const categories = [
    {
      name: 'PROFISSIONAL',
      price: 'R$ 500',
      description: '4 senhas por vaqueiro',
      details: '3 bois pra bater 1 senha',
      spots: 50,
      color: 'from-[#ffB900] to-[#cc9400]',
    },
    {
      name: 'AMADOR',
      price: 'R$ 300',
      description: '4 senhas por vaqueiro',
      details: '3 bois pra bater 1 senha',
      spots: 80,
      color: 'from-[#8b6f47] to-[#6b5637]',
    },
    {
      name: 'ASPIRANTE',
      price: 'R$ 250',
      description: '4 senhas por vaqueiro',
      details: '3 bois pra bater 1 senha',
      spots: 100,
      color: 'from-[#ffB900] to-[#cc9400]',
    },
    {
      name: 'MIRIM',
      price: 'R$ 150',
      description: '1 senha por vaqueiro (SENHA ÚNICA POR ANIMAL)',
      details: '4 bois pra bater 1 senha',
      spots: 40,
      color: 'from-[#8b6f47] to-[#6b5637]',
    },
    {
      name: 'FEMININO',
      price: 'R$ 280',
      description: '4 senhas por vaqueira',
      details: '3 bois pra bater 1 senha',
      spots: 60,
      color: 'from-[#ffB900] to-[#cc9400]',
    },
  ];

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(salesEndDate).getTime();
      const distance = target - now;

      if (distance <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [salesEndDate]);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo('.category-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Back Button */}
      <div className="fixed top-24 left-4 z-40">
        <Link href="/Eventos">
          <Button
            variant="outline"
            className="bg-black/80 backdrop-blur-md border-[#8b6f47] text-white hover:bg-[#8b6f47]"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </Button>
        </Link>
      </div>

      {/* Admin Toggle (simulando painel admin) */}
      <div className="fixed top-24 right-4 z-40">
        <Button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`backdrop-blur-md ${
            isAdmin
              ? 'bg-[#ffB900] hover:bg-[#e6a700] text-black'
              : 'bg-black/80 border-2 border-[#2a2a2a] text-gray-400 hover:text-white'
          }`}
        >
          {isAdmin ? (
            <>
              <Check size={18} className="mr-2" />
              Modo Admin
            </>
          ) : (
            <>
              <Edit3 size={18} className="mr-2" />
              Ativar Admin
            </>
          )}
        </Button>
      </div>

      {/* Countdown Section */}
      <section className="pt-32 pb-8 bg-linear-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl text-gray-400 mb-4 uppercase tracking-wider">
              Vendas Encerram em
            </h2>
            <div className="flex justify-center gap-4">
              {[
                { label: 'Dias', value: countdown.days },
                { label: 'Horas', value: countdown.hours },
                { label: 'Minutos', value: countdown.minutes },
                { label: 'Segundos', value: countdown.seconds },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#8b6f47] rounded-xl p-4 min-w-20"
                >
                  <div className="text-4xl font-bold text-[#ffB900]">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-400 uppercase mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Event Poster */}
            <div className="hero-content">
              <div className="relative rounded-2xl overflow-hidden border-4 border-[#8b6f47]/30 shadow-2xl group">
                <ImageWithFallback
                  src={event.posterImage}
                  alt={event.name}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Event Info */}
            <div className="hero-content space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  {event.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-400">
                  <div className="flex items-center">
                    <MapPin size={20} className="mr-2 text-[#8b6f47]" />
                    <span>{event.location} - {event.state}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={20} className="mr-2 text-[#8b6f47]" />
                    <span>{event.startDate} à {event.endDate}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-xl p-4 text-center">
                  <Users className="mx-auto mb-2 text-[#ffB900]" size={32} />
                  <div className="text-2xl font-bold text-white">330</div>
                  <div className="text-xs text-gray-400">Vagas Totais</div>
                </div>
                <div className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-xl p-4 text-center">
                  <Trophy className="mx-auto mb-2 text-[#8b6f47]" size={32} />
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-xs text-gray-400">Categorias</div>
                </div>
                <div className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-xl p-4 text-center">
                  <DollarSign className="mx-auto mb-2 text-[#ffB900]" size={32} />
                  <div className="text-2xl font-bold text-white">300k</div>
                  <div className="text-xs text-gray-400">Em Prêmios</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#8b6f47]/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Informações de Contato
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Phone size={18} className="mr-3 text-[#8b6f47]" />
                    <span>{event.contact.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Mail size={18} className="mr-3 text-[#8b6f47]" />
                    <span>{event.contact.email}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin size={18} className="mr-3 text-[#8b6f47]" />
                    <span className="text-sm">{event.address}</span>
                  </div>
                </div>
              </div>

              {/* Main CTA Button */}
              <Button onClick={() => router.push('/Senha')} className="w-full bg-linear-to-r from-[#ffB900] to-[#e6a700] hover:from-[#e6a700] hover:to-[#ffB900] text-black font-bold py-8 text-xl rounded-xl shadow-lg shadow-[#ffB900]/40 hover:shadow-2xl transition-all duration-300">
                <Ticket className="mr-3" size={28} />
                FAZER MINHA SENHA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Editable Event Information Section */}
      <EditableEventInfo isAdmin={isAdmin} />

      {/* Categories Section */}
      <section className="py-16 bg-linear-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Categorias <span className="text-[#ffB900]">Disponíveis</span>
            </h2>
            <p className="text-xl text-gray-400">
              Escolha a categoria ideal para sua competição
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="category-card bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#2a2a2a] rounded-2xl p-6 hover:border-[#8b6f47] transition-all duration-300 hover:transform hover:scale-105"
              >
                <div
                  className={`bg-linear-to-r ${category.color} text-white px-4 py-2 rounded-lg inline-block mb-4`}
                >
                  <h3 className="text-xl font-bold">{category.name}</h3>
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-[#ffB900] mb-2">
                    {category.price}
                  </div>
                  <p className="text-gray-400">{category.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{category.details}</p>
                </div>

                <div className="flex items-center justify-between mb-4 p-3 bg-black/40 rounded-lg">
                  <span className="text-gray-400 text-sm">Vagas disponíveis</span>
                  <span className="text-white font-bold text-lg">{category.spots}</span>
                </div>

                <Button className={`w-full bg-linear-to-r ${category.color} hover:opacity-90 text-white font-bold py-4`}>
                  Comprar Senha
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Buy Button (Mobile) */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button
          size="lg"
          className="bg-[#ffB900] hover:bg-[#e6a700] text-black rounded-full shadow-2xl shadow-[#ffB900]/50 p-6"
        >
          <Ticket size={28} />
        </Button>
      </div>

      <Footer />
    </div>
  );
}