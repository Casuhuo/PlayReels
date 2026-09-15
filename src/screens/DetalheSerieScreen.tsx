import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Bookmark, BookmarkCheck, Share2, Star, Lock, Check, Database, WifiOff } from 'lucide-react';
import { Drama, Episode, UserProfile } from '../types';
import { CachedThumbnail } from '../components/CachedThumbnail';
import { cacheEpisodeMetadata, getCachedEpisodesForDrama } from '../services/localCache';
import { ToastType } from '../components/Toast';

interface DetalheSerieScreenProps {
  drama: Drama;
  user: UserProfile;
  unlockedEpisodeIds: string[];
  onBack: () => void;
  onWatchEpisode: (episodeNumber: number) => void;
  onOpenPaywall: (episode: Episode) => void;
  onToggleBookmark: (dramaId: string) => void;
  onShowToast?: (message: string, options?: { type?: ToastType; description?: string }) => void;
}

export const DetalheSerieScreen: React.FC<DetalheSerieScreenProps> = ({
  drama,
  user,
  unlockedEpisodeIds,
  onBack,
  onWatchEpisode,
  onOpenPaywall,
  onToggleBookmark,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'episodios' | 'recomendados'>('episodios');
  const [isExpanded, setIsExpanded] = useState(false);

  // Use cached episode metadata if network is unstable/offline, sync to cache on load
  const [episodes, setEpisodes] = useState<Episode[]>(() => {
    const cached = getCachedEpisodesForDrama(drama.id);
    return cached && cached.length > 0 ? cached : drama.episodes;
  });

  useEffect(() => {
    cacheEpisodeMetadata(drama.id, drama.episodes);
    const cached = getCachedEpisodesForDrama(drama.id);
    if (cached) {
      setEpisodes(cached);
    }
  }, [drama.id, drama.episodes]);

  const isSaved = user.savedDramaIds.includes(drama.id);

  const handleEpisodeClick = (ep: Episode) => {
    const isUnlocked = ep.isFree || unlockedEpisodeIds.includes(ep.id);
    if (isUnlocked) {
      onWatchEpisode(ep.number);
    } else {
      onOpenPaywall(ep);
    }
  };

  return (
    <div className="min-h-screen bg-[#131316] text-white flex flex-col pb-24 max-w-md mx-auto relative select-none">
      {/* Hero Cover Backdrop */}
      <div className="relative w-full aspect-[16/11] bg-[#0c0c0e]">
        <img
          src={drama.heroPoster}
          alt={drama.title}
          className="w-full h-full object-cover object-center"
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-[#131316]/30 to-black/60 pointer-events-none" />

        {/* Top Floating Controls */}
        <div className="absolute top-0 inset-x-0 pt-safe px-4 py-3 flex items-center justify-between z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-95 transition"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(drama.id)}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-95 transition"
              aria-label="Salvar"
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5 text-[#e50914]" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={() => {
                if (onShowToast) {
                  onShowToast('Link copiado!', {
                    type: 'success',
                    description: 'Link do dorama copiado para a área de transferência.'
                  });
                }
              }}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-95 transition"
              aria-label="Partilhar"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Quick Play button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={() => onWatchEpisode(1)}
            className="pointer-events-auto w-14 h-14 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-[0_0_24px_rgba(229,9,20,0.8)] active:scale-90 transition hover:scale-105"
          >
            <Play className="w-6 h-6 fill-white ml-1" />
          </button>
        </div>

        {/* Badges on hero */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#e50914] text-white text-[11px] font-bold uppercase tracking-wider">
            Original PlayReels
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>{drama.rating}</span>
          </span>
        </div>
      </div>

      {/* Main Info */}
      <div className="px-4 pt-3 flex flex-col">
        <h1 className="text-2xl font-extrabold text-white tracking-tight font-display">
          {drama.title}
        </h1>

        <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1 flex-wrap">
          <span className="text-zinc-200 font-semibold">{drama.genre}</span>
          <span>•</span>
          <span>{drama.totalEpisodes} Episódios</span>
          <span>•</span>
          <span className="text-[#ff8087] font-semibold">{drama.reviewCount} avaliações</span>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <button
            id="detail-watch-ep1-btn"
            onClick={() => onWatchEpisode(1)}
            className="h-12 rounded-xl bg-[#e50914] hover:bg-[#ff1e27] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(229,9,20,0.4)] active:scale-95 transition"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Assistir EP 1 Grátis</span>
          </button>

          <button
            id="detail-bookmark-btn"
            onClick={() => onToggleBookmark(drama.id)}
            className={`h-12 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition active:scale-95 ${
              isSaved
                ? 'bg-[#e50914]/15 border-[#e50914] text-[#ff8087]'
                : 'bg-[#1b1b1e] border-white/10 text-white hover:bg-[#25252a]'
            }`}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? 'Na Minha Lista' : '+ Minha Lista'}</span>
          </button>
        </div>

        {/* Synopsis */}
        <div className="p-3.5 rounded-xl bg-[#1b1b1e] border border-white/5 my-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 font-display">
            Sinopse
          </h3>
          <p className={`text-xs text-zinc-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
            {drama.synopsis}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-[#ff4d58] font-semibold mt-1 hover:underline"
          >
            {isExpanded ? 'Mostrar menos' : 'Ler mais...'}
          </button>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap my-3">
          {drama.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-[#1b1b1e] border border-white/5 text-[11px] text-zinc-300 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Tabs: Episódios vs Recomendados */}
        <div className="flex border-b border-white/10 mt-2 mb-3">
          <button
            onClick={() => setActiveTab('episodios')}
            className={`flex-1 py-3 text-xs font-bold tracking-wide text-center border-b-2 transition flex items-center justify-center gap-1.5 ${
              activeTab === 'episodios'
                ? 'border-[#e50914] text-[#e50914]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <span>Episódios ({episodes.length})</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Cache
            </span>
          </button>
          <button
            onClick={() => setActiveTab('recomendados')}
            className={`flex-1 py-3 text-xs font-bold tracking-wide text-center border-b-2 transition ${
              activeTab === 'recomendados'
                ? 'border-[#e50914] text-[#e50914]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Recomendações
          </button>
        </div>

        {/* Episodes List */}
        {activeTab === 'episodios' ? (
          <div className="space-y-2.5">
            {episodes.map((ep) => {
              const isUnlocked = ep.isFree || unlockedEpisodeIds.includes(ep.id);
              return (
                <div
                  key={ep.id}
                  onClick={() => handleEpisodeClick(ep)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#1b1b1e] border border-white/5 hover:border-white/20 transition cursor-pointer group active:scale-[0.99]"
                >
                  {/* Thumbnail with localStorage cache support */}
                  <div className="relative w-24 aspect-video rounded-lg overflow-hidden bg-black shrink-0">
                    <CachedThumbnail
                      src={ep.thumbnail}
                      alt={ep.title}
                      showBadge={true}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                      {isUnlocked ? (
                        <div className="w-7 h-7 rounded-full bg-[#e50914] flex items-center justify-center text-white shadow">
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-black/70 border border-amber-400/40 flex items-center justify-center text-amber-300">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 px-1 rounded text-zinc-300 z-10">
                      {ep.duration}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white truncate">{ep.title}</h4>
                      {isUnlocked ? (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {ep.isFree ? 'Grátis' : 'Desbloqueado'}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded flex items-center gap-1">
                          <span>🪙</span>
                          <span>30</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-1">{ep.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#1b1b1e] text-center border border-white/5">
              <p className="text-xs font-bold text-white">Amor Sob Contrato</p>
              <p className="text-[10px] text-zinc-400">92 Episódios • 4.9 ★</p>
            </div>
            <div className="p-3 rounded-xl bg-[#1b1b1e] text-center border border-white/5">
              <p className="text-xs font-bold text-white">Vingança da Noiva</p>
              <p className="text-[10px] text-zinc-400">85 Episódios • 4.9 ★</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
