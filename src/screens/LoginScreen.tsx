import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, ArrowRight, Coins } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (email?: string) => void;
  onForgotPassword: () => void;
  onGoToSignup: () => void;
  onBack?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onForgotPassword,
  onGoToSignup,
  onBack
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email || 'carlitoaugustohuo@gmail.com');
    }, 600);
  };

  const handleSocialLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#131316] text-white flex flex-col justify-between max-w-md mx-auto pt-safe pb-safe px-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between py-3">
        <button
          onClick={onBack || onGoToSignup}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/10 transition"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-semibold text-zinc-300 font-display">Sign In</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col justify-center py-4">
        {/* Brand & Ambient Glow */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3 group">
            <div className="absolute inset-0 rounded-full bg-[#e50914]/30 blur-xl scale-125" />
            <div className="relative w-20 h-20 rounded-full p-1 bg-[#1f1f22] border border-white/10 shadow-[0_8px_24px_rgba(229,9,20,0.35)] flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-[#e50914] flex items-center justify-center shadow-inner">
                <svg className="w-7 h-7 fill-white ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#e50914]/15 border border-[#e50914]/30 text-[#ff8087] text-[10px] font-bold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-ping" />
            Streaming Vertical
          </span>

          <h1 className="text-2xl font-extrabold text-white tracking-tight font-display">
            Bem-vindo de volta
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-[260px]">
            Assista aos melhores micro-dramas verticais
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 pl-1" htmlFor="login-email">
              Email
            </label>
            <div className="relative flex items-center rounded-xl bg-[#1b1b1e] border border-white/10 focus-within:border-[#e50914] focus-within:bg-[#232328] transition">
              <Mail className="absolute left-3.5 text-zinc-400 w-4 h-4 pointer-events-none" />
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full bg-transparent py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 pl-1" htmlFor="login-password">
              Palavra-passe
            </label>
            <div className="relative flex items-center rounded-xl bg-[#1b1b1e] border border-white/10 focus-within:border-[#e50914] focus-within:bg-[#232328] transition">
              <Lock className="absolute left-3.5 text-zinc-400 w-4 h-4 pointer-events-none" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent py-3 pl-10 pr-11 text-sm text-white placeholder:text-zinc-600 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-zinc-400 hover:text-white p-1"
                aria-label="Alternar visibilidade da senha"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              id="btn-forgot-password"
              type="button"
              onClick={onForgotPassword}
              className="text-xs text-zinc-400 hover:text-zinc-200 transition py-1"
            >
              Esqueci a senha?
            </button>
          </div>

          {/* Submit Button -> Início */}
          <button
            id="btn-login-submit"
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-[#e50914] hover:bg-[#ff1e27] text-white font-bold text-sm tracking-wide shadow-[0_8px_24px_rgba(229,9,20,0.5)] active:scale-[0.98] transition flex items-center justify-center gap-2 mt-1"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Entrar</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full h-px bg-white/10" />
          <span className="absolute px-3 bg-[#131316] text-xs text-zinc-500 lowercase">ou</span>
        </div>

        {/* Social Buttons: Google / Apple -> Início */}
        <div className="flex flex-col gap-2.5">
          <button
            id="btn-google-login"
            type="button"
            onClick={handleSocialLogin}
            className="w-full py-3 px-4 rounded-xl bg-[#1b1b1e] border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-3 hover:bg-[#242429] active:scale-[0.98] transition shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"/>
              <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"/>
              <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"/>
              <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"/>
            </svg>
            <span>Continuar com Google</span>
          </button>

          <button
            id="btn-apple-login"
            type="button"
            onClick={handleSocialLogin}
            className="w-full py-3 px-4 rounded-xl bg-[#1b1b1e] border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-3 hover:bg-[#242429] active:scale-[0.98] transition shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.74-.96 2.76 1.01.08 2.07-.51 2.69-1.26z"/>
            </svg>
            <span>Continuar com Apple</span>
          </button>
        </div>

        {/* Bonus Promo Card */}
        <div className="mt-5 p-3 rounded-xl bg-[#1b1b1e] border border-amber-400/20 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-white leading-tight">Bónus de Primeiro Acesso</span>
            <span className="text-[11px] text-zinc-400 truncate">Ganhe 50 moedas de drama ao entrar hoje!</span>
          </div>
        </div>
      </div>

      {/* Footer: Não tens conta? Criar conta -> Cadastro */}
      <div className="text-center py-3 text-xs text-zinc-400">
        <span>Não tens conta?</span>
        <button
          id="link-to-cadastro"
          onClick={onGoToSignup}
          className="text-[#ff4d58] font-bold hover:underline ml-1"
        >
          Criar conta
        </button>
      </div>
    </div>
  );
};
