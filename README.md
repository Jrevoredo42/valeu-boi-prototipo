# 🐂 Valeu o Boi - Landing Page para Vaquejadas

Landing page moderna para venda de senhas de vaquejadas, desenvolvida com Next.js 16, React 18, Tailwind CSS e animações GSAP.



## 📸 Preview

A landing page apresenta:
- Hero section com imagem de fundo e estatísticas
- Seção de funcionalidades/benefícios
- Como funciona (passo a passo)
- Categorias de senhas (Profissional, Amador, Feminino, Mirim)
- Call-to-action
- Footer com links e contato

## 🚀 Tecnologias

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 18
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Componentes UI:** Radix UI + shadcn/ui
- **Animações:** GSAP + ScrollTrigger
- **Ícones:** Lucide React

## 📦 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta do projeto
cd "Landing Page para Vaquejadas"

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento em http://localhost:3000 |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Executa o linter |

## 📁 Estrutura do Projeto

```
├── public/                    # Assets estáticos
│   ├── pega-de-boi.svg
│   ├── pega-de-boi.png
│   └── vaqueiro.png
├── src/
│   ├── app/                   # App Router (Next.js)
│   │   ├── layout.tsx        # Layout raiz
│   │   └── [[...slug]]/      # Catch-all route
│   │       ├── page.tsx
│   │       └── client.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── CategoriesSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── Footer.tsx
│   │   ├── shared/           # Componentes compartilhados
│   │   └── ui/               # Componentes shadcn/ui
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── index.css
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Vermelho Principal | `#c41e3a` | Botões primários, destaques |
| Laranja Secundário | `#e67e22` | Bordas, hover effects |
| Fundo Escuro | `#0a0a0a` | Background principal |
| Branco | `#ffffff` | Textos |
| Cinza | `#2a2a2a` | Bordas, separadores |

## ✨ Funcionalidades

- ✅ Design responsivo (mobile-first)
- ✅ Animações suaves com GSAP ScrollTrigger
- ✅ Efeito parallax no hero
- ✅ Componentes acessíveis (Radix UI)
- ✅ TypeScript para type-safety
- ✅ Build otimizado para produção (SPA mode)

## 📄 Licença

Este projeto é privado e de uso exclusivo do cliente.

---

Desenvolvido com ❤️ para a comunidade de vaqueiros do Brasil 🇧🇷
