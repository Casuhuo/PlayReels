import React, { useState } from 'react';
import { Bookmark, Play, Trash2, Clock, Download, Compass, Database, HardDrive } from 'lucide-react';
import { Drama, UserProfile } from '../types';
import { TopHeader } from '../components/TopHeader';
import { CachedThumbnail } from '../components/CachedThumbnail';
import { getAllCachedEpisodeMetadata, getCacheStats } from '../services/localCache';

interface MinhaListaScreenProps {
  user: UserProfile;
  allDramas: Drama[];
  onOpenSeriesDetail: (drama: Drama) => void;
  onGoToInicio: () => void;
  onOpenSearch: () => void;
  onOpenWallet: () => void;
  onOpenProfile: () => void;
  onRemoveFromList: (dramaId: string) => void;
}

export const MinhaListaScreen: React.FC<MinhaListaScreenProps> = ({
  user,
  allDramas,
  onOpenSeriesDetail,
  onGoToInicio,
  onOpenSearch,
  onOpenWallet,
  onOpenProfile,
  onRemoveFromList
}) => {
  const [activeTab, setActiveTab] = useState<'salvos' | 'historico' | 'baixados'>('salvos');

  // Filter saved dramas
  const savedDramas = allDramas.filter(d => user.savedDramaIds.includes(d.id));

  // Retrieve cached episodes from localStorage
  const cachedMetadata = getAllCachedEpisodeMetadata();
  const cacheStats = getCacheStats();

  const cachedItems: { drama: Drama; episode: any }[] = [];
  allDramas.forEach((drama) => {
    const eps = cachedMetadata[drama.id] || drama.episodes;
    eps.slice(0, 2).forEach((ep) => {
      cachedItems.push({ drama, episode: ep });
    });
  });

  return (
    <div className="min-h-screen bg-[#131316] text-white flex flex-col pb-24 max-w-md mx-auto select-none">
      <TopHeader
        user={user}
        onOpenSearch={onOpenSearch}
        onOpenWallet={onOpenWallet}
        onOpenProfile={onOpenProfile}
      />

      <main className="flex-1 px-4 pt-16 space-y-3">
        {/* Title */}
        <div className="pt-2">
          <h1 className="text-xl font-extrabold text-white font-display">Minha Biblioteca</h1>
          <p className="text-xs text-zinc-400">Suas séries guardadas e histórico de episódios</p>
        </div>

        {/* Filter Pills */}
        <div className="flex border-b border-white/10 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('salvos')}
            className={`flex-1 py-3 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'salvos'
                ? 'border-[#e50914] text-[#e50914]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Salvos ({savedDramas.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('historico')}
            className={`flex-1 py-3 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'historico'
                ? 'border-[#e50914] text-[#e50914]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Histórico</span>
          </button>

          <button
            onClick={() => setActiveTab('baixados')}
            className={`flex-1 py-3 text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'baixados'
                ? 'border-[#e50914] text-[#e50914]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Offline</span>
          </button>
        </div>

        {/* Content based on tab */}
        {activeTab === 'salvos' && (
          <div>
            {savedDramas.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#1f1f22] flex items-center justify-center text-zinc-500 mb-3">
                  <Bookmark className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-white">Sua lista está vazia</h3>
                <p className="text-xs text-zinc-400 max-w-xs mt-1">
                  Guarde seus doramas favoritos tocando no ícone de marcador na tela de início ou no player.
                </p>
                <button
                  onClick={onGoToInicio}
                  className="mt-4 px-5 py-2.5 rounded-full bg-[#e50914] text-white text-xs font-bold active:scale-95 transition flex items-center gap-1.5"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explorar Doramas</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {savedDramas.map((drama) => (
                  <div
                    key={drama.id}
                    className="relative flex flex-col rounded-2xl bg-[#1b1b1e] border border-white/5 overflow-hidden group shadow-md"
                  >
                    {/* Poster Click -> Detalhe da Série */}
                    <div
                      onClick={() => onOpenSeriesDetail(drama)}
                      className="relative aspect-[9/14] w-full bg-zinc-900 cursor-pointer overflow-hidden"
                    >
                      <img
                        src={drama.verticalPoster}
                        alt={drama.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-2 left-2 bg-[#e50914] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                        {drama.category}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFromList(drama.id);
                        }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-zinc-300 hover:text-red-400 transition"
                        title="Remover da lista"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="absolute bottom-2 inset-x-2 flex items-center justify-between">
                        <span className="text-[10px] text-amber-300 font-semibold font-mono">
                          {drama.totalEpisodes} Eps
                        </span>
                        <div className="w-7 h-7 rounded-full bg-[#e50914] flex items-center justify-center text-white shadow-md">
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => onOpenSeriesDetail(drama)}
                      className="p-2 cursor-pointer"
                    >
                      <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#e50914] transition">
                        {drama.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 truncate mt-0.5">{drama.genre}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'historico' && (
          <div className="space-y-2 pt-1">
            {allDramas.slice(0, 3).map((drama, idx) => (
              <div
                key={drama.id}
                onClick={() => onOpenSeriesDetail(drama)}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1b1b1e] border border-white/5 cursor-pointer hover:border-white/20 transition active:scale-[0.99]"
              >
                <div className="relative w-20 aspect-video rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                  <img src={drama.heroPoster} alt={drama.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-4 h-4 fill-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">{drama.title}</h4>
                    <span className="text-[10px] text-zinc-500">Hoje</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">Episódio {idx + 1} de {drama.totalEpisodes}</p>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="h-full bg-[#e50914] rounded-full"
                      style={{ width: `${(idx + 1) * 30}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'baixados' && (
          <div className="space-y-3 pt-1">
            {/* Cache Storage Header Banner */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#1b1b1e] border border-emerald-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Episódios em Cache Local</p>
                  <p className="text-[10px] text-zinc-400">
                    {cacheStats.metadataCount} episódios • {cacheStats.thumbnailCount} miniaturas ({cacheStats.formattedSize})
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Offline Pronto
              </span>
            </div>

            {cachedItems.length > 0 ? (
              <div className="space-y-2">
                {cachedItems.map(({ drama, episode }, idx) => (
                  <div
                    key={`${drama.id}-${episode.id}-${idx}`}
                    onClick={() => onOpenSeriesDetail(drama)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1b1b1e] border border-white/5 hover:border-emerald-500/30 cursor-pointer transition active:scale-[0.99] group"
                  >
                    <div className="relative w-24 aspect-video rounded-lg overflow-hidden bg-black shrink-0">
                      <CachedThumbnail
                        src={episode.thumbnail}
                        alt={episode.title}
                        showBadge={true}
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                        <div className="w-7 h-7 rounded-full bg-[#e50914] flex items-center justify-center text-white shadow">
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 px-1 rounded text-zinc-300 z-10">
                        {episode.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white truncate">{episode.title}</h4>
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 shrink-0">
                          Cache
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate">{drama.title}</p>
                      <p className="text-[10px] text-zinc-500 truncate mt-0.5">{episode.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#1b1b1e] border border-white/10 flex items-center justify-center text-zinc-500 mb-2">
                  <Download className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-white">Nenhum episódio no cache local</p>
                <p className="text-[11px] text-zinc-400 max-w-xs mt-1">
                  Vá a Definições para pré-carregar metadados e miniaturas para reprodução offline instantânea.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
