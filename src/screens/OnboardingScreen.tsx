import React, { useState } from 'react';
import { ArrowRight, Smartphone, Gift } from 'lucide-react';

interface OnboardingScreenProps {
  onSkip: () => void;
  onStart: () => void;
  onLogin: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onSkip, onStart, onLogin }) => {
  const slides = [
    {
      tag: 'Micro-Séries Instantâneas',
      title: 'Doramas em minutos',
      subtitle: 'Episódios verticais rápidos de 1 a 2 minutos cheios de suspense, romance e reviravoltas intensas.',
      cta: 'Começar a Assistir'
    },
    {
      tag: '100% Mobile First',
      title: 'Assiste onde e quando quiseres',
      subtitle: 'Histórias verticais imersivas feitas sob medida para o teu telemóvel, sem pausas nem enrolação.',
      cta: 'Continuar'
    },
    {
      tag: 'Recompensas Exclusivas',
      title: 'Ganha moedas todos os dias',
      subtitle: 'Desbloqueia episódios VIP com check-in diário, roleta da sorte e missões fáceis da comunidade.',
      cta: 'Criar Minha Conta'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onStart(); // Go to Cadastro
    }
  };

  return (
    <div className="min-h-screen bg-[#131316] text-white flex flex-col justify-between max-w-md mx-auto pt-safe pb-safe px-4 select-none">
      {/* Top Bar with Saltar button */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
          <span className="text-xs font-bold tracking-wider uppercase text-zinc-300 font-display">PlayReels</span>
        </div>
        <button
          id="onboarding-skip-btn"
          onClick={onSkip}
          className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-zinc-300 active:scale-95 transition"
        >
          Saltar
        </button>
      </div>

      {/* Cinematic Poster Hero in 9:13 aspect ratio */}
      <div className="relative w-full aspect-[9/12] rounded-2xl overflow-hidden bg-[#0a0a0c] shadow-2xl my-2 border border-white/10">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4ksjRvwWF9tVFlUA2nPqw44ZFK3YX8LPbcAOm3cI2NGl9hapcwMl0jRIFMO9QsTyqXs9zKRT5bgOHpoYpfvRvaJflfQh4cZjyiRFV6V0P7_IJQryjsGwhaTLnU7BU4WHhJFqVuR_aXzEDajDyTvZLxsaKJvil-kx4hQ5ALDS8XNdqwW-0h0FGFyhkuWdIa4EiKilpMGuhIg7obqpojqw54zswowTmwvIINkVPNIka1Sf-0YmCvpu1ow"
          alt="Dorama Hero"
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[#ff4d58] text-[11px] font-bold uppercase tracking-wider">
            Original
          </span>
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-bold flex items-center gap-1">
            ★ 4.9
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[11px] font-bold flex items-center gap-1">
            <span>🪙</span>
            <span>BÓNUS +50</span>
          </div>
        </div>

        {/* Floating Mini Player Widget at bottom of poster */}
        <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#e50914] flex items-center justify-center text-white shadow-lg shadow-[#e50914]/40 shrink-0">
            <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white truncate">O Preço da Vingança</h4>
            <p className="text-[10px] text-zinc-400 truncate">Episódio 1 • 98 segs</p>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
            Grátis
          </span>
        </div>
      </div>

      {/* Narrative & Step Carousel */}
      <div className="flex flex-col text-center pt-2">
        <div className="inline-flex items-center justify-center self-center px-3 py-0.5 rounded-full bg-[#e50914]/20 border border-[#e50914]/30 text-[#ff8087] text-[11px] font-bold uppercase mb-2">
          {slides[currentSlide].tag}
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight font-display mb-1.5">
          {slides[currentSlide].title}
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto mb-4">
          {slides[currentSlide].subtitle}
        </p>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 bg-[#e50914]' : 'w-2 bg-zinc-700'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Quick Feature Chips */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-left">
          <div
            onClick={() => setCurrentSlide(1)}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1b1b1e] border border-white/5 cursor-pointer hover:border-white/20 active:scale-95 transition"
          >
            <div className="w-7 h-7 rounded-lg bg-[#2a2a2d] flex items-center justify-center text-blue-400 shrink-0">
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">9:16 Vertical</p>
              <p className="text-[10px] text-zinc-400 truncate">Feito p/ telemóvel</p>
            </div>
          </div>
          <div
            onClick={() => setCurrentSlide(2)}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1b1b1e] border border-white/5 cursor-pointer hover:border-white/20 active:scale-95 transition"
          >
            <div className="w-7 h-7 rounded-lg bg-[#2a2a2d] flex items-center justify-center text-amber-400 shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Moedas Grátis</p>
              <p className="text-[10px] text-zinc-400 truncate">Missões diárias</p>
            </div>
          </div>
        </div>

        {/* Primary Action Button: Começar -> Cadastro */}
        <button
          id="onboarding-start-btn"
          onClick={handleNext}
          className="w-full h-12 rounded-xl bg-[#e50914] hover:bg-[#ff1e27] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(229,9,20,0.5)] active:scale-95 transition"
        >
          <span>{slides[currentSlide].cta}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secondary: Já tens conta? Entrar -> Login */}
        <div className="flex items-center justify-center gap-1.5 py-3 text-xs text-zinc-400">
          <span>Já tens uma conta?</span>
          <button
            id="onboarding-login-link"
            onClick={onLogin}
            className="text-[#ff4d58] font-bold hover:underline py-1"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};
