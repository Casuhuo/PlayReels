export type Screen =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'cadastro'
  | 'recuperar'
  | 'inicio'
  | 'paravoce'
  | 'recompensas'
  | 'minhalista'
  | 'perfil'
  | 'detalhe'
  | 'paywall'
  | 'carteira'
  | 'planos'
  | 'checkout'
  | 'definicoes'
  | 'pesquisa'
  | 'notificacoes';

export type MainTab = 'inicio' | 'paravoce' | 'recompensas' | 'minhalista' | 'perfil';

export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: string;
  isFree: boolean;
  coinPrice: number;
  thumbnail: string;
  subtitle: string;
  description: string;
}

export interface Drama {
  id: string;
  title: string;
  subtitle: string;
  genre: string;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: string;
  totalEpisodes: number;
  heroPoster: string;
  verticalPoster: string;
  synopsis: string;
  episodes: Episode[];
  views: string;
  isTop1?: boolean;
  isHot?: boolean;
  isVip?: boolean;
}

export interface CoinPackage {
  id: string;
  coins: number;
  priceMT: number;
  bonusText?: string;
  badge?: string;
  tag: string;
  desc: string;
  isPopular?: boolean;
  isBestValue?: boolean;
}

export interface VipPlan {
  id: string;
  title: string;
  period: string;
  priceMT: number;
  frequencyText: string;
  weeklyEquiv?: string;
  badge?: string;
  features: string[];
  isPopular?: boolean;
  isBestValue?: boolean;
}

export interface CheckoutItem {
  type: 'coins' | 'vip';
  title: string;
  priceMT: number;
  details: string;
  coinsToAdd?: number;
  originScreen?: Screen;
}

export interface UserProfile {
  name: string;
  email: string;
  coins: number;
  isVip: boolean;
  vipExpiry?: string;
  avatarUrl: string;
  savedDramaIds: string[];
  dailyCheckedIn: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  subtitle: string;
}
