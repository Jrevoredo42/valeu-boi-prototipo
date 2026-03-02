"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter, usePathname } from 'next/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allMenuItems = [
    { label: 'Início', href: '#hero' },
    { label: 'Como Funciona', href: '#how-it-works' },
    { label: 'Categorias', href: '#categories' },
    { label: 'Contato', href: '#contact' },
  ];

  const menuItems = isHome ? allMenuItems : [];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => router.push('/')}>
            <span className="text-2xl font-bold text-white">Valeu o</span>
            <span className="text-2xl font-bold text-[#ffB900] ml-1">Boi</span>
           </button>
            {/*<img src="/boi.png" alt="Valeu o Boi Logo" className="h-16 w-auto mt-3" />*/}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-[#ffB900] transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <Button onClick={() => router.push('/Eventos')} className="bg-[#ffB900] hover:bg-[#e6a700] text-black">
              Comprar Senhas
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-gray-300 hover:text-[#ffB900] transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full bg-[#ffB900] hover:bg-[#e6a700] text-black">
              Comprar Senhas
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
