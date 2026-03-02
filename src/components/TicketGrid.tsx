interface Ticket {
  id: number;
  status: 'available' | 'pending' | 'sold';
}

interface TicketGridProps {
  tickets: Ticket[];
  onTicketClick: (ticketId: number, status: 'available' | 'pending' | 'sold') => void;
  categoryPrice: number;
}

export function TicketGrid({ tickets, onTicketClick, categoryPrice: _categoryPrice }: TicketGridProps) {
  const getTicketStyle = (status: 'available' | 'pending' | 'sold') => {
    switch (status) {
      case 'available':
        return 'bg-transparent border-2 border-[#8b6f47] text-white hover:bg-[#8b6f47]/20 cursor-pointer';
      case 'pending':
        return 'bg-[#ea580c] border-2 border-[#ea580c] text-white hover:bg-[#ea580c]/80 cursor-pointer';
      case 'sold':
        return 'bg-[#c41e3a] border-2 border-[#c41e3a] text-white cursor-not-allowed opacity-70';
      default:
        return '';
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#8b6f47]/30 rounded-2xl p-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">MAPA DE SENHAS</h2>
        <p className="text-gray-400">Clique na senha desejada para comprar</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mb-8 p-4 bg-black/40 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-transparent border-2 border-[#8b6f47] rounded"></div>
          <span className="text-gray-300">Senhas disponíveis para compra</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#ea580c] border-2 border-[#ea580c] rounded"></div>
          <span className="text-gray-300">Senhas com pagamento pendente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#c41e3a] border-2 border-[#c41e3a] rounded"></div>
          <span className="text-gray-300">Senhas vendidas</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-2 mb-6">
        {tickets.map((ticket) => (
          <button
            key={ticket.id}
            onClick={() => onTicketClick(ticket.id, ticket.status)}
            disabled={ticket.status === 'sold'}
            className={`
              aspect-square rounded-lg font-bold text-sm sm:text-base
              transition-all duration-200 transform hover:scale-105
              flex items-center justify-center
              ${getTicketStyle(ticket.status)}
            `}
          >
            {ticket.id}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-black/40 border border-[#8b6f47]/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#8b6f47]">
            {tickets.filter(t => t.status === 'available').length}
          </div>
          <div className="text-sm text-gray-400 mt-1">Disponíveis</div>
        </div>
        <div className="bg-black/40 border border-[#ea580c]/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#ea580c]">
            {tickets.filter(t => t.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-400 mt-1">Pendentes</div>
        </div>
        <div className="bg-black/40 border border-[#c41e3a]/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-[#c41e3a]">
            {tickets.filter(t => t.status === 'sold').length}
          </div>
          <div className="text-sm text-gray-400 mt-1">Vendidas</div>
        </div>
      </div>
    </div>
  );
}
