import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LoginRegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: () => void;
}

export function LoginRegisterModal({ open, onOpenChange, onLogin }: LoginRegisterModalProps) {
  const [loginMethod, setLoginMethod] = useState<'cpf' | 'email' | 'phone'>('cpf');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-2 border-[#8b6f47] text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            INFORMAÇÃO IMPORTANTE
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300 bg-[#8b6f47]/20 border border-[#8b6f47] rounded-lg p-4">
            Você está muito próximo de concluir sua senha. Para continuar o pagamento das senhas que você acabou de preencher é necessário fazer login com seus dados cadastrados ou se você está usando o site pela primeira vez realizar seu cadastro.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-2 bg-[#0a0a0a]">
            <TabsTrigger 
              value="login"
              className="data-[state=active]:bg-[#c41e3a] data-[state=active]:text-white"
            >
              LOGIN
            </TabsTrigger>
            <TabsTrigger 
              value="register"
              className="data-[state=active]:bg-[#8b6f47] data-[state=active]:text-white"
            >
              CADASTRO
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label className="text-white mb-4 block">Escolha como você quer fazer o Login</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="loginMethod"
                      value="cpf"
                      checked={loginMethod === 'cpf'}
                      onChange={() => setLoginMethod('cpf')}
                      className="w-4 h-4 text-[#c41e3a]"
                    />
                    <span>Fazer login com CPF/CNPJ</span>
                  </label>
                  <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="loginMethod"
                      value="email"
                      checked={loginMethod === 'email'}
                      onChange={() => setLoginMethod('email')}
                      className="w-4 h-4 text-[#c41e3a]"
                    />
                    <span>Fazer login com E-mail</span>
                  </label>
                  <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="loginMethod"
                      value="phone"
                      checked={loginMethod === 'phone'}
                      onChange={() => setLoginMethod('phone')}
                      className="w-4 h-4 text-[#c41e3a]"
                    />
                    <span>Fazer login com telefone</span>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="login-identifier" className="text-white">
                  {loginMethod === 'cpf' ? 'CPF/CNPJ' : loginMethod === 'email' ? 'E-mail' : 'Telefone'}
                </Label>
                <Input
                  id="login-identifier"
                  type="text"
                  placeholder={
                    loginMethod === 'cpf' 
                      ? '000.000.000-00' 
                      : loginMethod === 'email' 
                      ? 'seu@email.com' 
                      : '(00) 0 0000-0000'
                  }
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white mt-2"
                />
              </div>

              <div>
                <Label htmlFor="login-password" className="text-white">Senha cadastrada</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••••"
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white mt-2"
                />
              </div>

              <div className="text-center">
                <a href="#" className="text-[#4ade80] hover:underline text-sm">
                  Recuperar acesso
                </a>
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#17a2b8] hover:bg-[#138496] text-white py-6 text-lg"
              >
                Acessar
              </Button>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="mt-6">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="register-name" className="text-white">Nome completo / Razão Social</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Seu nome completo"
                    className="bg-[#0a0a0a] border-[#2a2a2a] text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="register-phone" className="text-white">Telefone</Label>
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="(87) 9 8100-9469"
                    className="bg-[#0a0a0a] border-[#2a2a2a] text-white mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="register-cpf" className="text-white">CPF/CNPJ</Label>
                  <Input
                    id="register-cpf"
                    type="text"
                    placeholder="Coloque seu CPF/CNPJ"
                    className="bg-[#0a0a0a] border-[#2a2a2a] text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="register-birth" className="text-white">Data de Nascimento</Label>
                  <Input
                    id="register-birth"
                    type="date"
                    placeholder="Coloque sua data de nascimento"
                    className="bg-[#0a0a0a] border-[#2a2a2a] text-white mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="register-password" className="text-white">Crie uma senha</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••••"
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white mt-2"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#28a745] hover:bg-[#218838] text-white py-6 text-lg"
              >
                Cadastrar
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
