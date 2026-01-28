import { Button } from './ui/button';
import { ArrowRight, Ticket } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';

export function CTASection() {
  return (
    <section className="animate-section py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1680392407881-6dab885f7348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dib3lzJTIwd29ya2luZyUyMGNhdHRsZXxlbnwxfHx8fDE3Njk0ODcwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cowboys working"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(196, 30, 58, 0.1)' }} />
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(230, 126, 34, 0.1)' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#1a1a1a]/80 to-[#0f0f0f]/80 backdrop-blur-xl rounded-3xl p-12 sm:p-16" style={{ border: '2px solid rgba(230, 126, 34, 0.3)' }}>
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#c41e3a] to-[#8b1c2f] rounded-full mb-6">
              <Ticket size={40} className="text-white" />
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Pronto Para Competir?
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Não perca a oportunidade de participar das melhores vaquejadas do Brasil. 
            Garanta suas senhas agora e mostre sua habilidade na arena!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-[#c41e3a] hover:bg-[#a01828] text-white px-10 py-7 text-lg group"
            >
              Começar Agora
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
            </Button>
            <button
              className="px-10 py-4 text-lg font-medium rounded-md transition-all duration-300 hovercursor-pointer"
              style={{ 
                border: '2px solid #e67e22', 
                color: '#e67e22',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e67e22';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#e67e22';
              }}
            >
              Falar com Suporte
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-[#2a2a2a]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#c41e3a] mb-1">100%</div>
                <div className="text-gray-400">Seguro</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#c41e3a] mb-1">24/7</div>
                <div className="text-gray-400">Suporte</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#c41e3a] mb-1">10k+</div>
                <div className="text-gray-400">Vaqueiros</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
