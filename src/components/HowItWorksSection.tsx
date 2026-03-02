import { UserPlus, Calendar, CreditCard, Trophy } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';

export function HowItWorksSection() {
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
    <section id="how-it-works" className="animate-section py-20 bg-linear-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Como <span className="text-[#ffB900]">Funciona</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Participe de vaquejadas em 4 passos simples
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="animate-card flex gap-6 p-6 bg-black/40 rounded-xl border border-[#2a2a2a] hover:border-[#ffB900] transition-all duration-300"
              >
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-linear-to-br from-[#ffB900] to-[#cc9400] rounded-full flex items-center justify-center">
                    <step.icon size={28} className="text-white" />
                  </div>
                </div>
                <div className="grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl font-bold" style={{ color: '#c41e3a/20' }}>{step.number}</span>
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: '4px solid rgba(196, 30, 58, 0.3)' }}>
              <ImageWithFallback
                src="/vaqueiro.png"
                alt="Arena de Vaquejada"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(255, 185, 0, 0.2)' }} />
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(196, 30, 58, 0.2)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
