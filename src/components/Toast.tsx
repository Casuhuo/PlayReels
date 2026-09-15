import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookmarkCheck, Gift, CheckCircle2, Sparkles, X, Info } from 'lucide-react';

export type ToastType = 'success' | 'bonus' | 'bookmark' | 'info';

export interface ToastData {
  id?: string;
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number; // ms, default 3000
}

interface ToastProps {
  toast: ToastData | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, toast.duration || 3200);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const renderIcon = (type?: ToastType) => {
    switch (type) {
      case 'bonus':
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-black shadow-[0_0_12px_rgba(245,158,11,0.5)] shrink-0">
            <Gift className="w-4 h-4 fill-black/80" />
          </div>
        );
      case 'bookmark':
        return (
          <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)] shrink-0">
            <BookmarkCheck className="w-4 h-4" />
          </div>
        );
      case 'info':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
            <Info className="w-4 h-4" />
          </div>
        );
      case 'success':
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
    }
  };

  const getBorderColor = (type?: ToastType) => {
    switch (type) {
      case 'bonus':
        return 'border-amber-500/40 shadow-amber-950/40';
      case 'bookmark':
        return 'border-rose-500/30 shadow-rose-950/30';
      case 'info':
        return 'border-blue-500/30 shadow-blue-950/30';
      case 'success':
      default:
        return 'border-emerald-500/30 shadow-emerald-950/30';
    }
  };

  return (
    <div
      id="toast-notification-container"
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id || toast.message}
            initial={{ opacity: 0, y: -24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.95 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto w-full max-w-sm rounded-2xl bg-[#1c1c22]/95 backdrop-blur-xl border ${getBorderColor(
              toast.type
            )} p-3.5 shadow-2xl flex items-center justify-between gap-3 select-none`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {renderIcon(toast.type)}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white tracking-wide truncate flex items-center gap-1.5">
                  {toast.message}
                  {toast.type === 'bonus' && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
                  )}
                </p>
                {toast.description && (
                  <p className="text-[11px] text-zinc-300 truncate mt-0.5">
                    {toast.description}
                  </p>
                )}
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={onDismiss}
              aria-label="Fechar notificação"
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 flex items-center justify-center text-zinc-400 hover:text-white transition shrink-0 ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
