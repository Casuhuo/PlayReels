import React, { useState } from 'react';
import { Play, Bookmark, BookmarkCheck, Flame, Gift, ChevronRight } from 'lucide-react';
import { Drama, UserProfile } from '../types';
import { TopHeader } from '../components/TopHeader';
import { CachedThumbnail } from '../components/CachedThumbnail';

interface InicioScreenProps {
  user: UserProfile;
  dramas: Drama[];
  onOpenSeriesDetail: (drama: Drama) => void;
  onOpenSearch: () => void;
  onOpenWallet: () => void;
  onOpenProfile: () => void;
  onClaimDailyBonus: () => void;
  onToggleBookmark: (dramaId: string) => void;
}

export const InicioScreen: React.FC<InicioScreenProps> = ({
  user,
  dramas,
  onOpenSeriesDetail,
  onOpenSearch,
  onOpenWallet,
  onOpenProfile,
  onClaimDailyBonus,
  onToggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Em Alta');

  const categories = [
    'Em Alta',
    'CEO & Bilionários',
    'Casamento Secreto',
    'Vingança Feroz',
    'Comédia Romântica',
    'Sobrenatural'
  ];

  // Main featured drama (Ouro e Cinza or Retorno do Bilionário)
  const heroDrama = dramas[0];

  return (
    <div className="min-h-screen bg-[#131316] text-white flex flex-col pb-24 max-w-md mx-auto relative select-none">
      {/* Top Fixed Header */}
      <TopHeader
        user={user}
        onOpenSearch={onOpenSearch}
        onOpenWallet={onOpenWallet}
        onOpenProfile={onOpenProfile}
      />

      {/* Main Scrollable Content */}
      <main className="flex-1 flex flex-col pt-16 px-4">
        {/* Daily Bonus Card */}
        <div className="my-3">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2a2a2d] via-[#1f1f22] to-[#2a2a2d] p-3 border border-amber-400/20 shadow-lg">
            <div className="flex items-center justify-between gap-2 relative z-10">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400 shadow-[0_0_12px_rgba(239,193,52,0.35)]">
                  <Gift className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-amber-300">Bônus Diário</span>
                    <span className="bg-amber-400/20 text-amber-300 text-[9px] px-1.5 py-0.5 rounded-full uppercase font-black">
                      +50 Moedas
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate">
                    {user.dailyCheckedIn ? 'Moedas coletadas hoje!' : 'Assista 3 episódios para desbloquear seu prêmio'}
                  </p>
                </div>
              </div>

              <button
                id="claim-bonus-btn"
                disabled={user.dailyCheckedIn}
                onClick={onClaimDailyBonus}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition active:scale-95 shadow-md ${
                  user.dailyCheckedIn
                    ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-amber-400/20 hover:brightness-110'
                }`}
              >
                {user.dailyCheckedIn ? 'Coletado' : 'Coletar'}
              </button>
            </div>
          </div>
        </div>

        {/* Hero Cinema Poster Card */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.7)] bg-[#0e0e11] aspect-[4/5] border border-white/10 my-2">
          {/* Background Image */}
          <img
            src={heroDrama.heroPoster}
            alt={heroDrama.title}
            onClick={() => onOpenSeriesDetail(heroDrama)}
            className="w-full h-full object-cover object-center cursor-pointer transition-transform duration-700 hover:scale-105"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-[#131316]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#131316]/80 via-transparent to-transparent pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            <div className="flex items-center gap-1.5 bg-[#e50914] px-2.5 py-1 rounded-full shadow-[0_4px_16px_rgba(229,9,20,0.5)]">
              <Flame className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] text-white uppercase font-black tracking-wider">Top 1 Brasil</span>
            </div>
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-ping" />
              <span className="text-[10px] text-white font-semibold">NOVO EP. 85</span>
            </div>
          </div>

          {/* Hero Meta Content */}
          <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col z-10">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] font-bold text-[#e50914] bg-[#e50914]/20 border border-[#e50914]/30 px-2 py-0.5 rounded-full">
                {heroDrama.category}
              </span>
              <span className="text-xs text-zinc-300">• Vingança • {heroDrama.totalEpisodes} Episódios</span>
            </div>

            <h2
              onClick={() => onOpenSeriesDetail(heroDrama)}
              className="text-xl font-extrabold text-white tracking-tight font-display drop-shadow-md cursor-pointer hover:text-[#e50914] transition"
            >
              {heroDrama.title}
            </h2>

            <p className="text-xs text-zinc-300/90 line-clamp-2 my-2 leading-relaxed">
              {heroDrama.synopsis}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-2 w-full mt-1">
              <button
                id="hero-watch-btn"
                onClick={() => onOpenSeriesDetail(heroDrama)}
                className="flex-1 h-11 rounded-full bg-[#e50914] hover:bg-[#ff1e27] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(229,9,20,0.5)] active:scale-98 transition"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Assistir Ep. 1 Grátis</span>
              </button>

              <button
                id="hero-bookmark-btn"
                onClick={() => onToggleBookmark(heroDrama.id)}
                className={`w-11 h-11 rounded-full border border-white/10 flex items-center justify-center transition active:scale-95 ${
                  user.savedDramaIds.includes(heroDrama.id)
                    ? 'bg-[#e50914]/20 border-[#e50914] text-[#e50914]'
                    : 'bg-black/60 text-zinc-300 hover:text-white'
                }`}
                aria-label="Salvar na Minha Lista"
              >
                {user.savedDramaIds.includes(heroDrama.id) ? (
                  <BookmarkCheck className="w-5 h-5 text-[#e50914]" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="w-full my-3 overflow-x-auto no-scrollbar -mx-4 px-4 flex items-center gap-2 py-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? 'bg-[#e50914] text-white font-bold shadow-[0_2px_12px_rgba(229,9,20,0.4)]'
                    : 'bg-[#1f1f22] text-zinc-400 hover:text-white border border-white/5 font-medium'
                }`}
              >
                {cat === 'Em Alta' && <span className="mr-1">🔥</span>}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Continuar Assistindo Section */}
        <section className="my-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#e50914] rounded-full" />
              <h3 className="text-base font-bold text-white tracking-tight font-display">Continuar Assistindo</h3>
            </div>
            <button
              onClick={() => onOpenSeriesDetail(dramas[0])}
              className="text-xs text-[#ff4d58] font-semibold hover:underline"
            >
              Ver Histórico
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
            {/* Card Retomada 1 */}
            <div
              onClick={() => onOpenSeriesDetail(dramas[0])}
              className="shrink-0 w-60 rounded-xl bg-[#1b1b1e] border border-white/5 overflow-hidden shadow-md group cursor-pointer active:scale-98 transition"
            >
              <div className="relative h-28 w-full bg-zinc-900">
                <CachedThumbnail
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6qYue1PLpUIuIr9r7AQ_kNSb24H8EjXYE12FDwzeo_Uaw4Of7vKnfxASTGBdsBnhfufikNoc09Qt7jUDwykLHjj7mcesoOwBjMYjG6bzWFOVANYMoLrUxd_CnhxlYOqlFX7gkgl85rtSML1lNb93BO7gv1ptusAxSO8fD4lMdVU8cQrc0tTHUhMFEKMPe2SGa9Be62aTRUz5Ql-92joheoRvrQDMmvMa2xkK_fB-abwKhNRWhjmeCGQ"
                  alt="O Segredo da Herdeira"
                  showBadge={true}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-[#e50914]/90 flex items-center justify-center text-white shadow-lg shadow-[#e50914]/50">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-1.5 right-2 text-[10px] font-mono bg-black/80 px-1.5 py-0.5 rounded text-zinc-300 z-10">
                  1:18 min
                </span>
              </div>
              <div className="p-2.5">
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-1.5">
                  <div className="h-full bg-[#e50914] rounded-full" style={{ width: '65%' }} />
                </div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-xs text-white font-bold truncate">O Segredo da Herdeira</h4>
                  <span className="text-[10px] text-[#ff8087] font-semibold shrink-0">Ep. 14/60</span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate">Ela descobre o falso noivo no altar</p>
              </div>
            </div>

            {/* Card Retomada 2 */}
            <div
              onClick={() => onOpenSeriesDetail(dramas[1] || dramas[0])}
              className="shrink-0 w-60 rounded-xl bg-[#1b1b1e] border border-white/5 overflow-hidden shadow-md group cursor-pointer active:scale-98 transition"
            >
              <div className="relative h-28 w-full bg-zinc-900">
                <CachedThumbnail
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN3GPtY4YzRBFU1703YclBOeDLvzmLSs3eRiGvvnyVvAWAinycH1lXGXzR3e-eI43CkChXGTdoTc3Mzf1k2Ms8f4CUbePxLWYkcftWzdGq2GOPpanp8QZ2NvgJS_JRx4npMX8pRnOXDewVKsRECMSDQc0UC8VQ5on_H9jxtAgNQbbqaRNStVd0D-1wB7qBxH1wmKRt1CNkgbOgpoiGL8IEj7qbeNRRxJbctgtBpdCcCXmTr6e-UrG6wA"
                  alt="A Vingança do CEO Tirano"
                  showBadge={true}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-[#e50914]/90 flex items-center justify-center text-white shadow-lg shadow-[#e50914]/50">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-1.5 right-2 text-[10px] font-mono bg-black/80 px-1.5 py-0.5 rounded text-zinc-300 z-10">
                  0:45 min
                </span>
              </div>
              <div className="p-2.5">
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-1.5">
                  <div className="h-full bg-[#e50914] rounded-full" style={{ width: '25%' }} />
                </div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-xs text-white font-bold truncate">A Vingança do CEO Tirano</h4>
                  <span className="text-[10px] text-[#ff8087] font-semibold shrink-0">Ep. 4/45</span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate">O contrato de 100 dias assinado</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ranking Popular Section (Top 1, 2, 3 with Giant Numbers) */}
        <section className="my-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-amber-400 rounded-full" />
              <h3 className="text-base font-bold text-white tracking-tight font-display">Ranking Popular</h3>
              <span className="bg-white/10 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full">HOJE</span>
            </div>
            <button
              onClick={onOpenSearch}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-0.5"
            >
              <span>Mais</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
            {dramas.slice(0, 3).map((drama, idx) => (
              <div
                key={drama.id}
                onClick={() => onOpenSeriesDetail(drama)}
                className="shrink-0 flex items-center relative w-44 cursor-pointer group active:scale-98 transition"
              >
                <div className="relative w-28 aspect-[9/16] rounded-xl overflow-hidden shadow-lg bg-[#1b1b1e] border border-white/10 z-10 shrink-0">
                  <img
                    src={drama.verticalPoster}
                    alt={drama.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-1.5 left-1.5 bg-[#e50914] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow">
                    TOP {idx + 1}
                  </div>
                  <div className="absolute bottom-2 inset-x-2">
                    <p className="text-[11px] text-white font-bold line-clamp-1">{drama.title}</p>
                    <p className="text-[9px] text-amber-300 font-semibold">{drama.totalEpisodes} Episódios</p>
                  </div>
                </div>
                <span className="text-[88px] font-black leading-none text-zinc-700/60 select-none -ml-4 z-0 tracking-tighter drop-shadow-lg font-display">
                  {idx + 1}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Destaques Imperdíveis (Grid / Shelf) */}
        <section className="my-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#e50914] rounded-full" />
              <h3 className="text-base font-bold text-white tracking-tight font-display">Destaques Imperdíveis</h3>
            </div>
            <button
              onClick={onOpenSearch}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-0.5"
            >
              <span>Novos Hoje</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {dramas.map((drama) => (
              <div
                key={drama.id}
                onClick={() => onOpenSeriesDetail(drama)}
                className="flex flex-col cursor-pointer group active:scale-98 transition"
              >
                <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-[#1b1b1e] border border-white/5 shadow-md">
                  <img
                    src={drama.verticalPoster}
                    alt={drama.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-black/70 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      EP. {drama.totalEpisodes}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-[#e50914]/80 backdrop-blur-sm text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                      HOT
                    </span>
                  </div>
                  <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-zinc-300 text-[10px]">
                    <span className="font-bold text-white">👁 {drama.views}</span>
                    <span className="text-amber-300 font-semibold">★ {drama.rating}</span>
                  </div>
                </div>
                <div className="pt-1.5 flex flex-col">
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#e50914] transition">
                    {drama.title}
                  </h4>
                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">{drama.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
