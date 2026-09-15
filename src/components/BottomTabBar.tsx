import React from 'react';
import { Home, Film, Gift, Bookmark, User } from 'lucide-react';
import { MainTab } from '../types';

interface BottomTabBarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: MainTab; label: string; icon: React.ReactNode; isGift?: boolean; isVideo?: boolean }[] = [
    {
      id: 'inicio',
      label: 'Início',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'paravoce',
      label: 'Para Você',
      icon: <Film className="w-5 h-5" />,
      isVideo: true
    },
    {
      id: 'recompensas',
      label: 'Recompensas',
      icon: <Gift className="w-5 h-5" />,
      isGift: true
    },
    {
      id: 'minhalista',
      label: 'Minha Lista',
      icon: <Bookmark className="w-5 h-5" />
    },
    {
      id: 'perfil',
      label: 'Perfil',
      icon: <User className="w-5 h-5" />
    }
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0e0e11]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.6)] pb-safe"
      aria-label="Navegação Principal"
    >
      <div className="max-w-md mx-auto h-16 flex items-center justify-around px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] h-14 relative transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-[#e50914] font-semibold'
                  : tab.isGift
                  ? 'text-[#efc134] hover:text-[#ffd700]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="relative flex flex-col items-center justify-center">
                {tab.icon}
                {tab.isVideo && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
                )}
                {/* Active red indicator pip */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] shadow-[0_0_8px_#e50914] mt-1" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
