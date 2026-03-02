"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Edit3,
  Check,
  DollarSign
} from 'lucide-react';
import { TicketGrid } from '@/components/TicketGrid';
import { LoginRegisterModal } from '@/components/LoginRegisterModal';
import { TicketPurchaseForm } from '@/components/TicketPurchaseForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import gsap from 'gsap';

interface Category {
  id: string;
  name: string;
  price: number;
  totalTickets: number;
}

type TicketStatus = 'available' | 'pending' | 'sold';

interface Ticket {
  id: number;
  status: TicketStatus;
}

export default function Senha() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  // Mock categories
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'PROFISSIONAL', price: 500, totalTickets: 60 },
    { id: '2', name: 'AMADOR', price: 300, totalTickets: 80 },
    { id: '3', name: 'ASPIRANTE', price: 250, totalTickets: 100 },
    { id: '4', name: 'FEMININO', price: 280, totalTickets: 60 },
    { id: '5', name: 'MIRIM', price: 150, totalTickets: 40 },
  ]);

  const [editingCategoryData, setEditingCategoryData] = useState({
    price: 0,
    totalTickets: 0,
  });

  // Mock tickets data
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Initialize tickets based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      if (category) {
        const newTickets: Ticket[] = Array.from({ length: category.totalTickets }, (_, i) => ({
          id: i + 1,
          status: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'pending' : 'sold') : 'available',
        }));
        setTickets(newTickets);
      }
    }
  }, [selectedCategory, categories]);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.purchase-header', { clearProps: 'all' });
      gsap.from('.purchase-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTicketClick = (ticketId: number, status: TicketStatus) => {
    if (status === 'sold') return; // Cannot select sold tickets

    setSelectedTicket(ticketId);
    
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowPurchaseForm(true);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowPurchaseForm(true);
  };

  const handleSaveCategoryEdit = () => {
    if (selectedCategory) {
      setCategories(prev => prev.map(cat => 
        cat.id === selectedCategory 
          ? { ...cat, price: editingCategoryData.price, totalTickets: editingCategoryData.totalTickets }
          : cat
      ));
      setIsEditingCategory(false);
    }
  };

  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Back Button */}
      <div className="fixed top-24 left-4 z-40">
        <Link href="/Eventos/DetalhesDoEvento">
          <Button
            variant="outline"
            className="bg-black/80 backdrop-blur-md border-[#8b6f47] text-white hover:bg-[#8b6f47]"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </Button>
        </Link>
      </div>

      {/* Admin Toggle */}
      <div className="fixed top-24 right-4 z-40">
        <Button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`backdrop-blur-md ${
            isAdmin
              ? 'bg-[#c41e3a] hover:bg-[#a01828] text-white'
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

      {/* Main Content */}
      <section className="pt-32 pb-20 bg-linear-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="purchase-header text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Comprar <span className="text-[#c41e3a]">Senhas</span>
            </h1>
            <p className="text-xl text-gray-400">
              Parque TJL - Grande Vaquejada
            </p>
          </div>

          {/* Category Selection */}
          <div className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#8b6f47]/30 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Escolha a Categoria</h2>
              {isAdmin && selectedCategory && !isEditingCategory && (
                <Button
                  onClick={() => {
                    const cat = categories.find(c => c.id === selectedCategory);
                    if (cat) {
                      setEditingCategoryData({
                        price: cat.price,
                        totalTickets: cat.totalTickets,
                      });
                      setIsEditingCategory(true);
                    }
                  }}
                  className="bg-[#8b6f47] hover:bg-[#6b5637] text-white"
                  size="sm"
                >
                  <Edit3 size={16} className="mr-2" />
                  Editar Categoria
                </Button>
              )}
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full bg-[#0a0a0a] border-[#2a2a2a] text-white h-14 text-lg">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                {categories.map((category) => (
                  <SelectItem 
                    key={category.id} 
                    value={category.id}
                    className="text-white hover:bg-[#2a2a2a] cursor-pointer"
                  >
                    {category.name} - R$ {category.price.toFixed(2)} ({category.totalTickets} senhas)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Admin Edit Category */}
            {isAdmin && isEditingCategory && currentCategory && (
              <div className="mt-6 p-6 bg-black/40 border border-[#c41e3a]/30 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4">
                  Editando: {currentCategory.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-gray-300 mb-2">Preço da Senha</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <Input
                        type="number"
                        value={editingCategoryData.price}
                        onChange={(e) => setEditingCategoryData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2">Total de Senhas</Label>
                    <Input
                      type="number"
                      value={editingCategoryData.totalTickets}
                      onChange={(e) => setEditingCategoryData(prev => ({ ...prev, totalTickets: parseInt(e.target.value) }))}
                      className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveCategoryEdit}
                    className="bg-[#4ade80] hover:bg-[#22c55e] text-white"
                  >
                    <Check size={18} className="mr-2" />
                    Salvar Alterações
                  </Button>
                  <Button
                    onClick={() => setIsEditingCategory(false)}
                    variant="outline"
                    className="border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            {/* Price Display */}
            {selectedCategory && currentCategory && !isEditingCategory && (
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-black/40 border border-[#8b6f47]/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-[#c41e3a]">
                    R$ {currentCategory.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">PREÇO BASE</div>
                </div>
                <div className="bg-black/40 border border-[#8b6f47]/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-[#8b6f47]">
                    {tickets.filter(t => t.status === 'available' || t.status === 'pending').length}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">DISPONÍVEIS</div>
                </div>
                <div className="bg-black/40 border border-[#8b6f47]/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">
                    {currentCategory.totalTickets}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">TOTAL</div>
                </div>
              </div>
            )}
          </div>

          {/* Ticket Grid */}
          {selectedCategory && currentCategory && (
            <TicketGrid
              tickets={tickets}
              onTicketClick={handleTicketClick}
              categoryPrice={currentCategory.price}
            />
          )}

          {!selectedCategory && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">
                Selecione uma categoria para ver as senhas disponíveis
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Login/Register Modal */}
      <LoginRegisterModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onLogin={handleLogin}
      />

      {/* Purchase Form Modal */}
      <TicketPurchaseForm
        open={showPurchaseForm}
        onOpenChange={setShowPurchaseForm}
        ticketNumber={selectedTicket}
        categoryName={currentCategory?.name}
        categoryPrice={currentCategory?.price}
      />

      <Footer />
    </div>
  );
}
