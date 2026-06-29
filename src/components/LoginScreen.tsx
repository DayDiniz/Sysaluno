import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Fingerprint, Sparkles, AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string) => void;
  defaultEmail?: string;
  onTriggerSplash?: () => void;
}

export default function LoginScreen({ onLogin, defaultEmail = 'contato@lyfiti.com.br', onTriggerSplash }: LoginScreenProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Biometric login simulator states
  const [isScanningBiometrics, setIsScanningBiometrics] = useState(false);
  const [biometricFeedback, setBiometricFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Por favor, informe seu e-mail institucional.');
      return;
    }

    if (!password) {
      setError('Por favor, insira sua senha de acesso.');
      return;
    }

    setIsLoading(true);

    // Simulate database lookup and login completion
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onLogin(email);
      }, 1000);
    }, 1200);
  };

  const handleBiometricAuth = () => {
    setError(null);
    setIsScanningBiometrics(true);
    setBiometricFeedback('Iniciando sensor biométrico...');

    setTimeout(() => {
      setBiometricFeedback('Aguardando reconhecimento facial...');
    }, 1000);

    setTimeout(() => {
      setBiometricFeedback('Processando credenciais...');
    }, 2000);

    setTimeout(() => {
      setIsScanningBiometrics(false);
      setBiometricFeedback(null);
      setSuccess(true);
      setTimeout(() => {
        onLogin(email);
      }, 800);
    }, 3000);
  };

  return (
    <div className="flex-grow flex flex-col justify-between bg-gradient-to-b from-[#0066cc]/8 via-white to-[#f8fafc] text-[#0f172b] p-6 relative select-none">
      
      {/* Decorative Brand Circles in Design System Colors */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#0066cc]/4 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-0 w-36 h-36 bg-[#e17100]/4 rounded-full blur-2xl -z-10" />

      {/* Main Box - Logo + Form Container grouped closely */}
      <div className="flex-grow flex flex-col justify-center items-center max-w-sm w-full mx-auto space-y-6">
        {/* SysClass Branding Logotype matching the image */}
        <div className="text-center pt-2">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center select-none font-sans">
              <span className="text-[34px] font-black text-[#0f172b] tracking-tighter uppercase leading-none">
                Sys<span className="text-[#0066cc]">Class</span>
              </span>
            </div>
            <p className="text-[10px] text-[#5c6f84] font-bold font-sans mt-2 tracking-wide uppercase">
              Plataforma de Gestão Acadêmica Unificada
            </p>
            {onTriggerSplash && (
              <button
                type="button"
                onClick={onTriggerSplash}
                className="mt-3.5 flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0066cc]/10 hover:bg-[#0066cc]/15 active:scale-95 text-[#0066cc] rounded-full text-[10.5px] font-extrabold tracking-wide transition-all cursor-pointer border border-[#0066cc]/15 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
                Ver Animação de Entrada 🎓
              </button>
            )}
          </div>
        </div>

        <div className="w-full">
          {success ? (
            <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-2xs text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 bg-[#0066cc]/10 border border-[#0066cc]/20 rounded-full flex items-center justify-center mx-auto text-[#0066cc]">
                <div className="w-10 h-10 rounded-full bg-[#0066cc] text-white flex items-center justify-center shadow-xs animate-bounce">
                  ✓
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-[#0f172b]">
                  Autenticação Concluída
                </h3>
                <p className="text-[10.5px] text-[#0066cc] font-bold">
                  Redirecionando para as salas de aula...
                </p>
              </div>
              <div className="w-24 h-1 bg-[#e2e8f0] rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-[#0066cc] rounded-full animate-pulse w-full"></div>
              </div>
            </div>
          ) : isScanningBiometrics ? (
            <div className="bg-white border border-[#e2e8f0] rounded-3xl p-6 shadow-2xs text-center space-y-5">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-[#e2e8f0] border-t-[#0066cc] animate-spin"></div>
                <div className="absolute inset-2 rounded-full bg-[#f8fafc] flex items-center justify-center">
                  <Fingerprint className="w-10 h-10 text-[#0066cc] animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <span className="text-[9px] font-extrabold text-[#e17100] uppercase tracking-wider block bg-[#e17100]/5 px-2.5 py-1 rounded-full w-max mx-auto border border-[#e17100]/15">
                  Segurança Biométrica Ativa
                </span>
                <p className="text-[11px] font-bold text-[#0f172b] font-sans">
                  {biometricFeedback || 'Analisando...'}
                </p>
                <p className="text-[9px] text-slate-400 font-medium font-sans">
                  Utilizando hardware de câmera/biometria SysClass
                </p>
              </div>

              <button
                onClick={() => {
                  setIsScanningBiometrics(false);
                  setBiometricFeedback(null);
                }}
                className="text-[10px] text-slate-400 hover:text-slate-600 font-bold underline cursor-pointer"
              >
                Cancelar e usar senha
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-[#e2e8f0] rounded-3xl p-5 shadow-3xs space-y-4">
              
              {/* Error Message banner (critico e7000b) */}
              {error && (
                <div className="bg-[#e7000b]/5 border border-[#e7000b]/15 p-3 rounded-2xl flex items-start gap-2 text-left">
                  <AlertCircle className="w-3.5 h-3.5 text-[#e7000b] shrink-0 mt-0.5" />
                  <p className="text-[9.5px] text-[#e7000b] font-bold leading-normal font-sans">
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {/* Field: Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wide text-[#64748b] font-sans block">
                    E-mail Institucional
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-[#0f172b] placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#0066cc]/40 focus:bg-white transition-all font-sans"
                      placeholder="exemplo@sysclass.edu.br"
                    />
                  </div>
                </div>

                {/* Field: Senha */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-extrabold uppercase tracking-wide text-[#64748b] font-sans">
                      Senha de Acesso
                    </label>
                    <a href="#reset" onClick={(e) => { e.preventDefault(); setError('Para redefinir sua senha corporativa, entre em contato com a Secretaria Acadêmica.'); }} className="text-[9px] text-[#0066cc] hover:underline font-bold font-sans">
                      Esqueceu?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl pl-10 pr-10 py-2.5 text-xs font-bold text-[#0f172b] focus:outline-none focus:border-[#0066cc]/40 focus:bg-white transition-all font-sans"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center text-[10px] font-semibold text-slate-500 font-sans px-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="rounded border-[#e2e8f0] text-[#0066cc] focus:ring-[#0066cc] w-3.5 h-3.5 cursor-pointer"
                  />
                  Lembrar neste dispositivo
                </label>
              </div>

              {/* Access Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0066cc] text-white py-3 rounded-2xl text-xs font-bold shadow-xs hover:bg-[#0055b3] hover:shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                  id="btn_submit_login"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                      <span>Autenticando...</span>
                    </>
                  ) : (
                    <span>Acessar Painel Docente</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* Corporate Institutional footer */}
      <div className="text-center pt-2 pb-4 shrink-0 border-t border-[#e2e8f0]/50">
        <p className="text-[8.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          © {new Date().getFullYear()} SysClass Educacional S.A.
        </p>
        <p className="text-[8px] text-slate-400 font-medium font-sans mt-0.5">
          Atendimento Nacional • Segurança das Informações ISO 27001
        </p>
      </div>

    </div>
  );
}
