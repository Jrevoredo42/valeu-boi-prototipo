"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Calendar, Clock, Ticket, SlidersHorizontal, X } from 'lucide-react';
import { ImageWithFallback } from '@/components/shared/ImageWithFallback';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: number;
  name: string;
  location: string;
  state: string;
  startDate: string;
  endDate: string;
  salesEndDate: string;
  salesEndTime: string;
  price: string;
  image: string;
  status: 'open' | 'closing-soon' | 'closed';
}

export default function Eventos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('TODOS');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const states = ['AL', 'BA', 'CE', 'MA', 'MG', 'PE', 'RN', 'TODOS'];

  const events: Event[] = [
    {
      id: 1,
      name: 'Parque TJL',
      location: 'Serra do Ramalho',
      state: 'BA',
      startDate: '23/02/2026',
      endDate: '01/03/2026',
      salesEndDate: '23/02',
      salesEndTime: '23:59',
      price: '300',
      image: 'https://images.unsplash.com/photo-1653549257722-4be4134037d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2RlbyUyMGV2ZW50JTIwcG9zdGVyfGVufDF8fHx8MTc3MTgyOTAzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'open',
    },
    {
      id: 2,
      name: 'Parque Nossa Senhora Aparecida',
      location: 'Eucildes da Cunha',
      state: 'BA',
      startDate: '23/02/2026',
      endDate: '01/03/2026',
      salesEndDate: '23/02',
      salesEndTime: '23:59',
      price: '350',
      image: 'https://images.unsplash.com/photo-1767206106365-f6d3437d1ad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWxsJTIwcmlkaW5nJTIwY2hhbXBpb25zaGlwfGVufDF8fHx8MTc3MTgyOTAzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'closing-soon',
    },
    {
      id: 3,
      name: 'Agro CPMF',
      location: 'Pilar',
      state: 'AL',
      startDate: '25/02/2026',
      endDate: '01/03/2026',
      salesEndDate: '23/02',
      salesEndTime: '23:59',
      price: '370',
      image: 'https://images.unsplash.com/photo-1760041870925-0a6ed8220ce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2RlbyUyMGNvbXBldGl0aW9uJTIwYXJlbmElMjBjcm93ZHxlbnwxfHx8fDE3NzE4MjkwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'open',
    },
    {
      id: 4,
      name: '4ª Etapa Campeonato Pernambucano',
      location: 'Recife',
      state: 'PE',
      startDate: '27/02/2026',
      endDate: '01/03/2026',
      salesEndDate: '25/02',
      salesEndTime: '18:00',
      price: '400',
      image: 'https://images.unsplash.com/photo-1760041871081-7d709a3967ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZXN0ZXJuJTIwcm9kZW8lMjBuaWdodCUyMGV2ZW50fGVufDF8fHx8MTc3MTgyOTAzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'open',
    },
    {
      id: 5,
      name: 'Vaquejada Grupo Chicon',
      location: 'Fazenda de Freitas',
      state: 'BA',
      startDate: '26/02/2026',
      endDate: '01/03/2026',
      salesEndDate: '24/02',
      salesEndTime: '23:59',
      price: '320',
      image: 'https://images.unsplash.com/photo-1741665196223-4457dd8c6680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dib3klMjByb2RlbyUyMGFjdGlvbnxlbnwxfHx8fDE3NzE4MjkwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'open',
    },
    {
      id: 6,
      name: 'Circuito Sertão',
      location: 'Serra do Ramalho',
      state: 'BA',
      startDate: '28/02/2026',
      endDate: '05/03/2026',
      salesEndDate: '26/02',
      salesEndTime: '20:00',
      price: '380',
      image: 'https://images.unsplash.com/photo-1656265457081-19f312436116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2RlbyUyMHN0YWRpdW0lMjBsaWdodHN8ZW58MXx8fHwxNzcxODI5MDMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      status: 'open',
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'TODOS' || event.state === selectedState;
    
    return matchesSearch && matchesState;
  });

  useEffect(() => {
    // Kill previous ScrollTriggers to avoid stale references
    ScrollTrigger.getAll().forEach(st => st.kill());

    // Small delay to ensure DOM is painted before animating
    const timeout = setTimeout(() => {
      const cards = gsap.utils.toArray('.event-card');

      // Set cards visible immediately, then animate them in
      gsap.set(cards, { opacity: 1, y: 0 });

      cards.forEach((card: any, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
          }
        );
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [filteredEvents]);

  useEffect(() => {
    // Animate filter panel when opened
    if (showFilters) {
      const ctx = gsap.context(() => {
        gsap.from('.filter-panel', {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
      return () => ctx.revert();
    }
  }, [showFilters]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 bg-linear-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Vaquejadas <span className="text-[#ffB900]">Disponíveis</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Encontre os melhores eventos de vaquejada e garanta sua senha
            </p>
          </div>

          {/* Search Bar with Filter Button */}
          <div className="max-w-4xl mx-auto mb-8 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input
                type="text"
                placeholder="Digite qual vaquejada você procura"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-6 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-[#ffB900] rounded-xl"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-6 rounded-xl font-bold transition-all duration-300 ${
                showFilters
                  ? 'bg-[#ffB900] text-black hover:bg-[#e6a700]'
                  : 'bg-[#1a1a1a] text-gray-300 border-2 border-[#2a2a2a] hover:border-[#ffB900] hover:text-white'
              }`}
            >
              {showFilters ? (
                <>
                  <X size={20} className="mr-2" />
                  Fechar
                </>
              ) : (
                <>
                  <SlidersHorizontal size={20} className="mr-2" />
                  Filtrar
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Filters Section - Collapsible */}
      {showFilters && (
        <section className="filter-panel py-8 bg-linear-to-b from-[#0a0a0a] to-[#1a1a1a] border-y border-[#2a2a2a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* State Filters */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                Qual o Estado da Vaquejada?
              </h3>
              <div className="flex flex-wrap gap-3">
                {states.map((state) => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className={`px-6 py-2.5 rounded-lg font-bold transition-all duration-300 ${
                      selectedState === state
                        ? 'bg-[#ffB900] text-black shadow-lg shadow-[#ffB900]/30 scale-105'
                        : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white border border-[#2a2a2a]'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>

            {/* Period Filters */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                Quando?
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedPeriod('this-month')}
                  className={`px-8 py-2.5 rounded-lg font-bold transition-all duration-300 ${
                    selectedPeriod === 'this-month'
                      ? 'bg-[#8b6f47] text-white shadow-lg shadow-[#8b6f47]/30'
                      : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white border border-[#2a2a2a]'
                  }`}
                >
                  Esse mês
                </button>
                <button
                  onClick={() => setSelectedPeriod('next-month')}
                  className={`px-8 py-2.5 rounded-lg font-bold transition-all duration-300 ${
                    selectedPeriod === 'next-month'
                      ? 'bg-[#8b6f47] text-white shadow-lg shadow-[#8b6f47]/30'
                      : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white border border-[#2a2a2a]'
                  }`}
                >
                  Próximo mês
                </button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedState !== 'TODOS' || selectedPeriod !== 'all') && (
              <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="font-bold">Filtros ativos:</span>
                  {selectedState !== 'TODOS' && (
                    <span className="bg-[#ffB900]/20 text-[#ffB900] px-3 py-1 rounded-full">
                      Estado: {selectedState}
                    </span>
                  )}
                  {selectedPeriod !== 'all' && (
                    <span className="bg-[#8b6f47]/20 text-[#8b6f47] px-3 py-1 rounded-full">
                      {selectedPeriod === 'this-month' ? 'Esse mês' : 'Próximo mês'}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSelectedState('TODOS');
                      setSelectedPeriod('all');
                    }}
                    className="text-[#ffB900] hover:underline ml-2"
                  >
                    Limpar filtros
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Events Grid */}
      <section className="py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">Nenhum evento encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="event-card group bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border-2 border-[#2a2a2a] hover:border-[#8b6f47] transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
                >
                  {/* Event Image */}
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-[#ffB900] text-black px-4 py-2 rounded-full font-bold shadow-lg">
                      R$ {event.price}
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#ffB900] transition-colors">
                      {event.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-400">
                        <MapPin size={16} className="mr-2 text-[#8b6f47]" />
                        <span>{event.location} - {event.state}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Calendar size={16} className="mr-2 text-[#8b6f47]" />
                        <span>{event.startDate} à {event.endDate}</span>
                      </div>
                    </div>

                    {/* Sales Status */}
                    <div className="bg-black/40 border border-[#8b6f47]/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-center text-[#d4a574] text-sm">
                        <Clock size={14} className="mr-2" />
                        <span className="font-bold uppercase">
                          Vendas Encerra no Dia
                        </span>
                      </div>
                      <div className="text-center text-white text-lg font-bold mt-1">
                        {event.salesEndDate} às {event.salesEndTime}
                      </div>
                    </div>

                    {/* Buy Button */}
                    <Button onClick={() => router.push('/Eventos/DetalhesDoEvento')} className="w-full bg-linear-to-r from-[#ffB900] to-[#e6a700] hover:from-[#e6a700] hover:to-[#ffB900] text-black font-bold py-6 rounded-xl shadow-lg shadow-[#ffB900]/30 group-hover:shadow-xl transition-all duration-300">
                      <Ticket className="mr-2" size={20} />
                      COMPRAR SENHA
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredEvents.length > 0 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#c41e3a] hover:border-[#c41e3a]/20 text-white hover:bg-[#c41e3a]/20 hover:text-white px-12 py-6 text-lg"
              >
                Carregar Mais Eventos
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}