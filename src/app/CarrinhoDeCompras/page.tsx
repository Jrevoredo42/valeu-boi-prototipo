"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, Barcode, QrCode } from 'lucide-react';
import gsap from 'gsap';

interface VaqueiroData {
  cpfVaqueiro: string;
  nomeCompleto: string;
  apelido: string;
  cavaloPuxador: string;
  cavaloEsteireiro: string;
  representacao: string;
  estado: string;
  cidade: string;
}

interface TicketData {
  ticketNumber: number;
  categoryName: string;
  categoryPrice: number;
  paymentOption: 'abvaq' | 'boi' | 'acqm';
  vaqueiro: VaqueiroData;
}

interface CheckoutData {
  tickets: TicketData[];
  total: number;
}

export default function Checkout() {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'pix' | 'credit' | 'boleto' | null>(null);

  useEffect(() => {
    // Get checkout data from sessionStorage
    const data = sessionStorage.getItem('checkoutData');
    if (data) {
      setCheckoutData(JSON.parse(data));
    } else {
      // Redirect back if no data
      router.push('/eventos');
    }

    // Animations
    gsap.from('.checkout-header', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.checkout-content', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
    });
  }, [router]);

  if (!checkoutData) {
    return null;
  }

  const getPaymentOptionPrice = (option: 'abvaq' | 'boi' | 'acqm') => {
    const prices = { abvaq: 10, boi: 0, acqm: 100 };
    return prices[option];
  };

  const getPaymentOptionLabel = (option: 'abvaq' | 'boi' | 'acqm') => {
    const labels = { abvaq: 'ABVAQ', boi: 'Boi na TV', acqm: 'ACQM Plus' };
    return labels[option];
  };

  const calculateBankFees = (subtotal: number, method: string) => {
    if (method === 'pix') return 0;
    if (method === 'credit') return subtotal * 0.0499; // 4.99%
    if (method === 'boleto') return subtotal * 0.02; // 2%
    return 0;
  };

  const getSubtotal = () => {
    return checkoutData.tickets.reduce((sum, ticket) => {
      return sum + ticket.categoryPrice + getPaymentOptionPrice(ticket.paymentOption);
    }, 0);
  };

  const subtotal = getSubtotal();
  const bankFees = selectedPaymentMethod ? calculateBankFees(subtotal, selectedPaymentMethod) : 0;
  const total = subtotal + bankFees;

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      alert('Por favor, selecione uma forma de pagamento');
      return;
    }
    // Process payment
    alert(`Processando pagamento via ${selectedPaymentMethod.toUpperCase()}...`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Back Button */}
      <div className="fixed top-24 left-4 z-40">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="bg-black/80 backdrop-blur-md border-[#8b6f47] text-white hover:bg-[#8b6f47]"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </Button>
      </div>

      {/* Main Content */}
      <section className="pt-32 pb-20 bg-linear-to-b from-black to-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="checkout-header text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Resumo do <span className="text-[#c41e3a]">Pedido</span>
            </h1>
            <p className="text-xl text-gray-400">
              Confira os detalhes e escolha a forma de pagamento
            </p>
          </div>

          <div className="checkout-content grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tickets Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Alert */}
              <div className="bg-[#fbbf24] border-2 border-[#c41e3a] rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#c41e3a] mb-3">
                  SENHA PARA REALIZAR FUGA COM SENHA PAGA E PREPARADO:
                </h3>
                <p className="text-black font-bold mb-2">
                  SENHA PARA REALIZAR BALADA COM SENHA NÃO PAGA OU PREPARADO
                </p>
                <ul className="text-black space-y-2 text-sm">
                  <li>• NÃO RESERVAMOS SENHAS AS SENHAS QUE NÃO TIVER COBRANÇA GERADA SÃO LIBERADAS NO MAPA A QUALQUER MOMENTO.</li>
                  <li>• TODAS AS SENHAS SELECIONADAS POSSUEM O PRAZO DE 72H PARA CONFIRMAÇÃO DE PAGAMENTO.</li>
                  <li>• APÓS ATINGIDO PRAZO DE CANCELAMENTO, É DEVOLUÇÃO O VALOR DA SENHA, DO ACRÉSCIMO SÃO COBRADOS PELO BANCO E O SITE NÃO CONSEGUE DEVOLVER.</li>
                </ul>
              </div>

              {/* Tickets Table */}
              <div className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#8b6f47]/30 rounded-2xl overflow-hidden">
                <div className="bg-linear-to-r from-[#c41e3a] to-[#8b6f47] p-4">
                  <h2 className="text-2xl font-bold text-white text-center">
                    RESUMO DAS SENHAS
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-white">
                    <thead>
                      <tr className="bg-[#2a2a2a]">
                        <th className="p-4 text-left">Descrição</th>
                        <th className="p-4 text-left">Senha</th>
                        <th className="p-4 text-left">Vaqueiro</th>
                        <th className="p-4 text-left">Categoria</th>
                        <th className="p-4 text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {checkoutData.tickets.map((ticket, index) => (
                          <tr key={index} className="border-b border-[#2a2a2a]">
                            <td className="p-4">Senha + {getPaymentOptionLabel(ticket.paymentOption)}</td>
                            <td className="p-4">{ticket.ticketNumber}</td>
                            <td className="p-4">{ticket.vaqueiro.apelido || ticket.vaqueiro.nomeCompleto}</td>
                            <td className="p-4">{ticket.categoryName}</td>
                            <td className="p-4 text-right font-bold">
                              R$ {(ticket.categoryPrice + getPaymentOptionPrice(ticket.paymentOption)).toFixed(2)}
                            </td>
                          </tr>
                      ))}
                      
                      {/* Subtotal */}
                      <tr className="bg-[#1a1a1a]">
                        <td colSpan={4} className="p-4 text-right font-bold text-lg">
                          Subtotal:
                        </td>
                        <td className="p-4 text-right font-bold text-lg">
                          R$ {subtotal.toFixed(2)}
                        </td>
                      </tr>

                      {/* Bank Fees */}
                      {selectedPaymentMethod && bankFees > 0 && (
                        <tr className="bg-[#2a2a2a]">
                          <td colSpan={4} className="p-4 text-right text-gray-400">
                            Taxa bancária ({selectedPaymentMethod === 'credit' ? '4,99%' : '2%'}):
                          </td>
                          <td className="p-4 text-right text-gray-400">
                            R$ {bankFees.toFixed(2)}
                          </td>
                        </tr>
                      )}

                      {/* Total */}
                      <tr className="bg-linear-to-r from-[#c41e3a] to-[#a01828]">
                        <td colSpan={4} className="p-4 text-right font-bold text-2xl">
                          Total:
                        </td>
                        <td className="p-4 text-right font-bold text-2xl">
                          R$ {total.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-6">
              <div className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#8b6f47]/30 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Forma de Pagamento</h2>

                <div className="space-y-4">
                  {/* PIX */}
                  <button
                    onClick={() => setSelectedPaymentMethod('pix')}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedPaymentMethod === 'pix'
                        ? 'border-[#00d4a1] bg-[#00d4a1]/10'
                        : 'border-[#2a2a2a] hover:border-[#8b6f47]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#00d4a1] rounded-full flex items-center justify-center">
                        <QrCode size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold text-lg">Pagar com PIX</div>
                        <div className="text-sm text-gray-400">Sem taxas adicionais</div>
                      </div>
                    </div>
                  </button>

                  {/* Credit Card */}
                  <button
                    onClick={() => setSelectedPaymentMethod('credit')}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedPaymentMethod === 'credit'
                        ? 'border-[#fbbf24] bg-[#fbbf24]/10'
                        : 'border-[#2a2a2a] hover:border-[#8b6f47]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#fbbf24] rounded-full flex items-center justify-center">
                        <CreditCard size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold text-lg">Cartão de Crédito</div>
                        <div className="text-sm text-gray-400">+ 4,99% de taxa</div>
                      </div>
                    </div>
                  </button>

                  {/* Boleto */}
                  <button
                    onClick={() => setSelectedPaymentMethod('boleto')}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedPaymentMethod === 'boleto'
                        ? 'border-[#c41e3a] bg-[#c41e3a]/10'
                        : 'border-[#2a2a2a] hover:border-[#8b6f47]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#c41e3a] rounded-full flex items-center justify-center">
                        <Barcode size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-bold text-lg">Boleto Bancário</div>
                        <div className="text-sm text-gray-400">+ 2% de taxa</div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Confirm Button */}
                <Button
                  onClick={handlePayment}
                  disabled={!selectedPaymentMethod}
                  className="w-full mt-6 bg-linear-to-r from-[#28a745] to-[#218838] hover:from-[#218838] hover:to-[#1e7e34] text-white font-bold py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar Pagamento
                </Button>
              </div>

              {/* Total Summary Card */}
              <div className="bg-linear-to-br from-[#c41e3a]/20 to-[#8b6f47]/20 border-2 border-[#c41e3a] rounded-2xl p-6 text-center">
                <div className="text-sm text-gray-300 mb-2">Total a Pagar</div>
                <div className="text-5xl font-bold text-[#c41e3a] mb-2">
                  R$ {total.toFixed(2)}
                </div>
                {selectedPaymentMethod && bankFees > 0 && (
                  <div className="text-xs text-gray-400">
                    Inclui R$ {bankFees.toFixed(2)} de taxa bancária
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
