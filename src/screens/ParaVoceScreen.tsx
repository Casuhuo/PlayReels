import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, Bookmark, Share2, ArrowUp, ArrowDown, Lock, X, Send, Database } from 'lucide-react';
import { Drama, UserProfile, Episode } from '../types';
import { getCachedThumbnail, getCachedEpisode, createAndCacheThumbnail } from '../services/localCache';
import { ToastType } from '../components/Toast';

interface ParaVoceScreenProps {
  user: UserProfile;
  drama: Drama;
  currentEpisodeNumber?: number;
  unlockedEpisodeIds: string[];
  onOpenSeriesDetail: (drama: Drama) => void;
  onOpenPaywall: (episode: Episode) => void;
  onOpenWallet: () => void;
  onToggleBookmark: (dramaId: string) => void;
  onShowToast?: (message: string, options?: { type?: ToastType; description?: string }) => void;
}

export const ParaVoceScreen: React.FC<ParaVoceScreenProps> = ({
  user,
  drama,
  currentEpisodeNumber = 1,
  unlockedEpisodeIds,
  onOpenSeriesDetail,
  onOpenPaywall,
  onOpenWallet,
  onToggleBookmark,
  onShowToast
}) => {
  const [currentEpIndex, setCurrentEpIndex] = useState(
    Math.max(0, drama.episodes.findIndex(e => e.number === currentEpisodeNumber))
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(true);
  const [likeCount, setLikeCount] = useState(142800);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([
    { id: 'c1', user: 'Beatriz Lima', text: 'Eu sabia que ele não ia assinar! Essa reviravolta foi chocante!', time: 'Há 5m', likes: 24 },
    { id: 'c2', user: 'Lucas Santos', text: 'Esse herdeiro é muito manipulador, meu Deus! Já quero o ep 4.', time: 'Há 12m', likes: 18 },
    { id: 'c3', user: 'Mariana Silva', text: 'A atuação da Sofia está impecável nesse drama vertical!', time: 'Há 30m', likes: 9 }
  ]);

  const rawEp = drama.episodes[currentEpIndex] || drama.episodes[0];
  const cachedEpMeta = rawEp ? getCachedEpisode(drama.id, rawEp.id) : null;
  const currentEp = cachedEpMeta || rawEp;
  const isEpisodeLocked = !currentEp.isFree && !unlockedEpisodeIds.includes(currentEp.id);

  const cachedThumbnail = currentEp.thumbnail ? getCachedThumbnail(currentEp.thumbnail) : null;
  const imageSource = cachedThumbnail || currentEp.thumbnail || drama.heroPoster;

  // Cache thumbnail in background if not yet cached
  useEffect(() => {
    if (currentEp.thumbnail && !cachedThumbnail) {
      createAndCacheThumbnail(currentEp.thumbnail);
    }
  }, [currentEp.thumbnail, cachedThumbnail]);

  // If episode is locked, check if user should unlock
  useEffect(() => {
    if (isEpisodeLocked) {
      // Show notice or paywall
    }
  }, [isEpisodeLocked]);

  const handleToggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleNextEpisode = () => {
    if (currentEpIndex < drama.episodes.length - 1) {
      const nextEp = drama.episodes[currentEpIndex + 1];
      if (!nextEp.isFree && !unlockedEpisodeIds.includes(nextEp.id)) {
        onOpenPaywall(nextEp);
      } else {
        setCurrentEpIndex(currentEpIndex + 1);
      }
    } else {
      if (onShowToast) {
        onShowToast('Último episódio alcançado', {
          type: 'info',
          description: 'Você assistiu a todos os episódios disponíveis desta temporada.'
        });
      }
    }
  };

  const handlePrevEpisode = () => {
    if (currentEpIndex > 0) {
      setCurrentEpIndex(currentEpIndex - 1);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      user: user.name,
      text: commentText.trim(),
      time: 'Agora mesmo',
      likes: 0
    };
    setCommentsList([newComment, ...commentsList]);
    setCommentText('');
    if (onShowToast) {
      onShowToast('Comentário publicado!', {
        type: 'success',
        description: 'Seu comentário foi compartilhado na comunidade.'
      });
    }
  };

  return (
    <div className="relative w-full h-[100dvh] max-w-md mx-auto bg-black text-white flex flex-col justify-between overflow-hidden select-none pb-16">
      {/* Background Video Scene with Poster / Cinematic Still */}
      <div
        className="absolute inset-0 z-0 overflow-hidden cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <img
          src={imageSource}
          alt={drama.title}
          className={`w-full h-full object-cover object-center transition-transform duration-700 ${
            isPlaying ? 'scale-105' : 'scale-100 filter brightness-75'
          }`}
        />

        {/* Top Vignette Gradient */}
        <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* Bottom Vignette Gradient */}
        <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

        {/* Pause Indicator overlay if tapped */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
              <svg className="w-8 h-8 fill-white ml-1" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Top Bar Header */}
      <header className="relative z-20 w-full pt-safe px-4 flex flex-col gap-2">
        {/* Safe Area & Mode Switcher */}
        <div className="flex items-center justify-between text-xs pt-2">
          <button
            id="mode-toggle-btn"
            onClick={() => {
              if (isEpisodeLocked) {
                onOpenPaywall(currentEp);
              } else {
                // Find next locked episode to preview paywall
                const lockedEp = drama.episodes.find(e => !e.isFree) || currentEp;
                onOpenPaywall(lockedEp);
              }
            }}
            className="px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center gap-1.5 text-[11px] font-medium text-zinc-300 hover:text-white active:scale-95 transition"
            title="Alternar entre modo normal e prévia bloqueada"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isEpisodeLocked ? 'bg-[#e50914] shadow-[0_0_8px_#e50914]' : 'bg-emerald-500'
              }`}
            />
            <span>{isEpisodeLocked ? 'Episódio Bloqueado' : 'Modo: Desbloqueado'}</span>
          </button>

          {/* Live Indicator */}
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
            {cachedThumbnail && (
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono">
                <Database className="w-2.5 h-2.5 text-emerald-400" />
                CACHE
              </span>
            )}
            <span className="px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/10">1080P</span>
            <span className="text-[#e50914] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-pulse" />
              PLAY
            </span>
          </div>
        </div>

        {/* Main Navigation Row */}
        <div className="flex items-center justify-between mt-1">
          {/* Brand Logo */}
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-[#e50914] flex items-center justify-center shadow-[0_0_12px_#e50914]">
              <svg className="w-3.5 h-3.5 fill-white ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-base font-extrabold text-white font-display">PlayReels</span>
          </div>

          {/* Center Tabs */}
          <nav className="flex items-center gap-4 text-xs font-semibold tracking-wide">
            <span className="text-zinc-400 hover:text-white cursor-pointer transition">A Seguir</span>
            <span className="relative text-white font-bold cursor-pointer">
              Para Você
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#e50914] rounded-full shadow-[0_0_8px_#e50914]" />
            </span>
          </nav>

          {/* Coin Pill -> Carteira */}
          <button
            id="player-coin-pill"
            onClick={onOpenWallet}
            className="px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center gap-1.5 active:scale-95 transition"
          >
            <span className="text-xs">🪙</span>
            <span className="text-xs font-bold text-amber-300 font-mono">{user.coins}</span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#e50914] text-[9px] font-bold text-white flex items-center justify-center ml-0.5">
              +
            </span>
          </button>
        </div>
      </header>

      {/* Right Vertical Action Rail */}
      <aside className="absolute right-3 bottom-32 z-20 flex flex-col items-center gap-3.5">
        {/* Creator Avatar with Follow button */}
        <div className="relative mb-1 flex flex-col items-center">
          <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#e50914] to-amber-400 shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyTkxUu5i8ZLXe9pc1Xr46uJdmlyDsEbRGBE5y4zfGdj08UyKpRTzD8zWZJchfH-6vuMdjlMGsUPu_vJftU4kkjFRwJmKal6v-KZzy361t-q5aUo9w1YU62nHUfP7aDYH19rQXRI30YfE1lQy9uSGm5J60R6ZgsXYFBvuhlwMnaIvhoup-A9A73efy2K-rWLwN5ZxnK3-fuUP4Vb-8dxktrc6AOSdLl8nFT6S1dVjuMCe3cW6WwqNYbeOuCvh1xqSREuk"
              alt="Criador"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <button
            id="player-follow-btn"
            onClick={() => {
              const nextFollowing = !isFollowing;
              setIsFollowing(nextFollowing);
              if (onShowToast) {
                onShowToast(nextFollowing ? 'Seguindo canal!' : 'Deixou de seguir', {
                  type: nextFollowing ? 'success' : 'info'
                });
              }
            }}
            className={`absolute -bottom-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition active:scale-95 shadow-md ${
              isFollowing ? 'bg-zinc-700 text-white' : 'bg-[#e50914] text-white hover:scale-110'
            }`}
          >
            {isFollowing ? '✓' : '+'}
          </button>
        </div>

        {/* Curtir / Like */}
        <button
          id="player-like-btn"
          onClick={handleToggleLike}
          className="flex flex-col items-center gap-1 active:scale-90 transition"
        >
          <div className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center transition">
            <Heart
              className={`w-5 h-5 transition-transform ${
                isLiked ? 'text-[#e50914] fill-[#e50914] drop-shadow-[0_0_8px_#e50914]' : 'text-white'
              }`}
            />
          </div>
          <span className="text-[10px] font-semibold text-white drop-shadow">
            {(likeCount / 1000).toFixed(1)}K
          </span>
        </button>

        {/* 💬 Comentários */}
        <button
          id="player-comment-btn"
          onClick={() => setShowComments(true)}
          className="flex flex-col items-center gap-1 active:scale-90 transition"
        >
          <div className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center transition hover:bg-white/20">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-semibold text-white drop-shadow">1.4K</span>
        </button>

        {/* 🔖 Minha Lista Bookmark */}
        <button
          id="player-bookmark-btn"
          onClick={() => onToggleBookmark(drama.id)}
          className="flex flex-col items-center gap-1 active:scale-90 transition"
        >
          <div className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center transition hover:bg-white/20">
            <Bookmark
              className={`w-5 h-5 ${
                user.savedDramaIds.includes(drama.id) ? 'text-amber-400 fill-amber-400' : 'text-white'
              }`}
            />
          </div>
          <span className="text-[10px] font-semibold text-white drop-shadow">38.2K</span>
        </button>

        {/* Partilhar */}
        <button
          id="player-share-btn"
          onClick={() => {
            if (onShowToast) {
              onShowToast('Link copiado!', {
                type: 'success',
                description: 'Link do episódio copiado para a área de transferência.'
              });
            }
          }}
          className="flex flex-col items-center gap-1 active:scale-90 transition"
        >
          <div className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/15 flex items-center justify-center transition hover:bg-white/20">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-semibold text-white drop-shadow">Partilhar</span>
        </button>

        {/* Next / Prev Episode Quick Floating Buttons */}
        <div className="flex flex-col gap-1.5 mt-1">
          <button
            onClick={handlePrevEpisode}
            disabled={currentEpIndex === 0}
            className="w-8 h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-zinc-300 disabled:opacity-30 active:scale-95"
            title="Episódio Anterior"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextEpisode}
            className="w-8 h-8 rounded-full bg-[#e50914] flex items-center justify-center text-white active:scale-95 shadow-md shadow-[#e50914]/50"
            title="Próximo Episódio"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Bottom Info & Subtitles */}
      <footer className="relative z-20 w-full p-4 pb-2 flex flex-col gap-1.5">
        {/* Series Title -> Detalhe da Série */}
        <div className="flex flex-col gap-1 pr-14">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="player-series-title-btn"
              onClick={() => onOpenSeriesDetail(drama)}
              className="text-base font-bold text-white tracking-wide hover:text-[#e50914] transition drop-shadow-md text-left flex items-center gap-1.5"
            >
              <span>{drama.subtitle}</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-white/20 border border-white/20 font-semibold text-white">
                EP {currentEp.number}
              </span>
            </button>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#e50914]/90 text-white tracking-wider uppercase shadow-sm">
              {drama.genre}
            </span>
          </div>

          <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed drop-shadow">
            {currentEp.description || drama.synopsis}
          </p>
        </div>

        {/* Synchronized Subtitle Display */}
        <div className="w-full my-0.5">
          <div className="inline-block bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border-l-2 border-[#e50914] max-w-full">
            <p className="text-[13px] font-medium text-amber-200 tracking-wide leading-tight drop-shadow">
              <span className="text-[#e50914] font-bold mr-1 text-xs uppercase">[Legenda]</span>
              {currentEp.subtitle}
            </p>
          </div>
        </div>

        {/* Progress Scrub Bar */}
        <div className="w-full flex flex-col gap-1 pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 font-semibold">
            <span className="text-white">01:14</span>
            <span>{currentEp.duration}</span>
          </div>
          <div
            onClick={handleNextEpisode}
            className="relative w-full h-1 bg-white/25 rounded-full overflow-visible cursor-pointer"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[62%] bg-[#e50914] rounded-full shadow-[0_0_8px_#e50914]">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-100" />
            </div>
          </div>
        </div>

        {/* Locked Episode Warning banner if locked */}
        {isEpisodeLocked && (
          <div className="mt-1 p-2 rounded-xl bg-[#e50914]/20 border border-[#e50914]/40 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-zinc-200">
              <Lock className="w-4 h-4 text-[#e50914]" />
              <span>Episódio Bloqueado (30 moedas)</span>
            </div>
            <button
              onClick={() => onOpenPaywall(currentEp)}
              className="px-3 py-1 rounded-full bg-[#e50914] text-white text-xs font-bold active:scale-95"
            >
              Desbloquear
            </button>
          </div>
        )}

        {/* Swipe Hint */}
        <div
          onClick={handleNextEpisode}
          className="w-full pt-1 flex items-center justify-center gap-1 text-zinc-400 cursor-pointer animate-bounce"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#e50914]" />
          <span className="text-[11px] font-medium text-zinc-300">
            Deslize ou toque para o próximo episódio
          </span>
        </div>
      </footer>

      {/* Comments Drawer Modal */}
      {showComments && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end">
          <div className="w-full max-w-md mx-auto bg-[#1b1b1e] border-t border-white/10 rounded-t-3xl p-4 flex flex-col max-h-[70vh] shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">Comentários</h3>
                <span className="text-xs text-zinc-400">({commentsList.length})</span>
              </div>
              <button
                onClick={() => setShowComments(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 no-scrollbar">
              {commentsList.map((c) => (
                <div key={c.id} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#e50914] to-amber-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {c.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-300">{c.user}</span>
                      <span className="text-[10px] text-zinc-500">{c.time}</span>
                    </div>
                    <p className="text-xs text-zinc-200 mt-0.5 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="pt-2 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escreva um comentário..."
                className="flex-1 h-10 px-3 rounded-full bg-[#2a2a2d] text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#e50914]"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#e50914] flex items-center justify-center text-white shrink-0 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
