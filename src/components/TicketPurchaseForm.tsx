import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { AlertCircle } from 'lucide-react';

interface TicketPurchaseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketNumber: number | null;
  categoryName?: string;
  categoryPrice?: number;
}

export function TicketPurchaseForm({ 
  open, 
  onOpenChange, 
  ticketNumber,
  categoryName,
  categoryPrice 
}: TicketPurchaseFormProps) {
  const router = useRouter();
  const [paymentOption, setPaymentOption] = useState<'abvaq' | 'boi' | 'acqm'>('abvaq');
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    cpfVaqueiro: '',
    nomeCompleto: '',
    apelido: '',
    cavaloPuxador: '',
    cavaloEsteireiro: '',
    representacao: '',
    estado: '',
    cidade: '',
  });

  const paymentOptions = [
    { value: 'abvaq', label: 'ABVAQ', price: 10.00, required: true },
    { value: 'boi', label: 'Boi na TV', price: 0, required: true },
    { value: 'acqm', label: 'ACQM Plus', price: 100.00, required: false },
  ];

  const getTotalPrice = () => {
    let total = categoryPrice || 0;
    paymentOptions.forEach(option => {
      if (option.value === paymentOption || (option.value === 'acqm' && paymentOption === 'acqm')) {
        total += option.price;
      }
    });
    return total;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare checkout data
    const checkoutData = {
      tickets: [{
        ticketNumber,
        categoryName,
        categoryPrice,
        paymentOption,
        vaqueiro: formData,
      }],
      total: getTotalPrice(),
    };
    
    // Store in sessionStorage and navigate to checkout
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    router.push('/CarrinhoDeCompras');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#8b6f47] text-white max-w-[95vw] w-full lg:max-w-350 max-h-[95vh] overflow-y-auto p-8 sm:p-10 lg:p-12">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-white mb-6">
            CATEGORIA {categoryName?.toUpperCase()}
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-300 leading-relaxed">
            Preencha os campos abaixo para comprar a senha.
          </DialogDescription>
        </DialogHeader>

        {/* Warning Message */}
        <div className="bg-[#c41e3a]/20 border border-[#c41e3a] rounded-lg p-6 flex items-start gap-4 mb-8">
          <AlertCircle className="text-[#c41e3a] shrink-0" size={28} />
          <p className="text-lg text-gray-200">
            <span className="font-bold text-[#c41e3a]">EVITE PROBLEMAS!</span> Preencha o CPF com o dado do vaqueiro que irá correr a senha.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Ticket Info Section */}
          <div className="bg-[#4a4a4a] rounded-lg p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-white">
                1ª Senha - R$ {categoryPrice?.toFixed(2)}
              </h3>
            </div>

            {/* Payment Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <label className="flex items-center p-6 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-lg cursor-pointer hover:border-[#8b6f47] transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="abvaq"
                  checked={paymentOption === 'abvaq'}
                  onChange={(e) => setPaymentOption(e.target.value as any)}
                  className="w-6 h-6 text-[#c41e3a] shrink-0"
                />
                <div className="ml-5 flex-1">
                  <div className="font-bold text-white text-lg">ABVAQ + R$ 10,00</div>
                  <div className="text-sm text-gray-400 mt-1">OBRIGATÓRIA</div>
                </div>
              </label>

              <label className="flex items-center p-6 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-lg cursor-pointer hover:border-[#8b6f47] transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="boi"
                  checked={paymentOption === 'boi'}
                  onChange={(e) => setPaymentOption(e.target.value as any)}
                  className="w-6 h-6 text-[#c41e3a] shrink-0"
                />
                <div className="ml-5 flex-1">
                  <div className="font-bold text-white text-lg">Boi na TV</div>
                  <div className="text-sm text-gray-400 mt-1">OBRIGATÓRIA</div>
                </div>
              </label>

              <label className="flex items-center p-6 bg-[#0a0a0a] border-2 border-[#2a2a2a] rounded-lg cursor-pointer hover:border-[#8b6f47] transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="acqm"
                  checked={paymentOption === 'acqm'}
                  onChange={(e) => setPaymentOption(e.target.value as any)}
                  className="w-6 h-6 text-[#c41e3a] shrink-0"
                />
                <div className="ml-5 flex-1">
                  <div className="font-bold text-white text-lg">ACQM Plus + R$ 100,00</div>
                  <div className="text-sm text-gray-400 mt-1">OPCIONAL</div>
                </div>
              </label>
            </div>

            {/* Vaqueiro Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="ticket-number" className="text-white text-lg mb-3 block">Nº da senha *</Label>
                <Input
                  id="ticket-number"
                  type="text"
                  value={ticketNumber || ''}
                  disabled
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white h-14 text-lg px-4"
                />
              </div>
              <div>
                <Label htmlFor="cpf-vaqueiro" className="text-white text-lg mb-3 block">CPF do vaqueiro</Label>
                <Input
                  id="cpf-vaqueiro"
                  type="text"
                  placeholder="000.000.000-00"
                  value={formData.cpfVaqueiro}
                  onChange={(e) => handleInputChange('cpfVaqueiro', e.target.value)}
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white h-14 text-lg px-4"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <Label htmlFor="nome-completo" className="text-white text-lg mb-3 block">Nome completo do vaqueiro</Label>
                <Input
                  id="nome-completo"
                  type="text"
                  placeholder="Nome do Vaqueiro"
                  value={formData.nomeCompleto}
                  onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white h-14 text-lg px-4"
                />
              </div>
              <div>
                <Label htmlFor="apelido" className="text-white text-lg mb-3 block">Nome chamado pela locução</Label>
                <Input
                  id="apelido"
                  type="text"
                  placeholder="Apelido do Vaqueiro"
                  value={formData.apelido}
                  onChange={(e) => handleInputChange('apelido', e.target.value)}
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white h-14 text-lg px-4"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <Label htmlFor="cavalo-puxador" className="text-white text-lg mb-3 block">Cavalo puxador *</Label>
                <Input
                  id="cavalo-puxador"
                  type="text"
                  placeholder="Nome do cavalo puxador"
                  value={formData.cavaloPuxador}
                  onChange={(e) => handleInputChange('cavaloPuxador', e.target.value)}
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white h-14 text-lg px-4"
                />
              </div>
              <div>
                <Label htmlFor="cavalo-esteireiro" className="text-white text-lg mb-3 block">Esteireiro</Label>
                <Input
                  id="cavalo-esteireiro"
                  type="text"
                  placeholder="Nome do esteireiro"
                  value={formData.cavaloEsteireiro}
                  onChange={(e) => handleInputChange('cavaloEsteireiro', e.target.value)}
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white h-14 text-lg px-4"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <Label htmlFor="representacao" className="text-white text-lg mb-3 block">Representação</Label>
                <Input
                  id="representacao"
                  type="text"
                  placeholder="Digite sua representação"
                  value={formData.representacao}
                  onChange={(e) => handleInputChange('representacao', e.target.value)}
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white h-14 text-lg px-4"
                />
              </div>
              <div>
                <Label htmlFor="estado" className="text-white text-lg mb-3 block">Estado</Label>
                <Select value={formData.estado} onValueChange={(value) => handleInputChange('estado', value)}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white h-14 text-lg px-4">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="ba" className="text-white text-lg py-3">Bahia</SelectItem>
                    <SelectItem value="pe" className="text-white text-lg py-3">Pernambuco</SelectItem>
                    <SelectItem value="ce" className="text-white text-lg py-3">Ceará</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8">
              <Label htmlFor="cidade-vaqueiro" className="text-white text-lg mb-3 block">Cidade do vaqueiro</Label>
              <Input
                id="cidade-vaqueiro"
                type="text"
                placeholder="Sua cidade"
                value={formData.cidade}
                onChange={(e) => handleInputChange('cidade', e.target.value)}
                className="bg-[#0a0a0a] border-[#2a2a2a] text-white h-14 text-lg px-4"
              />
            </div>
          </div>

          {/* Policy Agreement */}
          <div className="flex items-start space-x-4 py-6">
            <Checkbox
              id="policy"
              checked={agreedToPolicy}
              onCheckedChange={(checked) => setAgreedToPolicy(checked as boolean)}
              className="border-[#8b6f47] data-[state=checked]:bg-[#c41e3a] mt-1 w-5 h-5"
            />
            <label
              htmlFor="policy"
              className="text-lg text-gray-300 leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Declaro que li e concordo com a{' '}
              <a href="#" className="text-[#4ade80] hover:underline">
                política de reembolso
              </a>{' '}
              do site.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Button
              type="button"
              className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold py-8 text-xl rounded-lg"
            >
              Fazer outra senha
            </Button>
            <Button
              type="submit"
              disabled={!agreedToPolicy}
              className="bg-[#28a745] hover:bg-[#218838] text-white font-bold py-8 text-xl rounded-lg disabled:opacity-50"
            >
              Escolher forma de pagamento
            </Button>
          </div>

          {/* Total Price Display */}
          <div className="bg-[#c41e3a]/20 border-2 border-[#c41e3a] rounded-lg p-8 text-center">
            <div className="text-lg text-gray-300 mb-3">Total a Pagar</div>
            <div className="text-6xl font-bold text-[#c41e3a]">
              R$ {getTotalPrice().toFixed(2)}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}