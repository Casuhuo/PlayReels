import React, { useState } from 'react';
import { X, Crown, ArrowRight, Coins, ShieldCheck, Check } from 'lucide-react';
import { Episode, UserProfile } from '../types';

interface PaywallModalProps {
  episode: Episode;
  user: UserProfile;
  onClose: () => void;
  onUnlockWithCoins: (episode: Episode) => void;
  onGoToVipPlans: () => void;
  onGoToWallet: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  episode,
  user,
  onClose,
  onUnlockWithCoins,
  onGoToVipPlans,
  onGoToWallet
}) => {
  const [autoUnlockNext, setAutoUnlockNext] = useState(true);
  const coinCost = episode.coinPrice || 30;
  const hasEnoughCoins = user.coins >= coinCost;

  const handleCoinUnlock = () => {
    if (hasEnoughCoins) {
      onUnlockWithCoins(episode);
    } else {
      onGoToWallet();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end p-0 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-md mx-auto bg-[#18181c] border-t border-white/10 rounded-t-[2rem] p-5 pb-safe shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-300">
        {/* Header with Close */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Desbloqueio de Episódio
            </span>
          </div>
          <button
            id="paywall-close-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white active:scale-95 transition"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Episode Info Banner */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#232328] border border-white/5">
          <div className="relative w-16 aspect-video rounded-lg overflow-hidden bg-zinc-800 shrink-0">
            <img src={episode.thumbnail} alt={episode.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-amber-400 text-xs">🔒</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white truncate">{episode.title}</h4>
              <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold">
                {coinCost} Moedas
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 truncate mt-0.5">Duração: {episode.duration} • Qualidade 1080p</p>
          </div>
        </div>

        {/* User Coin Balance Card */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#202025] to-[#282830] border border-amber-400/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 text-sm">
              🪙
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Seu Saldo Atual</p>
              <p className="text-base font-extrabold text-white font-mono flex items-center gap-1">
                <span>{user.coins}</span>
                <span className="text-xs text-amber-300 font-sans font-medium">Moedas</span>
              </p>
            </div>
          </div>

          <button
            id="paywall-go-wallet-btn"
            onClick={onGoToWallet}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 underline py-1"
          >
            Ver Pacotes
          </button>
        </div>

        {/* Option 1: Unlock with Coins Button */}
        <div className="flex flex-col gap-2">
          <button
            id="paywall-unlock-coins-btn"
            onClick={handleCoinUnlock}
            className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg active:scale-[0.98] transition flex items-center justify-center gap-2 ${
              hasEnoughCoins
                ? 'bg-[#e50914] hover:bg-[#ff1e27] text-white shadow-[#e50914]/40'
                : 'bg-amber-500 hover:bg-amber-600 text-black shadow-amber-500/30'
            }`}
          >
            {hasEnoughCoins ? (
              <>
                <Coins className="w-4 h-4" />
                <span>Desbloquear com {coinCost} Moedas</span>
              </>
            ) : (
              <>
                <Coins className="w-4 h-4" />
                <span>Saldo insuficiente • Recarregar Moedas</span>
              </>
            )}
          </button>

          {/* Auto Unlock Checkbox */}
          <div className="flex items-center gap-2 px-1">
            <input
              id="auto-unlock"
              type="checkbox"
              checked={autoUnlockNext}
              onChange={(e) => setAutoUnlockNext(e.target.checked)}
              className="w-4 h-4 rounded accent-[#e50914] bg-[#232328] cursor-pointer"
            />
            <label htmlFor="auto-unlock" className="text-xs text-zinc-400 cursor-pointer">
              Desbloquear automaticamente os próximos episódios
            </label>
          </div>
        </div>

        {/* Option 2: Assinar VIP Premium (Better Value) */}
        <div
          onClick={onGoToVipPlans}
          className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 via-[#222228] to-amber-950/30 border border-amber-400/40 cursor-pointer hover:border-amber-400/70 transition group active:scale-[0.99]"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-black shadow-md">
                <Crown className="w-4 h-4" />
              </div>
              <span className="text-xs font-black tracking-wider uppercase text-amber-300">
                Passe VIP Ilimitado
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-black">
              ECONOMIZE 70%
            </span>
          </div>

          <p className="text-xs text-zinc-200 font-medium leading-relaxed">
            Assista a <strong>todos os episódios</strong> de todas as séries sem gastar moedas e sem anúncios.
          </p>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10 text-xs">
            <span className="font-extrabold text-amber-300 font-mono">A partir de 250 MT / semana</span>
            <span className="text-white font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition">
              <span>Assinar VIP</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500 pb-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Desbloqueio vitalício no seu perfil</span>
        </div>
      </div>
    </div>
  );
};
