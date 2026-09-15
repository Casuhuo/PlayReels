import React, { useState } from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, Check, History, Crown, ArrowRight } from 'lucide-react';
import { CoinPackage, Transaction, UserProfile } from '../types';

interface CarteiraScreenProps {
  user: UserProfile;
  packages: CoinPackage[];
  transactions: Transaction[];
  onBack: () => void;
  onSelectPackageToCheckout: (pkg: CoinPackage) => void;
  onGoToVipPlans: () => void;
}

export const CarteiraScreen: React.FC<CarteiraScreenProps> = ({
  user,
  packages,
  transactions,
  onBack,
  onSelectPackageToCheckout,
  onGoToVipPlans
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState(packages[1]?.id || packages[0].id);

  const selectedPackage = packages.find(p => p.id === selectedPkgId) || packages[0];

  return (
    <div className="min-h-screen bg-[#131316] text-white flex flex-col pb-24 max-w-md mx-auto select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#131316]/90 backdrop-blur-xl border-b border-white/5 pt-safe">
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/10 transition"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold text-zinc-300 font-display">Minha Carteira</span>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-3 space-y-4">
        {/* User Balance Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#202025] via-[#1a1a1e] to-[#25252c] border border-amber-400/30 p-5 shadow-2xl">
          {/* Background Glow */}
          <div className="absolute -right-10 -top-10 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-zinc-400">
              Saldo de Moedas
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>Validade Vitalícia</span>
            </span>
          </div>

          <div className="flex items-baseline gap-2 my-2">
            <span className="text-3xl">🪙</span>
            <span className="text-4xl font-extrabold text-white font-mono tracking-tight">{user.coins}</span>
            <span className="text-sm font-medium text-zinc-400">Moedas</span>
          </div>

          <p className="text-xs text-zinc-400 mt-2">
            Cada episódio bloqueado custa em média <strong className="text-zinc-200">30 moedas</strong>.
          </p>
        </div>

        {/* VIP Upsell Banner */}
        <div
          onClick={onGoToVipPlans}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-[#222228] to-amber-950/20 border border-amber-400/30 flex items-center justify-between cursor-pointer hover:border-amber-400/60 transition group active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-black shadow">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Prefere não se preocupar com moedas?</p>
              <p className="text-[11px] text-amber-300">Passe VIP Ilimitado a partir de 250 MT</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition" />
        </div>

        {/* Coin Packages Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white font-display">Pacotes de Moedas</h3>
            <span className="text-[11px] text-zinc-400">Moçambique (MT)</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {packages.map((pkg) => {
              const isSelected = selectedPkgId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPkgId(pkg.id)}
                  className={`relative p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#222228] border-[#e50914] shadow-[0_0_16px_rgba(229,9,20,0.3)]'
                      : 'bg-[#1b1b1e] border-white/5 hover:border-white/20'
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <span
                      className={`absolute -top-2.5 left-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        pkg.isPopular
                          ? 'bg-[#e50914] text-white shadow'
                          : 'bg-amber-400 text-black shadow'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xl">🪙</span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#e50914] text-white flex items-center justify-center text-[10px]">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>

                    <p className="text-lg font-extrabold text-white font-mono mt-1">
                      {pkg.coins} <span className="text-xs font-sans font-normal text-zinc-400">Moedas</span>
                    </p>

                    {pkg.bonusText && (
                      <span className="inline-block mt-0.5 text-[10px] font-bold text-amber-300">
                        {pkg.bonusText}
                      </span>
                    )}

                    <p className="text-[10px] text-zinc-400 mt-1 leading-tight">{pkg.desc}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 flex items-baseline justify-between">
                    <span className="text-xs text-zinc-400 font-medium">Preço</span>
                    <span className="text-sm font-extrabold text-white font-mono">{pkg.priceMT} MT</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Package Action Button -> Checkout */}
        <button
          id="btn-buy-coins-checkout"
          onClick={() => onSelectPackageToCheckout(selectedPackage)}
          className="w-full py-4 rounded-2xl bg-[#e50914] hover:bg-[#ff1e27] text-white font-bold text-sm tracking-wide shadow-[0_8px_24px_rgba(229,9,20,0.5)] active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <span>Recarregar {selectedPackage.coins} Moedas • {selectedPackage.priceMT} MT</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Payment Methods Supported */}
        <div className="flex items-center justify-center gap-3 py-1 text-zinc-400 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-[#1b1b1e] border border-white/5 font-semibold text-emerald-400">
            M-Pesa
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#1b1b1e] border border-white/5 font-semibold text-orange-400">
            e-Mola
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#1b1b1e] border border-white/5 font-semibold text-blue-400">
            Cartão Bancário
          </span>
        </div>

        {/* Recent Transactions History */}
        <section className="pt-2">
          <div className="flex items-center gap-2 mb-2.5">
            <History className="w-4 h-4 text-zinc-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display">
              Histórico de Moedas
            </h3>
          </div>

          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#1b1b1e] border border-white/5"
              >
                <div>
                  <p className="text-xs font-semibold text-white truncate max-w-[220px]">{tx.title}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{tx.date}</p>
                </div>
                <span
                  className={`text-xs font-extrabold font-mono ${
                    tx.type === 'credit' ? 'text-emerald-400' : 'text-zinc-400'
                  }`}
                >
                  {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500 py-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Pagamento protegido e ativação instantânea</span>
        </div>
      </main>
    </div>
  );
};
