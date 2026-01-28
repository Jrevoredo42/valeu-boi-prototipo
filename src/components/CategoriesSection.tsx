import { Award, Star, Users2, Baby } from 'lucide-react';
import { Button } from './ui/button';

export function CategoriesSection() {
  const categories = [
    {
      icon: Award,
      name: 'Profissional',
      description: 'Para vaqueiros experientes e competidores profissionais.',
      features: ['Premiação alta', 'Competição acirrada', 'Rankings nacionais'],
      gradientFrom: '#c41e3a',
      gradientTo: '#8b1c2f',
      borderColor: '#c41e3a',
    },
    {
      icon: Star,
      name: 'Amador',
      description: 'Ideal para quem está começando na vaquejada.',
      features: ['Ambiente amigável', 'Aprendizado', 'Premiação justa'],
      gradientFrom: '#e67e22',
      gradientTo: '#d35400',
      borderColor: '#e67e22',
      featured: true,
    },
    {
      icon: Users2,
      name: 'Feminino',
      description: 'Categoria exclusiva para vaqueiras.',
      features: ['Competição feminina', 'Premiação especial', 'Networking'],
      gradientFrom: '#c41e3a',
      gradientTo: '#8b1c2f',
      borderColor: '#c41e3a',
    },
    {
      icon: Baby,
      name: 'Mirim',
      description: 'Para jovens promessas da vaquejada.',
      features: ['Formação de atletas', 'Supervisão', 'Troféus'],
      gradientFrom: '#e67e22',
      gradientTo: '#d35400',
      borderColor: '#e67e22',
    },
  ];

  return (
    <section id="categories" className="animate-section py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Escolha Sua <span className="text-[#c41e3a]">Categoria</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Temos opções para todos os níveis de experiência
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`animate-card relative overflow-visible bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl border-2 p-6 hover:transform hover:scale-105 transition-all duration-300 ${
                category.featured ? 'lg:scale-105 shadow-2xl' : ''
              }`}
              style={{ borderColor: category.borderColor }}
            >
              {category.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span 
                    className="text-white px-4 py-1 rounded-full text-sm font-bold inline-block"
                    style={{ backgroundColor: '#e67e22' }}
                  >
                    MAIS POPULAR
                  </span>
                </div>
              )}

              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `linear-gradient(to bottom right, ${category.gradientFrom}, ${category.gradientTo})` }}
              >
                <category.icon size={32} className="text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
              <p className="text-gray-400 mb-4 min-h-[3rem]">{category.description}</p>

              <div className="mb-6">
                <div className="text-sm text-gray-500">por senha</div>
              </div>

              <ul className="space-y-3 mb-6">
                {category.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <div 
                      className="w-1.5 h-1.5 rounded-full mr-2" 
                      style={{ backgroundColor: category.gradientFrom }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full hover:opacity-90 text-white"
                style={{ background: `linear-gradient(to right, ${category.gradientFrom}, ${category.gradientTo})` }}
              >
                Comprar Senha
              </Button>
            </div>
          ))}
        </div>

        {/* Casadinha Info */}
        <div className="mt-16 bg-gradient-to-r from-[#1a1a1a] via-[#2a1a1a] to-[#1a1a1a] border border-[#c41e3a]/30 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Users2 className="text-[#c41e3a] mr-3" size={40} />
            <h3 className="text-3xl font-bold text-white">Senha Casadinha</h3>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Compre senhas em dupla (Puxador + Esteireiro)
          </p>
          <Button size="lg" className="bg-[#c41e3a] hover:bg-[#a01828] text-white">
            Ver Senhas Casadinhas
          </Button>
        </div>
      </div>
    </section>
  );
}
