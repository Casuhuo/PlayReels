import { Drama, Episode } from '../types';

// Storage keys
const EPISODE_METADATA_CACHE_KEY = 'playreels_episode_metadata_v1';
const THUMBNAIL_CACHE_KEY = 'playreels_thumbnail_cache_v1';
const SIMULATED_OFFLINE_KEY = 'playreels_simulated_offline_v1';

export interface CachedEpisodeRecord {
  dramaId: string;
  episode: Episode;
  cachedAt: number;
}

export interface ThumbnailCacheRecord {
  dataUrl: string;
  sourceUrl: string;
  cachedAt: number;
  width?: number;
  height?: number;
}

export interface CacheStats {
  metadataCount: number;
  thumbnailCount: number;
  sizeBytes: number;
  formattedSize: string;
  lastUpdated: string | null;
}

/**
 * Safe local storage reader
 */
function getStorageItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    console.warn(`[LocalCache] Failed to read ${key} from localStorage:`, err);
    return null;
  }
}

/**
 * Safe local storage writer
 */
function setStorageItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`[LocalCache] Failed to write ${key} to localStorage (quota or disabled):`, err);
    return false;
  }
}

/**
 * Safe local storage remover
 */
function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[LocalCache] Failed to remove ${key}:`, err);
  }
}

/**
 * Read all episode metadata map from localStorage
 * Map: dramaId -> Episode[]
 */
export function getAllCachedEpisodeMetadata(): Record<string, Episode[]> {
  const raw = getStorageItem(EPISODE_METADATA_CACHE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/**
 * Get cached episodes for a specific drama
 */
export function getCachedEpisodesForDrama(dramaId: string): Episode[] | null {
  const all = getAllCachedEpisodeMetadata();
  return all[dramaId] || null;
}

/**
 * Get a specific episode from the cache
 */
export function getCachedEpisode(dramaId: string, episodeId: string): Episode | null {
  const episodes = getCachedEpisodesForDrama(dramaId);
  if (!episodes) return null;
  return episodes.find(e => e.id === episodeId) || null;
}

/**
 * Cache episode metadata for a single drama
 */
export function cacheEpisodeMetadata(dramaId: string, episodes: Episode[]): void {
  const all = getAllCachedEpisodeMetadata();
  all[dramaId] = episodes;
  setStorageItem(EPISODE_METADATA_CACHE_KEY, JSON.stringify(all));
}

/**
 * Batch cache all dramas and their episodes
 */
export function initLocalCache(dramas: Drama[]): void {
  const all = getAllCachedEpisodeMetadata();
  let updated = false;

  dramas.forEach((drama) => {
    if (!all[drama.id] || all[drama.id].length !== drama.episodes.length) {
      all[drama.id] = drama.episodes;
      updated = true;
    }
  });

  if (updated || Object.keys(all).length === 0) {
    setStorageItem(EPISODE_METADATA_CACHE_KEY, JSON.stringify(all));
  }
}

/**
 * Read all thumbnail records from localStorage
 * Map: urlOrId -> ThumbnailCacheRecord
 */
export function getAllCachedThumbnails(): Record<string, ThumbnailCacheRecord> {
  const raw = getStorageItem(THUMBNAIL_CACHE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/**
 * Get cached thumbnail dataUrl
 */
export function getCachedThumbnail(url: string): string | null {
  if (!url) return null;
  const all = getAllCachedThumbnails();
  const record = all[url];
  return record ? record.dataUrl : null;
}

/**
 * Store a thumbnail in localStorage
 */
export function saveThumbnailToCache(sourceUrl: string, dataUrl: string): void {
  if (!sourceUrl || !dataUrl) return;
  const all = getAllCachedThumbnails();

  all[sourceUrl] = {
    dataUrl,
    sourceUrl,
    cachedAt: Date.now()
  };

  const serialized = JSON.stringify(all);
  const success = setStorageItem(THUMBNAIL_CACHE_KEY, serialized);

  // If quota reached, purge oldest 30% entries and try once more
  if (!success) {
    const keys = Object.keys(all);
    if (keys.length > 5) {
      keys.sort((a, b) => (all[a].cachedAt || 0) - (all[b].cachedAt || 0));
      const removeCount = Math.ceil(keys.length * 0.3);
      for (let i = 0; i < removeCount; i++) {
        delete all[keys[i]];
      }
      setStorageItem(THUMBNAIL_CACHE_KEY, JSON.stringify(all));
    }
  }
}

/**
 * Helper to compress and cache image from URL using HTML Canvas
 * Creates a lightweight dataURL suitable for offline display
 */
export function createAndCacheThumbnail(sourceUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    // Check if already in cache
    const existing = getCachedThumbnail(sourceUrl);
    if (existing) {
      resolve(existing);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        // Optimal thumbnail size for fast mobile cache
        const width = 160;
        const height = Math.round((img.height / img.width) * width) || 90;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // High compression JPEG
        const dataUrl = canvas.toDataURL('image/jpeg', 0.65);
        saveThumbnailToCache(sourceUrl, dataUrl);
        resolve(dataUrl);
      } catch (err) {
        // Fallback: in case canvas tainted by CORS, generate an aesthetic placeholder thumbnail
        console.warn(`[LocalCache] Canvas export failed for ${sourceUrl}, generating styled fallback:`, err);
        const fallback = generateFallbackSvgDataUrl(sourceUrl);
        saveThumbnailToCache(sourceUrl, fallback);
        resolve(fallback);
      }
    };

    img.onerror = () => {
      // Offline or network error: provide a styled fallback
      const fallback = generateFallbackSvgDataUrl(sourceUrl);
      saveThumbnailToCache(sourceUrl, fallback);
      resolve(fallback);
    };

    img.src = sourceUrl;
  });
}

/**
 * Generate a lightweight fallback SVG data URL for offline thumbnail preview
 */
export function generateFallbackSvgDataUrl(label = 'Episódio'): string {
  const safeLabel = (label.split('/').pop()?.slice(0, 14) || 'PlayReels').replace(/[<>&"]/g, '');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="90" viewBox="0 0 160 90">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1f1f26"/>
        <stop offset="100%" stop-color="#121216"/>
      </linearGradient>
    </defs>
    <rect width="160" height="90" fill="url(#g)"/>
    <circle cx="80" cy="40" r="16" fill="#e50914" opacity="0.8"/>
    <polygon points="76,32 76,48 88,40" fill="#ffffff"/>
    <text x="80" y="74" fill="#a1a1aa" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">OFFLINE CACHE</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Preload and cache thumbnails for a set of dramas
 */
export async function preloadAllThumbnails(
  dramas: Drama[],
  onProgress?: (progressPct: number, currentTitle: string) => void
): Promise<{ totalCached: number; alreadyCached: number }> {
  const allThumbnails = new Set<string>();

  dramas.forEach((drama) => {
    if (drama.heroPoster) allThumbnails.add(drama.heroPoster);
    if (drama.verticalPoster) allThumbnails.add(drama.verticalPoster);
    drama.episodes.forEach((ep) => {
      if (ep.thumbnail) allThumbnails.add(ep.thumbnail);
    });
  });

  const urls = Array.from(allThumbnails);
  let processed = 0;
  let cachedCount = 0;

  for (const url of urls) {
    const existing = getCachedThumbnail(url);
    if (!existing) {
      await createAndCacheThumbnail(url);
      cachedCount++;
    }
    processed++;
    if (onProgress) {
      const pct = Math.round((processed / urls.length) * 100);
      onProgress(pct, `Cacheando item ${processed} de ${urls.length}`);
    }
  }

  return {
    totalCached: urls.length,
    alreadyCached: urls.length - cachedCount
  };
}

/**
 * Get statistics about local cache usage
 */
export function getCacheStats(): CacheStats {
  const metaRaw = getStorageItem(EPISODE_METADATA_CACHE_KEY) || '';
  const thumbRaw = getStorageItem(THUMBNAIL_CACHE_KEY) || '';

  const metaSize = new Blob([metaRaw]).size;
  const thumbSize = new Blob([thumbRaw]).size;
  const totalBytes = metaSize + thumbSize;

  let metadataCount = 0;
  try {
    const metaParsed = JSON.parse(metaRaw);
    Object.values(metaParsed).forEach((eps: any) => {
      if (Array.isArray(eps)) metadataCount += eps.length;
    });
  } catch {
    metadataCount = 0;
  }

  let thumbnailCount = 0;
  try {
    const thumbParsed = JSON.parse(thumbRaw);
    thumbnailCount = Object.keys(thumbParsed).length;
  } catch {
    thumbnailCount = 0;
  }

  let formattedSize = '0 KB';
  if (totalBytes > 1024 * 1024) {
    formattedSize = `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`;
  } else if (totalBytes > 0) {
    formattedSize = `${(totalBytes / 1024).toFixed(1)} KB`;
  }

  return {
    metadataCount,
    thumbnailCount,
    sizeBytes: totalBytes,
    formattedSize,
    lastUpdated: metadataCount > 0 || thumbnailCount > 0 ? 'Ativo e sincronizado' : null
  };
}

/**
 * Clear all cached data
 */
export function clearLocalCache(): void {
  removeStorageItem(EPISODE_METADATA_CACHE_KEY);
  removeStorageItem(THUMBNAIL_CACHE_KEY);
}

/**
 * Simulated offline / unstable network mode setting
 */
export function getSimulatedOffline(): boolean {
  return getStorageItem(SIMULATED_OFFLINE_KEY) === 'true';
}

export function setSimulatedOffline(enabled: boolean): void {
  setStorageItem(SIMULATED_OFFLINE_KEY, enabled ? 'true' : 'false');
}
