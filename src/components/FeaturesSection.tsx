import { Ticket, Shield, Clock, TrendingUp, Users, MapPin } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Ticket,
      title: 'Compra Rápida',
      description: 'Adquira suas senhas em poucos cliques, sem complicação.',
      iconColor: '#ffB900',
    },
    {
      icon: Shield,
      title: 'Pagamento Seguro',
      description: 'Transações protegidas com as melhores tecnologias de segurança.',
      iconColor: '#c41e3a',
    },
    {
      icon: Clock,
      title: 'Disponível 24/7',
      description: 'Compre suas senhas a qualquer hora, de qualquer lugar.',
      iconColor: '#ffB900',
    },
    {
      icon: TrendingUp,
      title: 'Acompanhamento',
      description: 'Veja seus resultados e histórico de participações.',
      iconColor: '#c41e3a',
    },
    {
      icon: Users,
      title: 'Senhas Casadinhas',
      description: 'Compre senhas individuais ou em dupla para competir junto.',
      iconColor: '#ffB900',
    },
    {
      icon: MapPin,
      title: 'Eventos Regionais',
      description: 'Encontre vaquejadas próximas a você em todo o país.',
      iconColor: '#c41e3a',
    },
  ];

  return (
    <section className="animate-section py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Por Que Escolher o <span className="text-[#ffB900]">Valeu Boi</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Oferecemos a melhor experiência para vaqueiros profissionais e amadores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-card group bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] p-8 rounded-2xl border border-[#2a2a2a] transition-all duration-300 hover:transform hover:scale-105"
              style={{ 
                borderColor: '#2a2a2a',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c41e3a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2a2a2a';
              }}
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300" style={{ color: feature.iconColor }}>
                <feature.icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
