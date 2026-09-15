import React, { useState, useEffect } from 'react';
import { getCachedThumbnail, createAndCacheThumbnail, generateFallbackSvgDataUrl } from '../services/localCache';
import { WifiOff, Database } from 'lucide-react';

interface CachedThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  showBadge?: boolean;
  priority?: boolean;
}

export const CachedThumbnail: React.FC<CachedThumbnailProps> = ({
  src,
  alt,
  className = '',
  showBadge = false,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    const cached = getCachedThumbnail(src);
    return cached || src;
  });
  const [isFromCache, setIsFromCache] = useState<boolean>(() => {
    return Boolean(getCachedThumbnail(src));
  });
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(!getCachedThumbnail(src));

  useEffect(() => {
    let isMounted = true;
    const cached = getCachedThumbnail(src);

    if (cached) {
      setCurrentSrc(cached);
      setIsFromCache(true);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setCurrentSrc(src);
      // Asynchronously cache this thumbnail for future offline / unstable network visits
      createAndCacheThumbnail(src)
        .then((cachedDataUrl) => {
          if (isMounted && cachedDataUrl) {
            setIsFromCache(true);
          }
        })
        .catch(() => {
          // ignore background cache failure
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [src]);

  const handleError = () => {
    const cached = getCachedThumbnail(src);
    if (cached && currentSrc !== cached) {
      setCurrentSrc(cached);
      setIsFromCache(true);
    } else {
      setHasError(true);
      setCurrentSrc(generateFallbackSvgDataUrl(alt));
    }
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden bg-[#18181c] ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-80' : 'opacity-100'
        }`}
      />

      {/* Offline / Cache Indicator Badge */}
      {showBadge && isFromCache && (
        <span
          title="Miniatura carregada do cache local (localStorage)"
          className="absolute top-1 right-1 z-10 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-emerald-500/40 text-[9px] font-mono font-bold text-emerald-400 flex items-center gap-1 shadow"
        >
          <Database className="w-2.5 h-2.5 text-emerald-400" />
          <span>CACHE</span>
        </span>
      )}

      {hasError && (
        <div className="absolute inset-0 bg-zinc-900/80 flex flex-col items-center justify-center p-2 text-center">
          <WifiOff className="w-5 h-5 text-zinc-500 mb-1" />
          <span className="text-[9px] text-zinc-400 font-medium line-clamp-1">Offline</span>
        </div>
      )}
    </div>
  );
};
