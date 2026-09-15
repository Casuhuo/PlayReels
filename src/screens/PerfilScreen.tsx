import React, { useState } from 'react';
import { Crown, Settings, Wallet, ChevronRight, Edit3, Film, LogOut, Check, X } from 'lucide-react';
import { UserProfile } from '../types';

interface PerfilScreenProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onGoToWallet: () => void;
  onGoToVipPlans: () => void;
  onGoToSettings: () => void;
  onLogout: () => void;
}

export const PerfilScreen: React.FC<PerfilScreenProps> = ({
  user,
  onUpdateUser,
  onGoToWallet,
  onGoToVipPlans,
  onGoToSettings,
  onLogout
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: editName,
      email: editEmail
    });
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-[#131316] text-white flex flex-col pb-24 max-w-md mx-auto select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#131316]/90 backdrop-blur-xl border-b border-white/5 pt-safe">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold text-white font-display">Meu Perfil</span>
          </div>
          <button
            id="perfil-settings-btn"
            onClick={onGoToSettings}
            className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/10 transition"
            aria-label="Definições"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-3 space-y-4">
        {/* User Card with Avatar */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1f1f26] via-[#1a1a1e] to-[#25252c] border border-white/10 p-5 shadow-xl">
          <div className="flex items-center gap-4">
            {/* Avatar -> Editar */}
            <div
              id="perfil-avatar-btn"
              onClick={() => setShowEditModal(true)}
              className="relative w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-[#e50914] via-amber-400 to-[#e50914] shadow-lg cursor-pointer group shrink-0"
              title="Clique para editar avatar"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full rounded-full object-cover group-hover:opacity-80 transition"
              />
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Edit3 className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#e50914] flex items-center justify-center text-white border-2 border-[#131316]">
                <Edit3 className="w-3 h-3" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-lg font-extrabold text-white truncate font-display">{user.name}</h2>
                {user.isVip && (
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[10px] font-black uppercase tracking-wider shadow flex items-center gap-0.5">
                    <Crown className="w-3 h-3" />
                    <span>VIP</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 truncate mt-0.5">{user.email}</p>
              <p className="text-[11px] text-amber-300/90 font-medium mt-1">
                {user.isVip ? `VIP ativo até ${user.vipExpiry}` : 'Membro Básico'}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10 text-center">
            <div className="p-2 rounded-xl bg-black/30">
              <span className="block text-base font-extrabold text-white font-mono">{user.coins}</span>
              <span className="text-[10px] text-zinc-400 uppercase font-bold">Moedas</span>
            </div>
            <div className="p-2 rounded-xl bg-black/30">
              <span className="block text-base font-extrabold text-white font-mono">{user.savedDramaIds.length}</span>
              <span className="text-[10px] text-zinc-400 uppercase font-bold">Salvos</span>
            </div>
            <div className="p-2 rounded-xl bg-black/30">
              <span className="block text-base font-extrabold text-amber-400 font-mono">42</span>
              <span className="text-[10px] text-zinc-400 uppercase font-bold">Assistidos</span>
            </div>
          </div>
        </div>

        {/* Quick Action Tiles: Moedas -> Carteira | Assinatura -> Planos */}
        <div className="grid grid-cols-2 gap-3">
          {/* Tile 1: Carteira */}
          <div
            id="perfil-tile-wallet"
            onClick={onGoToWallet}
            className="p-3.5 rounded-2xl bg-[#1b1b1e] border border-amber-400/20 hover:border-amber-400/50 cursor-pointer transition active:scale-[0.98] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-zinc-400">Recarregar</span>
            </div>
            <div className="mt-3">
              <p className="text-xs text-zinc-400 font-medium">Minha Carteira</p>
              <p className="text-base font-extrabold text-white font-mono">{user.coins} 🪙</p>
            </div>
          </div>

          {/* Tile 2: Assinatura VIP */}
          <div
            id="perfil-tile-vip"
            onClick={onGoToVipPlans}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-[#1b1b1e] to-amber-950/20 border border-amber-400/30 hover:border-amber-400/60 cursor-pointer transition active:scale-[0.98] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400">
                <Crown className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-amber-400 font-bold uppercase">Gerenciar</span>
            </div>
            <div className="mt-3">
              <p className="text-xs text-zinc-300 font-medium">Plano VIP</p>
              <p className="text-base font-extrabold text-amber-300 font-display">Sem limites</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="rounded-2xl bg-[#1b1b1e] border border-white/5 divide-y divide-white/5 overflow-hidden">
          <button
            onClick={onGoToWallet}
            className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2a2a2d] flex items-center justify-center text-amber-400">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Pacotes de Moedas</span>
                <span className="text-[10px] text-zinc-400">Compre moedas com M-Pesa ou e-Mola</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </button>

          <button
            onClick={onGoToVipPlans}
            className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2a2a2d] flex items-center justify-center text-amber-400">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Subscrição VIP</span>
                <span className="text-[10px] text-zinc-400">Acesso ilimitado sem anúncios</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </button>

          <button
            onClick={onGoToSettings}
            className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#2a2a2d] flex items-center justify-center text-zinc-400">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Definições da Aplicação</span>
                <span className="text-[10px] text-zinc-400">Qualidade de vídeo, idioma e downloads</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Logout Button -> Login */}
        <button
          id="perfil-logout-btn"
          onClick={onLogout}
          className="w-full py-3.5 rounded-2xl bg-[#1b1b1e] border border-red-500/20 text-red-400 hover:bg-red-500/10 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Terminar Sessão</span>
        </button>
      </main>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#1b1b1e] border border-white/10 rounded-3xl p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">Editar Perfil</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 pt-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold uppercase text-zinc-400" htmlFor="edit-name">
                  Nome
                </label>
                <input
                  id="edit-name"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#2a2a2d] px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e50914]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold uppercase text-zinc-400" htmlFor="edit-email">
                  Email
                </label>
                <input
                  id="edit-email"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-[#2a2a2d] px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#e50914]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#e50914] text-white font-bold text-xs active:scale-95 transition mt-2 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Salvar Alterações</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
