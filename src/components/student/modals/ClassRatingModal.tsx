import React, { useState } from 'react';
import { StudentClassItem } from '../../../types';
import { Star, X, CheckCircle2 } from 'lucide-react';

interface ClassRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: StudentClassItem | null;
  onSubmitRating: (classId: string, rating: number, comment: string) => void;
}

export const ClassRatingModal: React.FC<ClassRatingModalProps> = ({
  isOpen,
  onClose,
  classItem,
  onSubmitRating
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !classItem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmitRating(classItem.id, selectedRating, comment);
      setSubmitted(false);
      setComment('');
      onClose();
    }, 1200);
  };

  const ratingLabels = ['Insatisfatória', 'Regular', 'Boa', 'Muito boa', 'Excelente!'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#e2e8f0] relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100">
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-3xs font-bold uppercase tracking-wider mb-2">
              Termômetro Pedagógico
            </span>
            <h3 className="text-lg font-bold text-[#0f172b]">
              Avaliar aula de hoje
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {classItem.discipline} • Prof. {classItem.professor}
            </p>

            {/* Star Selector */}
            <div className="my-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= (hoverRating || selectedRating);
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setSelectedRating(star)}
                      className="p-1 transition-transform active:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-9 h-9 transition-colors ${
                          isFilled
                            ? 'fill-amber-400 text-amber-500 drop-shadow-sm'
                            : 'text-slate-200 fill-slate-100'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-bold text-amber-600">
                {ratingLabels[(hoverRating || selectedRating) - 1]}
              </span>
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comentário opcional (didática, ritmo, clareza da lousa...)"
              rows={3}
              className="w-full p-3 rounded-2xl bg-slate-100 border border-transparent focus:border-amber-400 focus:bg-white text-xs text-[#0f172b] outline-none transition-all placeholder:text-slate-400 resize-none mb-4"
            />

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-[#e17100] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-amber-500/20 active:scale-98 transition-all"
            >
              Enviar feedback confidencial
            </button>
          </form>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center text-center animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center mb-3 shadow-lg shadow-amber-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-base font-bold text-[#0f172b]">Obrigado por avaliar!</h4>
            <p className="text-xs text-slate-500 mt-1">Seu feedback ajuda a coordenação a aperfeiçoar a qualidade contínua das aulas.</p>
          </div>
        )}
      </div>
    </div>
  );
};
