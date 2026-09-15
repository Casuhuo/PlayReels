import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  isLoggedIn: boolean;
  onFinish: (dest: 'inicio' | 'onboarding') => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ isLoggedIn, onFinish }) => {
  const [progress, setProgress] = useState(15);
  const [status, setStatus] = useState('Sincronizando episódios inéditos...');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setProgress(45);
      setStatus('Otimizando player 9:16...');
    }, 400);

    const t2 = setTimeout(() => {
      setProgress(80);
      setStatus('Preparando seus doramas favoritos...');
    }, 900);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStatus('Tudo pronto!');
    }, 1400);

    const t4 = setTimeout(() => {
      onFinish(isLoggedIn ? 'inicio' : 'onboarding');
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isLoggedIn, onFinish]);

  return (
    <div
      id="splash-screen"
      onClick={() => onFinish(isLoggedIn ? 'inicio' : 'onboarding')}
      className="fixed inset-0 z-50 bg-[#0a0a0c] text-white flex flex-col justify-between items-center px-6 py-12 cursor-pointer select-none"
    >
      {/* Ambient Red Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-80 h-80 rounded-full bg-[#e50914]/20 blur-[100px] animate-pulse" />
      </div>

      {/* Top Status Tag */}
      <div className="w-full max-w-xs flex justify-between items-center opacity-80 pt-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
          <span className="text-[10px] tracking-wider uppercase font-semibold text-zinc-300">STREAMING 9:16</span>
        </div>
        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
          <span>★</span>
          <span>ORIGINAIS</span>
        </div>
      </div>

      {/* Center Icon & Branding */}
      <div className="flex flex-col items-center justify-center my-auto w-full max-w-xs text-center">
        <div className="relative mb-6 group">
          <div className="absolute -inset-3 bg-gradient-to-tr from-[#e50914] to-amber-500 rounded-[2.5rem] opacity-30 blur-xl" />
          <div className="relative w-28 h-28 rounded-[2rem] bg-[#16161c] border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden p-2">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#e50914] to-[#99000a] flex items-center justify-center shadow-inner shadow-black/50">
              <svg className="w-10 h-10 ml-1 fill-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center tracking-tight mb-1">
          <span className="text-3xl font-extrabold text-white font-display">Play</span>
          <span className="text-3xl font-extrabold text-[#e50914] font-display drop-shadow-[0_0_12px_#e50914]">
            Reels
          </span>
        </div>

        <p className="text-[11px] text-zinc-400 tracking-[0.25em] uppercase font-bold mt-1 mb-5">
          Doramas & Micro-Séries
        </p>

        <div className="flex flex-wrap items-center justify-center gap-1.5 opacity-90">
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 text-[10px] font-medium">Vingança</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#e50914]/20 border border-[#e50914]/30 text-[#ff8087] text-[10px] font-semibold">
            Bilionários
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 text-[10px] font-medium">
            Romance Proibido
          </span>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full max-w-xs flex flex-col items-center pb-4">
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-2 relative">
          <div
            className="h-full bg-gradient-to-r from-[#e50914] via-red-500 to-amber-400 transition-all duration-300 ease-out shadow-[0_0_10px_#e50914]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full flex justify-between items-center text-xs text-zinc-400">
          <span className="animate-pulse">{status}</span>
          <span className="font-mono text-[10px]">v2.4.0</span>
        </div>

        <p className="text-[11px] text-zinc-500 mt-4 flex items-center gap-1">
          <span>🔒 Transmissão Segura • HDR Vertical</span>
        </p>
      </div>
    </div>
  );
};
