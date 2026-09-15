import React, { useState } from 'react';
import { ArrowLeft, Mail, Send, CheckCircle, Info, ShieldCheck } from 'lucide-react';

interface RecuperarSenhaScreenProps {
  onBackToLogin: () => void;
}

export const RecuperarSenhaScreen: React.FC<RecuperarSenhaScreenProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#131316] text-white flex flex-col justify-between max-w-md mx-auto pt-safe pb-safe px-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <button
          onClick={onBackToLogin}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/10 transition"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold text-zinc-300 font-display">Reset Password</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col justify-center py-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-[#1b1b1e] border border-white/10 text-xs font-semibold text-zinc-300">
            ▶ PlayReels VIP
          </span>
          <span className="flex items-center gap-1 text-xs text-amber-400 bg-[#1b1b1e] px-2.5 py-1 rounded-full border border-amber-400/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Acesso Seguro</span>
          </span>
        </div>

        {/* Hero Icon */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#1f1f22] border border-white/10 shadow-[0_0_36px_rgba(229,9,20,0.25)]">
            <div className="w-14 h-14 rounded-full bg-[#2a2a2d] flex items-center justify-center text-[#e50914]">
              <Mail className="w-7 h-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#e50914] flex items-center justify-center text-white shadow-md">
              <span className="text-xs">🔄</span>
            </div>
          </div>
        </div>

        {/* Header Text */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-white tracking-tight font-display mb-1.5">
            Recuperar palavra-passe
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
            Introduza o email associado à sua conta. Enviaremos um link seguro para redefinir a sua palavra-passe.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 pl-1" htmlFor="recovery-email">
              Email Cadastrado
            </label>
            <div className="relative flex items-center rounded-xl bg-[#1b1b1e] border border-white/10 focus-within:border-[#e50914] focus-within:bg-[#232328] transition">
              <Mail className="absolute left-3.5 text-zinc-400 w-4 h-4 pointer-events-none" />
              <input
                id="recovery-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full bg-transparent py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            id="btn-send-recovery"
            type="submit"
            disabled={isLoading || isSent}
            className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-[0_8px_24px_rgba(229,9,20,0.5)] active:scale-[0.98] transition flex items-center justify-center gap-2 ${
              isSent
                ? 'bg-emerald-600 text-white'
                : 'bg-[#e50914] hover:bg-[#ff1e27] text-white'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isSent ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Link Enviado com Sucesso</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar link</span>
              </>
            )}
          </button>
        </form>

        {/* Success Confirmation Banner */}
        {isSent && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Email de recuperação enviado!</p>
              <p className="text-zinc-300 mt-0.5">
                Verifique a sua caixa de entrada nos próximos minutos para redefinir sua senha.
              </p>
            </div>
          </div>
        )}

        {/* Spam Notice */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#1b1b1e] border border-white/5 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-zinc-200">Não encontrou a mensagem?</p>
            <p className="text-zinc-400 mt-0.5">
              Verifique também a sua caixa de spam se não receber o código em 2 minutos.
            </p>
          </div>
        </div>
      </div>

      {/* Footer -> Voltar para o Login */}
      <div className="text-center py-4">
        <button
          id="btn-back-to-login"
          onClick={onBackToLogin}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1b1b1e] border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-[#25252b] active:scale-95 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Login</span>
        </button>
      </div>
    </div>
  );
};
