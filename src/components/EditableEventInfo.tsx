import { useState } from 'react';
import { Button } from './ui/button';
import { Edit3, Save, X } from 'lucide-react';

interface EditableEventInfoProps {
  isAdmin: boolean;
}

export default function EditableEventInfo({ isAdmin }: EditableEventInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(`Esta informação poderá ser editada por administradores para incluir regras específicas do evento.

PROFISSIONAL
• Pode comprar 4 senhas por vaqueiro
• 3 bois pra bater 1 senha

AMADOR
• Pode comprar 4 senhas por vaqueiro
• 3 bois pra bater 1 senha

ASPIRANTE
• Pode comprar 4 senhas por vaqueiro
• 3 bois pra bater 1 senha

MIRIM
• Pode comprar 1 senha por vaqueiro (SENHA ÚNICA POR ANIMAL)
• 4 bois pra bater 1 senha

FEMININO
• Pode comprar 4 senhas por vaqueira
• 3 bois pra bater 1 senha

MASTER
• 5 anos pra baixo de 60 anos
• Pode comprar 3 senhas por vaqueiro
• 3 bois pra bater 1 senha

ORGANIZAÇÃO:

QUARTA
• 1ª classificação - Profissional, Amador, Aspirante, Feminino, Master, Jovem
• No término da classificação do Derby início da classificação do Amador, Aspirante, Feminino, Master e Jovem

QUINTA
• 2ªs classificação - Profissional

SEXTA
• 3ªs classificação - Amador, Aspirante, Feminino, Master, Jovem

OBSERVAÇÕES IMPORTANTES:
• Os horários podem sofrer alterações
• Respeite as normas do parque
• É obrigatório o uso de equipamentos de segurança
• Menores de idade devem estar acompanhados dos responsáveis
`);

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você salvaria no backend
    console.log('Conteúdo salvo:', content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Restaurar conteúdo original se necessário
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] border-y border-[#2a2a2a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Edit Button */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-white">
            Informações <span className="text-[#c41e3a]">Importantes</span>
          </h2>
          
          {isAdmin && !isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[#8b6f47] hover:bg-[#6b5637] text-white"
            >
              <Edit3 size={18} className="mr-2" />
              Editar
            </Button>
          )}

          {isAdmin && isEditing && (
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="bg-[#4ade80] hover:bg-[#22c55e] text-white"
              >
                <Save size={18} className="mr-2" />
                Salvar
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444] hover:text-white"
              >
                <X size={18} className="mr-2" />
                Cancelar
              </Button>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#8b6f47]/30 rounded-2xl p-8 shadow-2xl">
          {isEditing && isAdmin ? (
            // Edit Mode
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[600px] bg-[#0a0a0a] text-white border-2 border-[#c41e3a] rounded-xl p-6 focus:outline-none focus:border-[#8b6f47] font-mono text-base leading-relaxed resize-y"
              placeholder="Digite as informações importantes do evento..."
            />
          ) : (
            // View Mode
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {content.split('\n').map((line, index) => {
                  // Check if line is a header (all caps, no bullet)
                  if (line.trim() && line === line.toUpperCase() && !line.startsWith('•')) {
                    return (
                      <h3
                        key={index}
                        className="text-2xl font-bold text-[#c41e3a] mt-8 mb-4 first:mt-0"
                      >
                        {line}
                      </h3>
                    );
                  }
                  
                  // Check if line starts with bullet
                  if (line.trim().startsWith('•')) {
                    return (
                      <div
                        key={index}
                        className="flex items-start mb-2 ml-4"
                      >
                        <span className="text-[#8b6f47] mr-3 mt-1">•</span>
                        <span className="text-gray-300">{line.trim().substring(1).trim()}</span>
                      </div>
                    );
                  }
                  
                  // Regular text
                  if (line.trim()) {
                    return (
                      <p key={index} className="text-gray-400 mb-3">
                        {line}
                      </p>
                    );
                  }
                  
                  // Empty line
                  return <div key={index} className="h-2" />;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Help Text for Admins */}
        {isAdmin && !isEditing && (
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>💡 Modo administrador ativo. Clique em "Editar" para modificar as informações.</p>
          </div>
        )}

        {isAdmin && isEditing && (
          <div className="mt-4 bg-[#1a1a1a] border border-[#8b6f47]/30 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">
              <span className="font-bold text-[#8b6f47]">Dicas de formatação:</span>
            </p>
            <ul className="text-sm text-gray-500 space-y-1 ml-4">
              <li>• Use TEXTO EM MAIÚSCULAS para criar títulos</li>
              <li>• Use "•" no início da linha para criar bullet points</li>
              <li>• Deixe linhas em branco para separar seções</li>
              <li>• O texto será formatado automaticamente ao salvar</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
