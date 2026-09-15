import { useState, useEffect, useCallback } from 'react';
import { Drama, Episode } from '../types';
import {
  getCacheStats,
  clearLocalCache,
  preloadAllThumbnails,
  getSimulatedOffline,
  setSimulatedOffline,
  getCachedEpisodesForDrama,
  cacheEpisodeMetadata,
  initLocalCache,
  CacheStats
} from '../services/localCache';

export function useLocalCache(dramas?: Drama[]) {
  const [stats, setStats] = useState<CacheStats>(() => getCacheStats());
  const [isSimulatedOffline, setIsSimulatedOfflineState] = useState<boolean>(() => getSimulatedOffline());
  const [isRealOnline, setIsRealOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [isPreloading, setIsPreloading] = useState<boolean>(false);
  const [preloadProgress, setPreloadProgress] = useState<number>(0);
  const [preloadMessage, setPreloadMessage] = useState<string>('');

  // Effective online status: false if real offline or simulated offline
  const isEffectiveOnline = isRealOnline && !isSimulatedOffline;

  const refreshStats = useCallback(() => {
    setStats(getCacheStats());
  }, []);

  // Sync cache on mount if dramas provided
  useEffect(() => {
    if (dramas && dramas.length > 0) {
      initLocalCache(dramas);
      refreshStats();
    }
  }, [dramas, refreshStats]);

  // Listen to browser network changes
  useEffect(() => {
    const handleOnline = () => setIsRealOnline(true);
    const handleOffline = () => setIsRealOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleClear = useCallback(() => {
    clearLocalCache();
    refreshStats();
  }, [refreshStats]);

  const handleToggleSimulatedOffline = useCallback(() => {
    const nextVal = !isSimulatedOffline;
    setSimulatedOffline(nextVal);
    setIsSimulatedOfflineState(nextVal);
  }, [isSimulatedOffline]);

  const handlePreloadAll = useCallback(
    async (catalogDramas: Drama[]) => {
      if (isPreloading) return;
      setIsPreloading(true);
      setPreloadProgress(0);
      setPreloadMessage('Iniciando sincronização...');

      try {
        initLocalCache(catalogDramas);
        await preloadAllThumbnails(catalogDramas, (pct, msg) => {
          setPreloadProgress(pct);
          setPreloadMessage(msg);
        });
        refreshStats();
        setPreloadMessage('Cache local atualizado com sucesso!');
      } catch (err) {
        console.error('[useLocalCache] Preload failed:', err);
        setPreloadMessage('Erro ao pré-carregar cache.');
      } finally {
        setTimeout(() => {
          setIsPreloading(false);
          setPreloadProgress(0);
        }, 1200);
      }
    },
    [isPreloading, refreshStats]
  );

  return {
    stats,
    isRealOnline,
    isSimulatedOffline,
    isEffectiveOnline,
    isPreloading,
    preloadProgress,
    preloadMessage,
    refreshStats,
    clearCache: handleClear,
    toggleSimulatedOffline: handleToggleSimulatedOffline,
    preloadAll: handlePreloadAll,
    getCachedEpisodes: getCachedEpisodesForDrama,
    cacheEpisodes: cacheEpisodeMetadata
  };
}
