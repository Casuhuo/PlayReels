import { useState } from 'react';
import { Screen, MainTab, Drama, Episode, CoinPackage, VipPlan, CheckoutItem, UserProfile } from './types';
import { DRAMAS, COIN_PACKAGES, VIP_PLANS, INITIAL_TRANSACTIONS, INITIAL_USER } from './data/mockData';
import { BottomTabBar } from './components/BottomTabBar';
import { NetworkBanner } from './components/NetworkBanner';
import { Toast, ToastData, ToastType } from './components/Toast';
import { useLocalCache } from './hooks/useLocalCache';
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { LoginScreen } from './screens/LoginScreen';
import { CadastroScreen } from './screens/CadastroScreen';
import { RecuperarSenhaScreen } from './screens/RecuperarSenhaScreen';
import { InicioScreen } from './screens/InicioScreen';
import { ParaVoceScreen } from './screens/ParaVoceScreen';
import { DetalheSerieScreen } from './screens/DetalheSerieScreen';
import { PaywallModal } from './screens/PaywallModal';
import { CarteiraScreen } from './screens/CarteiraScreen';
import { PlanosScreen } from './screens/PlanosScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { RecompensasScreen } from './screens/RecompensasScreen';
import { MinhaListaScreen } from './screens/MinhaListaScreen';
import { PerfilScreen } from './screens/PerfilScreen';
import { DefinicoesScreen } from './screens/DefinicoesScreen';
import { PesquisaScreen } from './screens/PesquisaScreen';

