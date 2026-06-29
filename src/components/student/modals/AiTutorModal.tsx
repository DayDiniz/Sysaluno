import React, { useState } from 'react';
import { Sparkles, Send, X, BookOpen, Bot, User, ArrowRight } from 'lucide-react';
import { AiChatMessage } from '../../../types';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  courseName
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: '1',
      sender: 'tutor',
      text: `Olá! Sou seu Tutor Inteligente SysClass treinado com a bibliografia e slides de ${courseName}. Como posso te ajudar hoje?`,
      timestamp: 'Agora'
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "Resumir última aula de Banco de Dados",
    "Explicar formas normais com exemplos simples",
    "Fazer 3 questões de revisão para a prova"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isThinking) return;

    const studentMsg: AiChatMessage = {
      id: Date.now().toString(),
      sender: 'student',
      text: query,
      timestamp: 'Agora'
    };

    setMessages(prev => [...prev, studentMsg]);
    if (!textToSend) setInput('');
    setIsThinking(true);

    setTimeout(() => {
      let responseText = "Com base nos slides da Aula 04 disponibilizados pelo Prof. Ricardo:\n\nAs Três Formas Normais (1FN, 2FN, 3FN) servem para eliminar redundâncias em tabelas relacionais.\n\n• **1FN**: Garante que os atributos sejam atômicos (sem listas em uma única célula).\n• **2FN**: Está na 1FN e todos os atributos não chave dependem totalmente da chave primária.\n• **3FN**: Está na 2FN e não possui dependências transitivas.";
      let citation = "Slide 12 • Capítulo 4 (Silberschatz)";

      if (query.toLowerCase().includes("quest")) {
        responseText = "Ótimo! Aqui estão 3 questões rápidas:\n1. Qual a principal diferença entre chave primária e estrangeira?\n2. O que acontece em uma anomalia de inserção?\n3. Defina ACID em transações de BD.";
        citation = "Banco de Questões da Disciplina";
      } else if (query.toLowerCase().includes("resum")) {
        responseText = "O resumo da aula anterior focou em **Modelagem Entidade-Relacionamento (MER)**, cardinalidades (1:1, 1:N, N:M) e mapeamento lógico.";
        citation = "Gravação de Aula • 24/06";
      }

      const tutorMsg: AiChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'tutor',
        text: responseText,
        timestamp: 'Agora',
        citation
      };

      setMessages(prev => [...prev, tutorMsg]);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-[90vh] max-h-[640px] bg-white rounded-3xl flex flex-col shadow-2xl border border-[#e2e8f0] overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-4 bg-[#0f172b] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-[#e17100] flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold tracking-tight">Tutor Inteligente IA</h3>
                <span className="px-1.5 py-0.2 rounded-full bg-[#009966] text-white text-3xs font-bold">PRO</span>
              </div>
              <p className="text-2xs text-slate-300 font-medium">Baseado no plano de ensino e materiais do curso</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
          {messages.map((msg) => {
            const isTutor = msg.sender === 'tutor';
            return (
              <div key={msg.id} className={`flex gap-3 ${isTutor ? 'justify-start' : 'justify-end'}`}>
                {isTutor && (
                  <div className="w-8 h-8 rounded-full bg-[#0f172b] text-amber-400 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  isTutor 
                    ? 'bg-white border border-[#e2e8f0] text-[#0f172b] shadow-2xs rounded-tl-none' 
                    : 'bg-[#009966] text-white font-medium rounded-tr-none shadow-sm'
                }`}>
                  <div className="whitespace-pre-line">{msg.text}</div>
                  {msg.citation && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1 text-3xs font-mono text-[#009966] font-bold">
                      <BookOpen className="w-3 h-3 shrink-0" />
                      <span>Fonte: {msg.citation}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex gap-3 items-center text-xs text-slate-400 font-medium italic">
              <div className="w-8 h-8 rounded-full bg-[#0f172b] text-amber-400 flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <span>Analisando materiais didáticos...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <div className="px-4 py-2 bg-white border-t border-[#e2e8f0] flex gap-2 overflow-x-auto no-scrollbar shrink-0">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0f172b] text-2xs font-semibold transition-colors flex items-center gap-1"
              >
                <span>{qp}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="p-3 bg-white border-t border-[#e2e8f0] shrink-0">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre a matéria ou provas..."
              className="flex-1 bg-slate-100 border border-transparent focus:border-[#009966] focus:bg-white rounded-2xl px-4 py-2.5 text-xs text-[#0f172b] outline-none transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking}
              className="w-10 h-10 rounded-2xl bg-[#009966] hover:bg-[#008055] disabled:opacity-40 text-white flex items-center justify-center shadow-md shadow-[#009966]/20 transition-all active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
