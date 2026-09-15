import React, { useState } from 'react';
import { ArrowLeft, Search, X, Flame, Star, Play } from 'lucide-react';
import { Drama } from '../types';

interface PesquisaScreenProps {
  dramas: Drama[];
  onBack: () => void;
  onSelectDrama: (drama: Drama) => void;
}

export const PesquisaScreen: React.FC<PesquisaScreenProps> = ({
  dramas,
  onBack,
  onSelectDrama
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const trendingKeywords = [
    'Bilionário Mascarado',
    'Vingança',
    'Casamento Secreto',
    'Herdeira',
    'CEO Tirano',
    'Romance Proibido'
  ];

  const handleChipClick = (keyword: string) => {
    setSelectedTag(keyword === selectedTag ? null : keyword);
    setQuery(keyword === selectedTag ? '' : keyword);
  };

  const filteredDramas = dramas.filter((d) => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return true;
    return (
      d.title.toLowerCase().includes(searchTerm) ||
      d.genre.toLowerCase().includes(searchTerm) ||
      d.category.toLowerCase().includes(searchTerm) ||
      d.tags.some((t) => t.toLowerCase().includes(searchTerm)) ||
      d.synopsis.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-[#131316] text-white flex flex-col pb-24 max-w-md mx-auto select-none">
      {/* Top Search Header */}
      <header className="sticky top-0 z-40 bg-[#131316]/95 backdrop-blur-xl border-b border-white/5 pt-safe">
        <div className="h-16 px-4 flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-zinc-300 hover:text-white active:bg-white/10 transition shrink-0"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Search Input Bar */}
          <div className="flex-1 relative flex items-center rounded-2xl bg-[#1f1f24] border border-white/10 focus-within:border-[#e50914] focus-within:bg-[#25252b] transition">
            <Search className="absolute left-3.5 text-zinc-400 w-4 h-4 pointer-events-none" />
            <input
              id="search-input-field"
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título, bilionário, vingança..."
              className="w-full bg-transparent py-2.5 pl-10 pr-9 text-xs text-white placeholder:text-zinc-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 text-zinc-400 hover:text-white p-1"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-3 space-y-4">
        {/* Trending Chips: Chip -> Resultados */}
        <div>
          <div className="flex items-center gap-1.5 mb-2.5 text-xs text-zinc-400 font-bold uppercase tracking-wider font-display">
            <Flame className="w-3.5 h-3.5 text-[#e50914]" />
            <span>Buscas Mais Populares</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {trendingKeywords.map((tag) => {
              const isSelected = selectedTag === tag || query.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  id={`chip-${tag.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => handleChipClick(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs transition active:scale-95 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#e50914] text-white font-bold shadow-[0_2px_10px_rgba(229,9,20,0.4)]'
                      : 'bg-[#1b1b1e] text-zinc-300 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-display">
            {query ? `Resultados para "${query}"` : 'Todos os Doramas'}
          </span>
          <span className="text-xs text-zinc-400 font-mono">
            {filteredDramas.length} {filteredDramas.length === 1 ? 'série' : 'séries'}
          </span>
        </div>

        {/* Results Grid: Resultado -> Detalhe */}
        {filteredDramas.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#1b1b1e] border border-white/5 flex items-center justify-center text-zinc-500 mb-2">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-white">Nenhum dorama encontrado</p>
            <p className="text-[11px] text-zinc-400 max-w-xs mt-1">
              Tente buscar por outras palavras-chave como "CEO", "Romance" ou "Vingança".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredDramas.map((drama) => (
              <div
                key={drama.id}
                id={`search-result-${drama.id}`}
                onClick={() => onSelectDrama(drama)}
                className="flex flex-col cursor-pointer group active:scale-98 transition rounded-2xl bg-[#1b1b1e] border border-white/5 overflow-hidden shadow-md"
              >
                <div className="relative aspect-[9/14] w-full bg-zinc-900 overflow-hidden">
                  <img
                    src={drama.verticalPoster}
                    alt={drama.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-2 left-2 bg-[#e50914] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                    {drama.category}
                  </div>

                  <div className="absolute bottom-2 inset-x-2 flex items-center justify-between">
                    <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>{drama.rating}</span>
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#e50914] flex items-center justify-center text-white shadow">
                      <Play className="w-3 h-3 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-2.5">
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#e50914] transition">
                    {drama.title}
                  </h4>
                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                    {drama.totalEpisodes} Episódios • {drama.views}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
