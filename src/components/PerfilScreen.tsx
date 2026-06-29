import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Camera, 
  Upload, 
  Check, 
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { TeacherProfile } from '../types';

interface PerfilScreenProps {
  profile: TeacherProfile;
  onUpdateProfile: (updated: TeacherProfile) => void;
  onBack: () => void;
}

export default function PerfilScreen({ profile, onUpdateProfile, onBack }: PerfilScreenProps) {
  const [successToast, setSuccessToast] = useState(false);

  // Form states initialized with current profile
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-designed default face options for educational profiles
  // Helper to handle local files
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple verification
    if (!name.trim()) return;
    if (!email.trim() || !email.includes('@')) return;

    onUpdateProfile({
      ...profile,
      name: name.trim(),
      email: email.trim(),
      avatarUrl: avatarUrl
    });

    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      onBack();
    }, 1500);
  };

  return (
    <div className="pb-6 space-y-5 font-sans relative">
      
      {/* Toast Alert Feedback */}
      {successToast && (
        <div className="absolute top-4 left-5 right-5 z-50 bg-[#0066cc] text-white p-3.5 rounded-2xl shadow-lg border border-[#0066cc]/20 flex items-center gap-2.5 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div>
            <p className="text-xs font-bold leading-none">Perfil Atualizado!</p>
            <p className="text-[9px] text-white/80 mt-1 leading-none">As alterações foram aplicadas ao ecossistema acadêmico.</p>
          </div>
        </div>
      )}

      {/* Integrated Clean, Elevated Card Header Style */}
      <header className="bg-white border-b border-[#e2e8f0] pb-5 pt-4 px-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] relative select-none shrink-0 z-30">
        {/* Left accent line like in image_1.png profile card */}
        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#0066cc]"></div>
        
        {/* Decorative subtle pulse spot in top right */}
        <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#0066cc]/5 rounded-full blur-xl"></div>

        {/* Back button and Centered Title row */}
        <div className="flex items-center justify-between mb-3 relative">
          <button 
            onClick={onBack}
            className="p-1.5 -ml-1 text-[#0f172b] hover:bg-slate-50 active:scale-95 transition-all text-slate-700 flex items-center justify-center shrink-0 cursor-pointer"
            style={{ minWidth: '44px', minHeight: '44px' }}
            title="Voltar para início"
          >
            <ChevronLeft className="w-5.5 h-5.5 stroke-[2.5]" />
          </button>
          
          <h1 className="text-sm font-extrabold text-[#0f172b] tracking-tight absolute left-1/2 -translate-x-1/2 whitespace-nowrap select-none font-sans">
            Editar Meu Perfil
          </h1>
          
          <div className="w-9"></div> {/* Spacer balance */}
        </div>

        {/* Description Text block in matching dark blue/grey typography for perfect legibility */}
        <div className="pl-6.5 pr-2">
          <p className="text-[11px] text-[#5c6f84] font-medium leading-relaxed font-sans select-none">
            Atualize sua foto, nome e e-mail oficial
          </p>
        </div>
      </header>

      <form onSubmit={handleSave} className="px-5 space-y-5">
        <div className="bg-white border border-[#e2e8f0] rounded-3xl p-5 shadow-sm space-y-5">
          
          {/* Dynamic Photo/Avatar Editor Section */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Foto de Perfil</label>
            
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Main Avatar Circle Preview */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 rounded-2.5xl bg-slate-900 border-2 border-[#e2e8f0] flex items-center justify-center text-white overflow-hidden shadow-sm hover:border-[#0066cc] transition-all">
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0f172b] flex items-center justify-center font-bold text-lg text-white">
                      {name && name.length > 2 ? name.substring(0, 2).toUpperCase() : 'DOC'}
                    </div>
                  )}
                </div>
                
                <button 
                  type="button"
                  onClick={triggerFileSelect}
                  className="absolute -bottom-1.5 -right-1.5 p-2 bg-[#0066cc] text-white rounded-lg hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer border border-white"
                  title="Carregar arquivo"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  {/* Hidden Native File Input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  
                  <button
                    type="button"
                    onClick={triggerFileSelect}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-[#e2e8f0] text-xs font-bold text-slate-700 rounded-xl cursor-pointer active:scale-98 transition-all"
                  >
                    <Camera className="w-3.5 h-3.5 text-slate-400" />
                    Enviar Foto do Dispositivo
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal text-center sm:text-left">
                  Selecione uma foto sua nos formatos JPG ou PNG para atualizar sua imagem de docente.
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields: Name & Email */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Nome Oficial Completo</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold text-xs">
                  Nome
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Seu nome"
                  className="w-full pl-16 pr-4 py-3 bg-[#0f172b]/2 border border-[#e2e8f0] focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc]/20 rounded-xl text-xs font-bold text-slate-800 outline-none transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">E-mail Institucional</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="exemplo@sysclass.edu.br"
                  className="w-full pl-10 pr-4 py-3 bg-[#0f172b]/2 border border-[#e2e8f0] focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc]/20 rounded-xl text-xs font-bold text-slate-800 outline-none transition-all placeholder:text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Form Submit/Controls */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onBack}
              className="w-full py-3 bg-slate-50 hover:bg-slate-100 border border-[#e2e8f0] rounded-xl text-xs font-bold text-slate-500 active:scale-95 cursor-pointer transition-all text-center"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="w-full py-3 bg-[#0066cc] hover:bg-[#0055b3] text-white rounded-xl text-xs font-bold active:scale-95 cursor-pointer transition-all shadow-xs text-center flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              Salvar Dados
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
