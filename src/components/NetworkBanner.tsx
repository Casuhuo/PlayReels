import React from 'react';
import { WifiOff, Database, CheckCircle2 } from 'lucide-react';

interface NetworkBannerProps {
  isEffectiveOnline: boolean;
  isSimulated: boolean;
  cachedCount: number;
  onOpenSettings?: () => void;
}

export const NetworkBanner: React.FC<NetworkBannerProps> = ({
  isEffectiveOnline,
  isSimulated,
  cachedCount,
  onOpenSettings
}) => {
  if (isEffectiveOnline) return null;

  return (
    <div
      role="status"
      className="fixed top-14 inset-x-0 z-30 max-w-md mx-auto px-3 py-1.5 bg-amber-500/15 border-b border-amber-500/30 backdrop-blur-md flex items-center justify-between text-[11px] text-amber-200"
    >
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-300">
          <WifiOff className="w-3 h-3" />
        </div>
        <div className="truncate">
          <span className="font-bold text-amber-300">
            {isSimulated ? 'Modo Rede Instável Ativo' : 'Conexão Instável / Offline'}
          </span>
          <span className="text-zinc-300 ml-1">
            • Carregando {cachedCount > 0 ? `${cachedCount} episódios` : 'dados'} do cache local
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
          <Database className="w-2.5 h-2.5" />
          Cache ON
        </span>
        {onOpenSettings && (
          <button
            onClick={onOpenSettings}
            className="text-[10px] font-semibold text-amber-300 hover:text-white underline ml-1"
          >
            Ajustar
          </button>
        )}
      </div>
    </div>
  );
};
