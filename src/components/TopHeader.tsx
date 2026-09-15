import React from 'react';
import { Search } from 'lucide-react';
import { UserProfile } from '../types';

interface TopHeaderProps {
  user: UserProfile;
  onOpenSearch: () => void;
  onOpenWallet: () => void;
  onOpenProfile: () => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  user,
  onOpenSearch,
  onOpenWallet,
  onOpenProfile,
  title,
  showBack,
  onBack
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#131316]/90 backdrop-blur-xl border-b border-white/5 pt-safe">
      <div className="max-w-md mx-auto h-14 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              id="header-back-btn"
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/10 transition"
              aria-label="Voltar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-2" id="brand-header-logo">
              <div className="w-8 h-8 rounded-lg bg-[#e50914] flex items-center justify-center shadow-[0_0_12px_rgba(229,9,20,0.5)]">
                <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                Play<span className="text-[#e50914]">Reels</span>
              </span>
            </div>
          )}
          {title && <span className="text-sm font-semibold text-zinc-300 truncate max-w-[140px]">{title}</span>}
        </div>

        <div className="flex items-center gap-2">
          {/* Coin Balance Pill */}
          <button
            id="header-coin-pill"
            onClick={onOpenWallet}
            className="h-8 px-2.5 rounded-full bg-[#1f1f22] border border-amber-400/20 hover:border-amber-400/50 flex items-center gap-1.5 shadow-sm active:scale-95 transition"
            title="Ver Carteira de Moedas"
          >
            <span className="text-xs">🪙</span>
            <span className="text-xs font-bold text-amber-300 font-mono tracking-tight">{user.coins}</span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#e50914] text-[9px] font-bold text-white flex items-center justify-center ml-0.5">
              +
            </span>
          </button>

          {/* Search Icon */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Avatar Profile */}
          <button
            id="header-profile-btn"
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full overflow-hidden border border-white/20 active:scale-95 transition hover:border-[#e50914]"
            aria-label="Abrir Perfil"
          >
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
};