export default function App() {
  // Navigation & User state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('inicio');
  const [currentMainTab, setCurrentMainTab] = useState<MainTab>('inicio');
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>(['inicio']);

  // Data & Selection states
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [dramas] = useState<Drama[]>(DRAMAS);

  // Local storage caching for offline resilience & unstable network
  const { stats, isEffectiveOnline, isSimulatedOffline } = useLocalCache(dramas);

  // Top Toast Notification state
  const [toast, setToast] = useState<ToastData | null>(null);

  const triggerToast = (
    message: string,
    options?: { type?: ToastType; description?: string; duration?: number }
  ) => {
    setToast({
      id: `${Date.now()}-${Math.random()}`,
      message,
      description: options?.description,
      type: options?.type || 'success',
      duration: options?.duration || 3200
    });
  };

  const [activeDrama, setActiveDrama] = useState<Drama>(DRAMAS[0]);
  const [activeEpisodeNumber, setActiveEpisodeNumber] = useState<number>(1);
  const [unlockedEpisodeIds, setUnlockedEpisodeIds] = useState<string[]>(['ep-0', 'ep-1', 'ep-2', 'ep-3']);
  const [paywallEpisode, setPaywallEpisode] = useState<Episode | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  // Helper to push new screen onto history
  const navigateTo = (nextScreen: Screen) => {
    setNavigationHistory((prev) => [...prev, nextScreen]);
    setCurrentScreen(nextScreen);
    if (['inicio', 'paravoce', 'recompensas', 'minhalista', 'perfil'].includes(nextScreen)) {
      setCurrentMainTab(nextScreen as MainTab);
    }
  };

  // Helper to go back in history
  const navigateBack = () => {
    if (navigationHistory.length > 1) {
      const updatedHistory = [...navigationHistory];
      updatedHistory.pop();
      const prevScreen = updatedHistory[updatedHistory.length - 1];
      setNavigationHistory(updatedHistory);
      setCurrentScreen(prevScreen);
      if (['inicio', 'paravoce', 'recompensas', 'minhalista', 'perfil'].includes(prevScreen)) {
        setCurrentMainTab(prevScreen as MainTab);
      }
    } else {
      // Default fallback
      setCurrentScreen('inicio');
      setCurrentMainTab('inicio');
    }
  };

  // Switch Main Tabs from persistent bottom tab bar
  const handleSelectTab = (tab: MainTab) => {
    setCurrentMainTab(tab);
    navigateTo(tab);
  };

  // Bookmark Toggle with Top Toast Confirmation
  const handleToggleBookmark = (dramaId: string) => {
    setUser((prev) => {
      const isAlreadySaved = prev.savedDramaIds.includes(dramaId);
      const updatedList = isAlreadySaved
        ? prev.savedDramaIds.filter((id) => id !== dramaId)
        : [...prev.savedDramaIds, dramaId];

      const dramaObj = dramas.find((d) => d.id === dramaId);
      const title = dramaObj?.title ? `"${dramaObj.title}"` : 'Dorama';

      if (!isAlreadySaved) {
        triggerToast('Salvo na Minha Lista', {
          type: 'bookmark',
          description: `${title} foi adicionado aos seus favoritos.`
        });
      } else {
        triggerToast('Removido da Minha Lista', {
          type: 'info',
          description: `${title} foi retirado da sua lista.`
        });
      }

      return { ...prev, savedDramaIds: updatedList };
    });
  };

  // Claim Daily Bonus with Top Toast Confirmation
  const handleClaimDailyBonus = () => {
    if (!user.dailyCheckedIn) {
      setUser((prev) => ({
        ...prev,
        coins: prev.coins + 50,
        dailyCheckedIn: true
      }));
      setTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          title: 'Bônus Diário Coletado',
          date: 'Agora mesmo • Recompensa',
          amount: 50,
          type: 'credit',
          subtitle: 'Recompensa'
        },
        ...prev
      ]);
      triggerToast('Bônus coletado!', {
        type: 'bonus',
        description: '+50 moedas creditadas na sua carteira!'
      });
    } else {
      triggerToast('Bônus já coletado hoje!', {
        type: 'info',
        description: 'Volte amanhã para resgatar mais moedas gratuitas.'
      });
    }
  };

  // Claim Rewards Check-in with Top Toast Confirmation
  const handleClaimRewardsCheckIn = () => {
    if (!user.dailyCheckedIn) {
      setUser((prev) => ({
        ...prev,
        coins: prev.coins + 30,
        dailyCheckedIn: true
      }));
      setTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          title: 'Check-in Central de Recompensas',
          date: 'Agora mesmo • Missão',
          amount: 30,
          type: 'credit',
          subtitle: 'Missão'
        },
        ...prev
      ]);
      triggerToast('Bônus coletado!', {
        type: 'bonus',
        description: '+30 moedas creditadas do check-in diário!'
      });
    } else {
      triggerToast('Check-in já realizado hoje!', {
        type: 'info',
        description: 'Sua sequência de dias consecutivos continua ativa!'
      });
    }
  };

  // Open Series Detail
  const handleOpenSeriesDetail = (drama: Drama) => {
    setActiveDrama(drama);
    navigateTo('detalhe');
  };

  // Watch Episode -> Para Você
  const handleWatchEpisode = (epNumber: number) => {
    setActiveEpisodeNumber(epNumber);
    navigateTo('paravoce');
  };

  // Open Paywall Modal
  const handleOpenPaywall = (episode: Episode) => {
    setPaywallEpisode(episode);
  };

  // Unlock with Coins in Paywall
  const handleUnlockWithCoins = (episode: Episode) => {
    const cost = episode.coinPrice || 30;
    if (user.coins >= cost) {
      setUser((prev) => ({ ...prev, coins: prev.coins - cost }));
      setUnlockedEpisodeIds((prev) => [...prev, episode.id]);
      setTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          title: `Desbloqueio ${episode.title}`,
          date: 'Agora mesmo • Episódio',
          amount: -cost,
          type: 'debit',
          subtitle: 'Episódio'
        },
        ...prev
      ]);
      setPaywallEpisode(null);
      // Automatically proceed to watch unlocked episode in Para Você
      setActiveEpisodeNumber(episode.number);
      navigateTo('paravoce');
    } else {
      setPaywallEpisode(null);
      navigateTo('carteira');
    }
  };

  // Buy Coin Package -> Checkout
  const handleSelectPackageToCheckout = (pkg: CoinPackage) => {
    setCheckoutItem({
      type: 'coins',
      title: `${pkg.coins} Moedas PlayReels`,
      priceMT: pkg.priceMT,
      details: `${pkg.tag} • ${pkg.desc}`,
      coinsToAdd: pkg.coins,
      originScreen: currentScreen
    });
    navigateTo('checkout');
  };

  // Buy VIP Plan -> Checkout
  const handleSelectPlanToCheckout = (plan: VipPlan) => {
    setCheckoutItem({
      type: 'vip',
      title: `${plan.title}`,
      priceMT: plan.priceMT,
      details: `Passe VIP Ilimitado • ${plan.frequencyText}`,
      originScreen: currentScreen
    });
    navigateTo('checkout');
  };

  // Payment Success Handler
  const handlePaymentSuccess = (item: CheckoutItem) => {
    if (item.type === 'coins' && item.coinsToAdd) {
      setUser((prev) => ({ ...prev, coins: prev.coins + item.coinsToAdd! }));
      setTransactions((prev) => [
        {
          id: `tx-${Date.now()}`,
          title: `Recarga de Moedas (+${item.coinsToAdd})`,
          date: 'Agora mesmo • M-Pesa',
          amount: item.coinsToAdd!,
          type: 'credit',
          subtitle: `${item.priceMT} MT`
        },
        ...prev
      ]);
    } else if (item.type === 'vip') {
      setUser((prev) => ({ ...prev, isVip: true, vipExpiry: '15 Out 2026' }));
    }

    // Return to previous screen as requested in navigation map: "Sucesso → Continuar → Volta"
    navigateBack();
  };

  // Authentication Flows
  const handleLoginSuccess = (userEmail?: string) => {
    setIsLoggedIn(true);
    if (userEmail) {
      setUser((prev) => ({ ...prev, email: userEmail }));
    }
    navigateTo('inicio');
  };

  const handleSignupSuccess = (userName: string, userEmail: string) => {
    setIsLoggedIn(true);
    setUser((prev) => ({
      ...prev,
      name: userName,
      email: userEmail,
      coins: prev.coins + 50
    }));
    navigateTo('inicio');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigateTo('login');
  };

  // Determine if bottom tab bar should be shown
  const isMainScreen = ['inicio', 'paravoce', 'recompensas', 'minhalista', 'perfil'].includes(
    currentScreen
  );

  return (
    <div className="min-h-screen bg-[#131316] text-[#e5e1e6] flex flex-col font-sans selection:bg-[#e50914] selection:text-white relative">
      {/* Top Floating Toast Notification */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* Offline / Unstable Network Status Indicator */}
      {currentScreen !== 'splash' && currentScreen !== 'onboarding' && (
        <NetworkBanner
          isEffectiveOnline={isEffectiveOnline}
          isSimulated={isSimulatedOffline}
          cachedCount={stats.metadataCount}
          onOpenSettings={() => navigateTo('definicoes')}
        />
      )}

      {/* Screens Render Logic */}

      {/* SPLASH */}
      {currentScreen === 'splash' && (
        <SplashScreen
          isLoggedIn={isLoggedIn}
          onFinish={(dest) => navigateTo(dest)}
        />
      )}

      {/* ONBOARDING */}
      {currentScreen === 'onboarding' && (
        <OnboardingScreen
          onSkip={() => navigateTo('login')}
          onStart={() => navigateTo('cadastro')}
          onLogin={() => navigateTo('login')}
        />
      )}

      {/* LOGIN */}
      {currentScreen === 'login' && (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onForgotPassword={() => navigateTo('recuperar')}
          onGoToSignup={() => navigateTo('cadastro')}
          onBack={navigateBack}
        />
      )}

      {/* CADASTRO */}
      {currentScreen === 'cadastro' && (
        <CadastroScreen
          onSignupSuccess={handleSignupSuccess}
          onGoToLogin={() => navigateTo('login')}
          onBack={navigateBack}
        />
      )}

      {/* RECUPERAR SENHA */}
      {currentScreen === 'recuperar' && (
        <RecuperarSenhaScreen
          onBackToLogin={() => navigateTo('login')}
        />
      )}

      {/* INÍCIO */}
      {currentScreen === 'inicio' && (
        <InicioScreen
          user={user}
          dramas={dramas}
          onOpenSeriesDetail={handleOpenSeriesDetail}
          onOpenSearch={() => navigateTo('pesquisa')}
          onOpenWallet={() => navigateTo('carteira')}
          onOpenProfile={() => navigateTo('perfil')}
          onClaimDailyBonus={handleClaimDailyBonus}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* PARA VOCÊ (Player 9:16) */}
      {currentScreen === 'paravoce' && (
        <ParaVoceScreen
          user={user}
          drama={activeDrama}
          currentEpisodeNumber={activeEpisodeNumber}
          unlockedEpisodeIds={unlockedEpisodeIds}
          onOpenSeriesDetail={handleOpenSeriesDetail}
          onOpenPaywall={handleOpenPaywall}
          onOpenWallet={() => navigateTo('carteira')}
          onToggleBookmark={handleToggleBookmark}
          onShowToast={triggerToast}
        />
      )}

      {/* DETALHE DA SÉRIE */}
      {currentScreen === 'detalhe' && (
        <DetalheSerieScreen
          drama={activeDrama}
          user={user}
          unlockedEpisodeIds={unlockedEpisodeIds}
          onBack={navigateBack}
          onWatchEpisode={handleWatchEpisode}
          onOpenPaywall={handleOpenPaywall}
          onToggleBookmark={handleToggleBookmark}
          onShowToast={triggerToast}
        />
      )}

      {/* CARTEIRA */}
      {currentScreen === 'carteira' && (
        <CarteiraScreen
          user={user}
          packages={COIN_PACKAGES}
          transactions={transactions}
          onBack={navigateBack}
          onSelectPackageToCheckout={handleSelectPackageToCheckout}
          onGoToVipPlans={() => navigateTo('planos')}
        />
      )}

      {/* PLANOS VIP */}
      {currentScreen === 'planos' && (
        <PlanosScreen
          plans={VIP_PLANS}
          onBack={navigateBack}
          onSelectPlanToCheckout={handleSelectPlanToCheckout}
        />
      )}

      {/* CHECKOUT */}
      {currentScreen === 'checkout' && checkoutItem && (
        <CheckoutScreen
          item={checkoutItem}
          onBack={navigateBack}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* RECOMPENSAS */}
      {currentScreen === 'recompensas' && (
        <RecompensasScreen
          user={user}
          onClaimDailyCheckIn={handleClaimRewardsCheckIn}
          onGoToParaVoce={() => navigateTo('paravoce')}
          onGoToVipPlans={() => navigateTo('planos')}
          onGoToCheckoutPackage={handleSelectPackageToCheckout}
          onOpenSearch={() => navigateTo('pesquisa')}
          onOpenWallet={() => navigateTo('carteira')}
          onOpenProfile={() => navigateTo('perfil')}
          onShowToast={triggerToast}
        />
      )}

      {/* MINHA LISTA */}
      {currentScreen === 'minhalista' && (
        <MinhaListaScreen
          user={user}
          allDramas={dramas}
          onOpenSeriesDetail={handleOpenSeriesDetail}
          onGoToInicio={() => navigateTo('inicio')}
          onOpenSearch={() => navigateTo('pesquisa')}
          onOpenWallet={() => navigateTo('carteira')}
          onOpenProfile={() => navigateTo('perfil')}
          onRemoveFromList={handleToggleBookmark}
        />
      )}

      {/* PERFIL */}
      {currentScreen === 'perfil' && (
        <PerfilScreen
          user={user}
          onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
          onGoToWallet={() => navigateTo('carteira')}
          onGoToVipPlans={() => navigateTo('planos')}
          onGoToSettings={() => navigateTo('definicoes')}
          onLogout={handleLogout}
        />
      )}

      {/* DEFINIÇÕES */}
      {currentScreen === 'definicoes' && (
        <DefinicoesScreen
          dramas={dramas}
          onBack={navigateBack}
          onLogout={handleLogout}
          onShowToast={triggerToast}
        />
      )}

      {/* PESQUISA */}
      {currentScreen === 'pesquisa' && (
        <PesquisaScreen
          dramas={dramas}
          onBack={navigateBack}
          onSelectDrama={handleOpenSeriesDetail}
        />
      )}

      {/* PAYWALL MODAL (Can open from Para Você, Detalhe da Série, etc.) */}
      {paywallEpisode && (
        <PaywallModal
          episode={paywallEpisode}
          user={user}
          onClose={() => setPaywallEpisode(null)}
          onUnlockWithCoins={handleUnlockWithCoins}
          onGoToVipPlans={() => {
            setPaywallEpisode(null);
            navigateTo('planos');
          }}
          onGoToWallet={() => {
            setPaywallEpisode(null);
            navigateTo('carteira');
          }}
        />
      )}

      {/* Persistent Bottom Tab Bar on main screens */}
      {isMainScreen && (
        <BottomTabBar
          currentTab={currentMainTab}
          onSelectTab={handleSelectTab}
        />
      )}
    </div>
  );
}
