import React, { useState } from 'react';
import { Gift, CheckCircle, Crown, ArrowRight, Play, Share2 } from 'lucide-react';
import { UserProfile, CoinPackage } from '../types';
import { TopHeader } from '../components/TopHeader';
import { ToastType } from '../components/Toast';

interface RecompensasScreenProps {
  user: UserProfile;
  onClaimDailyCheckIn: () => void;
  onGoToParaVoce: () => void;
  onGoToVipPlans: () => void;
  onGoToCheckoutPackage: (pkg: CoinPackage) => void;
  onOpenSearch: () => void;
  onOpenWallet: () => void;
  onOpenProfile: () => void;
  onShowToast?: (message: string, options?: { type?: ToastType; description?: string }) => void;
}

export const RecompensasScreen: React.FC<RecompensasScreenProps> = ({
  user,
  onClaimDailyCheckIn,
  onGoToParaVoce,
  onGoToVipPlans,
  onGoToCheckoutPackage,
  onOpenSearch,
  onOpenWallet,
  onOpenProfile,
  onShowToast
}) => {
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<number | null>(null);

  const handleSpinWheel = () => {
    if (wheelSpinning) return;
    setWheelSpinning(true);
    setTimeout(() => {
      const prizes = [20, 30, 50, 100];
      const win = prizes[Math.floor(Math.random() * prizes.length)];
      setWheelSpinning(false);
      setWheelResult(win);
      if (onShowToast) {
        onShowToast('Bônus coletado!', {
          type: 'bonus',
          description: `Parabéns! Ganhaste ${win} moedas na Roleta da Sorte!`
        });
      }
    }, 1200);
  };

  const days = [
    { day: 1, coins: 10, checked: true },
    { day: 2, coins: 20, checked: true },
    { day: 3, coins: 30, checked: user.dailyCheckedIn },
    { day: 4, coins: 40, checked: false },
    { day: 5, coins: 50, checked: false },
    { day: 6, coins: 60, checked: false },
    { day: 7, coins: 100, checked: false, isBig: true }
  ];

  const flashPackage: CoinPackage = {
    id: 'pkg-flash-300',
    coins: 300,
    priceMT: 70,
    tag: 'Oferta Relâmpago',
    desc: 'Desconto especial disponível por tempo limitado!'
  };

  return (
    <div className="min-h-screen bg-[#131316] text-white flex flex-col pb-24 max-w-md mx-auto select-none">
      <TopHeader
        user={user}
        onOpenSearch={onOpenSearch}
        onOpenWallet={onOpenWallet}
        onOpenProfile={onOpenProfile}
      />

      <main className="flex-1 px-4 pt-16 space-y-4">
        {/* Header Title */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h1 className="text-xl font-extrabold text-white font-display">Central de Recompensas</h1>
            <p className="text-xs text-zinc-400">Ganhe moedas gratuitas para assistir doramas</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full text-amber-300 text-xs font-mono font-bold">
            <span>🪙 {user.coins}</span>
          </div>
        </div>

        {/* 7-Day Check-in Calendar */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#1f1f26] via-[#1a1a1e] to-[#252220] border border-amber-400/30 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                  Check-in Semanal
                </h3>
                <p className="text-[11px] text-zinc-400">Sequência: 3 dias consecutivos</p>
              </div>
            </div>

            <button
              id="recompensas-checkin-btn"
              disabled={user.dailyCheckedIn}
              onClick={onClaimDailyCheckIn}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase transition active:scale-95 shadow ${
                user.dailyCheckedIn
                  ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                  : 'bg-[#e50914] hover:bg-[#ff1e27] text-white shadow-[#e50914]/40'
              }`}
            >
              {user.dailyCheckedIn ? 'Resgatado' : 'Resgatar Hoje'}
            </button>
          </div>

          {/* 7 Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 pt-1">
            {days.map((d) => (
              <div
                key={d.day}
                className={`flex flex-col items-center justify-between p-1.5 py-2 rounded-xl border transition ${
                  d.checked
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                    : d.isBig
                    ? 'bg-[#282218] border-amber-400/50 text-amber-200'
                    : 'bg-[#151518] border-white/5 text-zinc-400'
                }`}
              >
                <span className="text-[9px] font-bold">D{d.day}</span>
                <span className="text-sm my-0.5">{d.checked ? '✓' : '🪙'}</span>
                <span className="text-[10px] font-black font-mono">+{d.coins}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lucky Spin Wheel Card */}
        <div className="p-4 rounded-3xl bg-[#1b1b1e] border border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              onClick={handleSpinWheel}
              className={`w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#e50914] to-amber-500 flex items-center justify-center text-white shadow-lg cursor-pointer active:scale-90 transition ${
                wheelSpinning ? 'animate-spin' : ''
              }`}
            >
              <span className="text-xl">🎰</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Roleta da Sorte Diária</h3>
              <p className="text-[11px] text-zinc-400">Gire para ganhar até 100 moedas grátis</p>
              {wheelResult && (
                <span className="text-[10px] text-emerald-400 font-bold">Último prêmio: +{wheelResult} moedas!</span>
              )}
            </div>
          </div>

          <button
            onClick={handleSpinWheel}
            disabled={wheelSpinning}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold active:scale-95 transition shrink-0"
          >
            {wheelSpinning ? 'Girando...' : 'Girar'}
          </button>
        </div>

        {/* Daily Missions: Tarefa -> Para Você */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-display">
            Missões Diárias
          </h3>

          <div className="space-y-2">
            {/* Mission 1: Watch episodes -> Para Você */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1b1b1e] border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Play className="w-4 h-4 fill-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-white">Assistir 3 episódios</p>
                    <span className="text-[10px] font-bold text-amber-300 font-mono">+30 🪙</span>
                  </div>
                  <p className="text-[10px] text-zinc-400">Progresso: 2/3 assistidos hoje</p>
                </div>
              </div>

              <button
                id="mission-watch-btn"
                onClick={onGoToParaVoce}
                className="px-3 py-1.5 rounded-full bg-[#e50914] text-white text-xs font-bold active:scale-95 transition shadow-sm"
              >
                Assistir
              </button>
            </div>

            {/* Mission 2: Share series */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1b1b1e] border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-white">Partilhar 1 Dorama</p>
                    <span className="text-[10px] font-bold text-amber-300 font-mono">+20 🪙</span>
                  </div>
                  <p className="text-[10px] text-zinc-400">Compartilhe no WhatsApp ou redes</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onShowToast) {
                    onShowToast('Bônus coletado!', {
                      type: 'bonus',
                      description: 'Link compartilhado! +20 Moedas adicionadas à sua carteira.'
                    });
                  }
                }}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold active:scale-95 transition"
              >
                Partilhar
              </button>
            </div>

            {/* Mission 3: Check complete */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1b1b1e] border border-white/5 opacity-70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-white line-through">Comentar em 1 episódio</p>
                    <span className="text-[10px] font-bold text-zinc-400 font-mono">+15 🪙</span>
                  </div>
                  <p className="text-[10px] text-emerald-400">Concluído hoje!</p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-full">
                Resgatado
              </span>
            </div>
          </div>
        </div>

        {/* Flash Sale Card -> Checkout */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-red-950/40 via-[#1f1f24] to-red-950/40 border border-[#e50914]/40 flex items-center justify-between">
          <div>
            <span className="px-2 py-0.5 rounded-full bg-[#e50914] text-white text-[9px] font-black uppercase tracking-wider">
              Oferta Relâmpago
            </span>
            <h4 className="text-xs font-bold text-white mt-1">Pacote 300 Moedas</h4>
            <p className="text-[11px] text-zinc-300">Apenas 70 MT (Economize 50%)</p>
          </div>

          <button
            id="recompensas-buy-flash-btn"
            onClick={() => onGoToCheckoutPackage(flashPackage)}
            className="px-4 py-2 rounded-xl bg-[#e50914] hover:bg-[#ff1e27] text-white text-xs font-bold active:scale-95 transition shadow-lg shadow-[#e50914]/30"
          >
            Comprar
          </button>
        </div>

        {/* Assinar VIP Banner -> Planos */}
        <div
          onClick={onGoToVipPlans}
          className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/20 via-[#252220] to-amber-950/30 border border-amber-400/40 flex items-center justify-between cursor-pointer hover:border-amber-400 transition group active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-black shadow-md">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Cansado de cumprir tarefas?</p>
              <p className="text-[11px] text-amber-300">Seja VIP e assista tudo liberado</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition" />
        </div>
      </main>
    </div>
  );
};
