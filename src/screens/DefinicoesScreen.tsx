import React, { useState } from 'react';
import { ArrowLeft, LogOut, Check, Database, RefreshCw, WifiOff, HardDrive } from 'lucide-react';
import { Drama } from '../types';
import { useLocalCache } from '../hooks/useLocalCache';
import { ToastType } from '../components/Toast';

interface DefinicoesScreenProps {
  onBack: () => void;
  onLogout: () => void;
  dramas?: Drama[];
  onShowToast?: (message: string, options?: { type?: ToastType; description?: string }) => void;
}

export const DefinicoesScreen: React.FC<DefinicoesScreenProps> = ({ onBack, onLogout, dramas = [], onShowToast }) => {
  const [quality, setQuality] = useState('1080p');
  const [autoplay, setAutoplay] = useState(true);
  const [downloadWifiOnly, setDownloadWifiOnly] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [cacheCleared, setCacheCleared] = useState(false);

  const {
    stats,
    isSimulatedOffline,
    isPreloading,
    preloadProgress,
    preloadMessage,
    clearCache,
    toggleSimulatedOffline,
    preloadAll
  } = useLocalCache(dramas);

  const handleClearCache = () => {
    clearCache();
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2000);
    if (onShowToast) {
      onShowToast('Cache limpo!', {
        type: 'success',
        description: 'Metadados e miniaturas locais foram removidos.'
      });
    }
  };

  const handlePreload = () => {
    if (dramas.length > 0) {
      preloadAll(dramas);
      if (onShowToast) {
        onShowToast('Pré-carregamento iniciado', {
          type: 'info',
          description: 'Salvando miniaturas e metadados no armazenamento local.'
        });
      }
    }
  };

  const handleToggleOffline = () => {
    const nextState = !isSimulatedOffline;
    toggleSimulatedOffline();
    if (onShowToast) {
      onShowToast(nextState ? 'Modo Offline Ativado' : 'Conexão Restaurada', {
        type: nextState ? 'info' : 'success',
        description: nextState ? 'O app utilizará apenas os dados e miniaturas salvas em cache.' : 'O app voltou ao modo de rede normal.'
      });
    }
  };

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
          <span className="text-sm font-semibold text-zinc-300 font-display">Definições</span>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 px-4 py-3 space-y-4">
        {/* Local Storage & Cache Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#e50914]" />
              Cache Local & Rede (localStorage)
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {stats.formattedSize}
            </span>
          </div>

          <div className="rounded-2xl bg-[#1b1b1e] border border-white/5 divide-y divide-white/5 overflow-hidden">
            {/* Cache Storage Metrics */}
            <div className="p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                    Armazenamento Offline
                  </p>
                  <p className="text-[10px] text-zinc-400">
                    {stats.metadataCount} episódios • {stats.thumbnailCount} miniaturas em cache
                  </p>
                </div>
                <button
                  onClick={handleClearCache}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-semibold transition active:scale-95"
                >
                  {cacheCleared ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Limpo
                    </span>
                  ) : (
                    'Limpar Cache'
                  )}
                </button>
              </div>

              {/* Preload button & progress */}
              <div className="mt-2 pt-2 border-t border-white/5 flex flex-col gap-2">
                <button
                  disabled={isPreloading}
                  onClick={handlePreload}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition active:scale-98 ${
                    isPreloading
                      ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#e50914]/20 to-amber-500/20 hover:from-[#e50914]/30 hover:to-amber-500/30 text-white border border-[#e50914]/30'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#e50914] ${isPreloading ? 'animate-spin' : ''}`} />
                  <span>
                    {isPreloading ? 'Pré-carregando...' : 'Sincronizar Todas as Miniaturas'}
                  </span>
                </button>

                {isPreloading && (
                  <div className="space-y-1">
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#e50914] to-amber-400 h-full transition-all duration-300"
                        style={{ width: `${preloadProgress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-400 text-center font-mono">
                      {preloadMessage} ({preloadProgress}%)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Simulated Offline / Unstable Network Toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="pr-3">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <WifiOff className={`w-3.5 h-3.5 ${isSimulatedOffline ? 'text-amber-400' : 'text-zinc-400'}`} />
                  Simular Rede Instável / Offline
                </p>
                <p className="text-[10px] text-zinc-400">
                  Testa carregamento instantâneo de metadados e miniaturas direto do cache local
                </p>
              </div>
              <input
                type="checkbox"
                checked={isSimulatedOffline}
                onChange={handleToggleOffline}
                className="w-5 h-5 rounded accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Playback Settings */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-display">
            Reprodução e Vídeo
          </h3>

          <div className="rounded-2xl bg-[#1b1b1e] border border-white/5 divide-y divide-white/5 overflow-hidden">
            {/* Video Quality */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Qualidade de Transmissão</p>
                <p className="text-[10px] text-zinc-400">Vertical HDR 9:16</p>
              </div>
              <div className="flex items-center gap-1.5 bg-[#2a2a2d] p-1 rounded-lg">
                {['720p', '1080p'].map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition ${
                      quality === q ? 'bg-[#e50914] text-white shadow' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Autoplay toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Reprodução Automática</p>
                <p className="text-[10px] text-zinc-400">Passar automaticamente para o próximo episódio</p>
              </div>
              <input
                type="checkbox"
                checked={autoplay}
                onChange={(e) => setAutoplay(e.target.checked)}
                className="w-5 h-5 rounded accent-[#e50914] cursor-pointer"
              />
            </div>

            {/* Downloads wifi only */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Downloads Apenas em Wi-Fi</p>
                <p className="text-[10px] text-zinc-400">Economizar plano de dados de internet móvel</p>
              </div>
              <input
                type="checkbox"
                checked={downloadWifiOnly}
                onChange={(e) => setDownloadWifiOnly(e.target.checked)}
                className="w-5 h-5 rounded accent-[#e50914] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-display">
            Geral e Notificações
          </h3>

          <div className="rounded-2xl bg-[#1b1b1e] border border-white/5 divide-y divide-white/5 overflow-hidden">
            {/* Push notifications */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Novos Episódios & Estreias</p>
                <p className="text-[10px] text-zinc-400">Receber alertas de lançamentos diários</p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 rounded accent-[#e50914] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Legal & About */}
        <div className="p-4 rounded-2xl bg-[#1b1b1e] border border-white/5 text-center text-xs text-zinc-400 space-y-1.5">
          <p className="font-bold text-white">PlayReels Vertical Streaming</p>
          <p className="text-[11px] text-zinc-500">Versão 2.4.0 (Offline Cache Habilitado)</p>
          <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-zinc-400">
            <span className="hover:underline cursor-pointer">Termos de Uso</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Privacidade</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Suporte</span>
          </div>
        </div>

        {/* Terminar Sessão -> Login */}
        <button
          id="btn-logout-settings"
          onClick={onLogout}
          className="w-full py-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/30 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition shadow-lg mt-4"
        >
          <LogOut className="w-4 h-4" />
          <span>Terminar Sessão</span>
        </button>
      </main>
    </div>
  );
};
