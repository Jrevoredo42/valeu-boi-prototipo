import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    empresa: [
      { label: 'Sobre Nós', href: '#' },
      { label: 'Como Funciona', href: '#how-it-works' },
      { label: 'Blog', href: '#' },
      { label: 'Carreiras', href: '#' },
    ],
    suporte: [
      { label: 'Central de Ajuda', href: '#' },
      { label: 'Termos de Uso', href: '#' },
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Contato', href: '#contact' },
    ],
    vaqueiros: [
      { label: 'Criar Conta', href: '#' },
      { label: 'Próximos Eventos', href: '#' },
      { label: 'Rankings', href: '#' },
      { label: 'Histórico', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer id="contact" className="bg-black border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-[#ffB900]">Valeu</span>
              <span className="text-2xl font-bold text-white ml-1">Boi</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              A plataforma líder em venda de senhas para vaquejadas. Conectando vaqueiros aos melhores eventos.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Phone size={18} className="mr-2 text-[#8b6f47]" />
                <span>(88) 99999-9999</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail size={18} className="mr-2 text-[#8b6f47]" />
                <span>contato@valeuboi.com.br</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-bold text-white mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#ffB900] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Suporte</h3>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#ffB900] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Vaqueiros</h3>
            <ul className="space-y-2">
              {footerLinks.vaqueiros.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#ffB900] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-[#2a2a2a]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} Valeu Boi. Todos os direitos reservados.
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#ffB900] hover:border-[#ffB900] transition-all duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
