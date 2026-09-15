import React, { useState } from 'react';
import { ArrowLeft, Crown, Check, Sparkles, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';
import { VipPlan } from '../types';

interface PlanosScreenProps {
  plans: VipPlan[];
  onBack: () => void;
  onSelectPlanToCheckout: (plan: VipPlan) => void;
}

export const PlanosScreen: React.FC<PlanosScreenProps> = ({
  plans,
  onBack,
  onSelectPlanToCheckout
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState(plans[1]?.id || plans[0].id);
  const [showFaq, setShowFaq] = useState(false);

  const selectedPlan = plans.find(p => p.id === selectedPlanId) || plans[0];

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
          <span className="text-sm font-semibold text-zinc-300 font-display">Planos VIP</span>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 px-4 py-3 space-y-4">
        {/* VIP Hero Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/20 via-[#1f1f26] to-[#16161c] border border-amber-400/40 p-5 text-center shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-black shadow-lg shadow-amber-400/30 mb-3">
              <Crown className="w-7 h-7" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Experiência Premium Sem Limites</span>
            </span>

            <h1 className="text-2xl font-extrabold text-white tracking-tight font-display">
              Passe VIP PlayReels
            </h1>
            <p className="text-xs text-zinc-300 mt-1 max-w-xs leading-relaxed">
              Desbloqueie todo o catálogo de micro-séries sem precisar de moedas e sem qualquer interrupção.
            </p>
          </div>
        </div>

        {/* Plan Selection Cards */}
        <div className="space-y-3">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer active:scale-[0.99] ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#262220] to-[#201d1c] border-amber-400 shadow-[0_0_20px_rgba(239,193,52,0.25)] ring-1 ring-amber-400'
                    : 'bg-[#1b1b1e] border-white/5 hover:border-white/20'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[9px] font-black uppercase tracking-wider shadow">
                    {plan.badge}
                  </span>
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition ${
                          isSelected
                            ? 'border-amber-400 bg-amber-400 text-black'
                            : 'border-zinc-500 bg-transparent'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <h3 className="text-sm font-bold text-white font-display">{plan.title}</h3>
                    </div>
                    {plan.weeklyEquiv && (
                      <p className="text-[11px] text-amber-300 font-medium ml-6 mt-0.5">
                        Equivalente a {plan.weeklyEquiv}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-extrabold text-white font-mono leading-none">
                      {plan.priceMT} MT
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{plan.frequencyText}</p>
                  </div>
                </div>

                {/* Features preview for selected */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5">
                    {plan.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Subscribe CTA Button -> Checkout */}
        <button
          id="btn-subscribe-vip-checkout"
          onClick={() => onSelectPlanToCheckout(selectedPlan)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm tracking-wide shadow-[0_8px_24px_rgba(239,193,52,0.4)] active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <Crown className="w-4 h-4" />
          <span>Assinar {selectedPlan.title} • {selectedPlan.priceMT} MT</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <div className="p-3 rounded-xl bg-[#1b1b1e] border border-white/5 text-center">
            <span className="text-lg">🚫</span>
            <p className="text-xs font-bold text-white mt-1">Zero Anúncios</p>
            <p className="text-[10px] text-zinc-400">Assista sem nenhuma pausa</p>
          </div>
          <div className="p-3 rounded-xl bg-[#1b1b1e] border border-white/5 text-center">
            <span className="text-lg">⚡</span>
            <p className="text-xs font-bold text-white mt-1">Lançamentos</p>
            <p className="text-[10px] text-zinc-400">Episódios inéditos antes</p>
          </div>
        </div>

        {/* FAQ Toggle */}
        <div className="pt-2">
          <button
            onClick={() => setShowFaq(!showFaq)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#1b1b1e] border border-white/5 text-xs text-zinc-300 hover:text-white"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Como funciona a renovação do VIP?</span>
            </div>
            <span>{showFaq ? '−' : '+'}</span>
          </button>

          {showFaq && (
            <div className="p-3 bg-[#18181c] rounded-b-xl border-x border-b border-white/5 text-xs text-zinc-400 leading-relaxed">
              O seu plano pode ser pago via M-Pesa ou e-Mola sem fidelização. Poderá renovar quando desejar através da sua carteira sem cobranças surpresa.
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 py-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Cancelamento simples a qualquer momento</span>
        </div>
      </main>
    </div>
  );
};
