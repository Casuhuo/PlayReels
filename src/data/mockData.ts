import { Drama, CoinPackage, VipPlan, Transaction, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Carlito Huo',
  email: 'carlitoaugustohuo@gmail.com',
  coins: 150,
  isVip: true,
  vipExpiry: '15 Out 2026',
  avatarUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UEM5gOJv-ox3iZhMz0FrR2ngEaL_4EWFpUK28bSA69bpdCYhCRJ8GAcpdJw3vZcOANS6TI-jeaFON18IFBBEIwlb1yIw3_rrPTjA56DMoM0gZLXK0t2NjiDIIwrjqkDgqL-EuYGQewhXhRYb1uBtx1p_wYy72FWbk4snq6-ajPOc9Px86ysyFgtiEb16XywSe7CX-afJ1rhdtKFvWiLAA58Z1jj27LE4uIiJehuVDcVnzQ_eV6HAC4qlKN-oAiePy76A3-nd2quQ',
  savedDramaIds: ['ouro-e-cinza', 'amor-sob-contrato', 'guarda-costas-amor'],
  dailyCheckedIn: false,
};

export const OURO_E_CINZA_EPISODES = [
  {
    id: 'ep-0',
    number: 0,
    title: 'Trailer Oficial',
    duration: '0:45',
    isFree: true,
    coinPrice: 0,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6DkEseuOsEdDw8IG9BoBlvv9OlVuGThd1mFriqNqPHHeTUxqCYLVa4CSzRfmqgPzge3w628y53pTA2ERXy5kTiDNsm_Qp-8mzS0eSkKbxeP7oNJ8FhA11Ullac-mGq3Fjz7e5wgGM_aW7xbXc9q26AvNvEGOqJlcSASA3WP-LQYzw2ERZOkfuaLsgSD10Dcv0B4ZhC0XMAPDA3zkmTDIzyxCkbOYm1vwkqIEqXbOAX4b6JgYwhZwx4A',
    subtitle: '«O encontro proibido que mudou todo o império de Seul.»',
    description: 'O encontro que mudou todo o império de Seul.'
  },
  {
    id: 'ep-1',
    number: 1,
    title: 'EP 1 · O Pacto',
    duration: '02:14',
    isFree: true,
    coinPrice: 0,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcGNxDnh2mpyselzpmhVRRc5Yb_tjXUBwBtLr-JcJ5ia7SgZOOdPwK0bTHqhWmleYoqotTj8MlelUpScAMLCvdwTLWck2krNd92NKJZxa3SFLZpcRSZqFRKdnhMSw04vCETnA1ofzYfDfmvLrimjQyciai1K-xdv0VEZuTO6qzCBtT4DglhYGZUta5l7w-H1rD6vZOGBFKJYz4hGYILt4tn_VPnWPP0JDcwIGniBnLqb8L5akFjDFnbg',
    subtitle: '«Se pensas que vou aceitar calada este casamento arranjado, estás muito enganado.»',
    description: 'Uma proposta indecente no topo do arranha-céu.'
  },
  {
    id: 'ep-2',
    number: 2,
    title: 'EP 2 · Máscaras de Ouro',
    duration: '01:58',
    isFree: true,
    coinPrice: 0,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSfJyfxKY0VKcfr-KTgeqq1wN5kX2VRIXv1Hm6lHLYtr5mXyFaJ167w5OjyxoSr7bz-IzYOfiX4SVfy7cZaTTtLzhs9dXXgwFYXp6KO1S2pHW0bWvQdakd2o1hsw_k-FHSP38T3G9FEwrk6cZU6MfO1AV3Y_JIqA29yok2daRHOiaKoNkhxc7S3JgpgmJ4CXZxt7lXkb3j_xCrw7ARhfU7hRWgcxSiXOPJJRikiiq7G9Go_LZnwJon-Q',
    subtitle: '«Ninguém nesta mansão pode desconfiar que o nosso amor é uma farsa.»',
    description: 'O primeiro banquete na mansão dos Park.'
  },
  {
    id: 'ep-3',
    number: 3,
    title: 'EP 3 · Segredos no Cofre',
    duration: '02:30',
    isFree: true,
    coinPrice: 0,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt5SZeIRnLOqxjd0WWawuG3Ajiq79CtHLz7OaSptKid2DXMzvg62qhMZ6C92bt1mRN_q6S04hyJ1oM22A1BAWNMZhVHLaIqIUbOyE-mQIfuUFubgMUc3GchEMEFeF1y9B7AkuY5OC9UzQ2Y2JjquAsHqbWoxuOtm2D4HW7aFa_jn4Q_7bPf1PzHqJ0XMAqQySFDwCGsY8jhnNArn1DCMwowwQ11YWTVkNVANCQrXgKTKHE0hVxh3B9Pg',
    subtitle: '«Se pensas que vou assinar isso, estás muito enganado.»',
    description: 'Nem todo diamante brilha com pureza.'
  },
  {
    id: 'ep-4',
    number: 4,
    title: 'EP 4 · A Traição Revelada',
    duration: '02:15',
    isFree: false,
    coinPrice: 30,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5ImbdofvDpLvR2vSqLlgQVfA9Ph21MZT1SS1fGk_RDnuILdUjXWKCqaK2qNPOcsLxUmDts6XtOMDFL5MCi0AI0nzZF781m3QKWR3UtwiY2hDb5cSlqns9u-9kLKbaZC_tJ91UvkLUgyZOD6xMoK1ph2gbbyb7CXA2-2fAqqBYWmCTBWozsF3fxYBmURRAN2t99xR3qRAfwdF3H0ED3e9CxrJg73TAHF2OiaoVw5HqMq14nOCVLtyv-g',
    subtitle: '«O testamento nunca foi do teu pai... foi sempre dela!»',
    description: 'Um colar roubado e uma confissão inesperada.'
  },
  {
    id: 'ep-5',
    number: 5,
    title: 'EP 5 · A Valsa dos Inimigos',
    duration: '02:22',
    isFree: false,
    coinPrice: 30,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ9_PYOvAuIzZ8zK8TEZgYQs8HIyCtU0iSOISVscrRL00X0riOuMHcWXT3Iu2VAyqY3sbI3q1v4AJR9CFd0V0pLQUpCU3e1FZgsTjh7XfXbZZ_gkq7rtak3yPVWn4cXS4J58FdZPO9qnttktWfRMQjQk8Weg9rSqvp55AxT0kmP5q5r0BAeMyxF9KMH8YiGnP8INN3XE0M51StP70tAJINPri9W8FNE6I_fxBeXye8ksJdiI1F_kr2jA',
    subtitle: '«Dança comigo até que o império deles queime até às cinzas.»',
    description: 'Olhares em chamas na presença da matriarca.'
  }
];

export const DRAMAS: Drama[] = [
  {
    id: 'ouro-e-cinza',
    title: 'Ouro e Cinza',
    subtitle: '@OuroECinza',
    genre: 'Drama Romântico',
    category: 'Romance Proibido',
    tags: ['Romance Proibido', 'Vingança', 'Bilionário'],
    rating: 4.9,
    reviewCount: '128k',
    totalEpisodes: 15,
    heroPoster: 'https://lh3.googleusercontent.com/aida/AEtjO1Vfd4gY8-yA4FROcPfA4pVhCPKA1ZL4ouz8BDvRvBujkk6MQLwNoyR9S2c0n-vuR_6TlfyY6Wf9L9OH4nKPHBiNG7ajxnAZOKLRMjqo3W_uQ45aCtu5Ao-rOL8HhWzgWA-b2gKPwD9CGma4jDcQ3maiNNuUTZ2sbLUflKb0pItet4pJeMYTF9xsm9x8sceYnV1T8ue_66Xa1Q7nNdjMjVbJrBTiKmq-6uOcW_2L-9V7I2sK-qHh47kV7Mc',
    verticalPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIlVv7swCruNXFJnBtYVVwMImKuZveOtXh1fnb1C87Fk8O6sk3v8ZnFjJcK6N1D6s29OqUBs7arE7_hampA2Jw2Ec7746QiCyWsRFiIdzziiB64AhVKsqFkeW2ZWCqCp9rNSV7EvRtzj6XaCgOpF61iKZS8VpU6Rq3aY7_yd4Fx51HiFmBJT8_YEXTWG3IqHyRVPREPa9kFbY9vliJ7xUiw7Q4gLNNHPKUf3osY8y56nMGStyd3ciKgQ',
    synopsis: 'Em um mundo implacável da elite corporativa, segredos obscuros e alianças bilionárias se desmoronam quando Isabella descobre que seu falso casamento com o herdeiro Park Dong-wook guarda uma dívida de sangue jamais paga.',
    episodes: OURO_E_CINZA_EPISODES,
    views: '4.9M',
    isTop1: true,
    isHot: true
  },
  {
    id: 'retorno-bilionario-mascarado',
    title: 'O Retorno do Bilionário Mascarado',
    subtitle: '@BilionarioMascarado',
    genre: 'Romance Proibido',
    category: 'CEO & Bilionários',
    tags: ['Vingança', 'Bilionários', 'Casamento Secreto'],
    rating: 4.8,
    reviewCount: '95k',
    totalEpisodes: 85,
    heroPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU3H3UU_BxV9mffs2pFzXR9l5j4GPLjQEd5I1wkwjUnAspWtdKUWtRvs9G8SUVAr4E61NyAL3VG5XqII5bQDm0yPhHC6MD0nNwjxJekpYx8RFoo7o-UYlALkEYOze0hHtKsy1wawL4knaRxhNSbL_HwK6s2U5FcKpIpcgc2jdBFDk5_16988RtOGxm9ZQujLkLph6sFt8VESLiObbljNc5iQqu0urlKd_W-zB_HsAIMbcxN0_RvfHtww',
    verticalPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWm70IAmvwUXP8tuOY5eP1bFNmIvwwZYXd3q2mBtvi4jB60-NT8k_0os8uF4xrP1YmM3icTK9i8myqoHPTmVQhZSpmgaO87E5MlLRhU8hpnQlzQNVr_334dfWA6qLi9JRzS-CxhNHnxl5-MXzzUu3ztAivgO2cGfv-kKb7U61Mgb4s-mnkfnvdbQcwOkrA7yj_dSBKO6H-a11wgF7XfcLX46gWIVxzVPkKPMhSyeZzDnZj172UTaWhyg',
    synopsis: 'Humilhado há 5 anos, ele ressurge dono da maior corporação do país com uma máscara para reconquistar sua amada e desmascarar seus rivais.',
    episodes: OURO_E_CINZA_EPISODES,
    views: '3.8M',
    isTop1: true
  },
  {
    id: 'amor-sob-contrato',
    title: 'Amor Sob Contrato',
    subtitle: '@AmorSobContrato',
    genre: 'Romance CEO',
    category: 'Casamento Secreto',
    tags: ['CasamentoFalso', 'Bilionário', 'Comédia'],
    rating: 4.9,
    reviewCount: '110k',
    totalEpisodes: 92,
    heroPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtUkKEz-u2__k3z4aoqUwI-4nXdPIo93D0GqdVwXEa_-LM8ZE56kCKBg84lRCwS7FtrS6gcHzXZcHKxI9VzXLQmGpDJs1e5kzNqReDZ5JuKZ42ziYdaIzafR6TuklT2d99T8Q36Lhv2pgiy1RqtrzW9Mw7M5eMY7HTmg9nFm4a8zwmlCKaxGqBzmxUmusCXBB4nZQ4o8HfdTSJt1Sdn-Gzv_iBMnMBTme33HLR3BH3LE7WVB-0fKWPcQ',
    verticalPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtUkKEz-u2__k3z4aoqUwI-4nXdPIo93D0GqdVwXEa_-LM8ZE56kCKBg84lRCwS7FtrS6gcHzXZcHKxI9VzXLQmGpDJs1e5kzNqReDZ5JuKZ42ziYdaIzafR6TuklT2d99T8Q36Lhv2pgiy1RqtrzW9Mw7M5eMY7HTmg9nFm4a8zwmlCKaxGqBzmxUmusCXBB4nZQ4o8HfdTSJt1Sdn-Gzv_iBMnMBTme33HLR3BH3LE7WVB-0fKWPcQ',
    synopsis: 'Um bilionário frio e calculista propõe um casamento por conveniência de 1 ano, mas cláusulas emocionais começam a ser violadas.',
    episodes: OURO_E_CINZA_EPISODES,
    views: '4.8M'
  },
  {
    id: 'vinganca-noiva',
    title: 'A Vingança da Noiva Trocada',
    subtitle: '@VingancaDaNoiva',
    genre: 'Vingança Familiar',
    category: 'Vingança Feroz',
    tags: ['Traição', 'Vingança', 'Casamento'],
    rating: 4.9,
    reviewCount: '140k',
    totalEpisodes: 85,
    heroPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUO0jJ75j1pF6xPGeGkOGNC2jYRtqSSIr0XvNeMLgRA2eiDUjg5is6Z3QJ8ojbN6fEkh2QoUcY0gQcq-9AHYlzrSIxX0FlDyAD9_HMkzhBLJT7ekdhh3TmirgE1slGUQUPgKuyqkHRCHMIVxaEaEexhlzXvL6HvgmyPp7j2Lt9PwCb_MgY8BwKAR7DhXdJe06tnTV3d0W8qicYVa5mKM9NgSEZjfkoNdOPpqqkp15ILeM6rRXbmL1Itg',
    verticalPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWpmL6WIMkFqcFgCQG70dWIOOUULvfQk8juEIgmjAobUCdc02XB83SZW7FLu-Njgs1OJarjhAuTUvVJplwImBPQPcnSmi0F0IqlwsD2T69StjhL9QwaAOx_La_6AnMejUPKRA4r_fkG3CLxTrqWWpYohgAkiphsF75L4MJiDYufi6VqlkZbZmfRuN8kJhTXcBQYl_TNIOp37Mxfg7TisqriPumt_n2nYLtrRf9vRlUA2W1jWHKqNVXoA',
    synopsis: 'Abandonada no altar após uma conspiração de sua irmã gêmea, ela ressurge com a fortuna do avô para tomar de volta tudo o que foi tirado.',
    episodes: OURO_E_CINZA_EPISODES,
    views: '5.2M',
    isHot: true
  },
  {
    id: 'guarda-costas-amor',
    title: 'O Guarda-Costas do Amor',
    subtitle: '@GuardaCostasAmor',
    genre: 'Ação & Romance',
    category: 'Romance Secreto',
    tags: ['Ação', 'Proteção', 'Herdeira'],
    rating: 4.8,
    reviewCount: '80k',
    totalEpisodes: 52,
    heroPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHEmgWGwN50eJ21Fr9OeCrHbKMXzfhbAJuGIqCoBUMPQVMpHqr5_zJr43eedsM07Hk7iTGlMC93I7ltDYJ60gpuHQE4gMsh_PsjASbS_95qTibGyqBcDHKT8nrrh4WOxhm3oSxgeOCdLKs9_uXOqmPKqxNFD00gz2ZWNEJMl3p3_0FhmzjSx_AHV9zftyph6Ci8RtRu6uzbvHteGYwY_9pb2N_JtfJMgH38XbGFQdjoBj6R7Oc6y2duw',
    verticalPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrN8UkFgPK5Swu5OtKTESp90QoZf-B5Uf9NYr-tFXYSML3mbokS-zjaRne8MyGSIuW7dOUdv_6XCCHzj0zJ9Nl9iFlvWnA_fBC3aNdAUxAafZFtv4n-tIDu7KMKheX013tDJHs0RObmPdLeg8lYL9Ny0nkuMkCp03Qcft4HengADsNw8Rj_oPHv5mQFZr75xqSzaE6Cb1mjSUk4_PoMVKAD41wOytpswLrcq6qpmSot8zoipYo4YMRCg',
    synopsis: 'Contratado para proteger a jovem herdeira dos inimigos da família, um ex-agente especial descobre que o maior perigo é se apaixonar.',
    episodes: OURO_E_CINZA_EPISODES,
    views: '3.2M'
  },
  {
    id: 'pacto-com-o-ceo',
    title: 'Pacto com o CEO',
    subtitle: '@PactoComCEO',
    genre: 'Casamento Falso',
    category: 'CEO & Bilionários',
    tags: ['CasamentoFalso', 'Bilionários', 'EnemiesToLovers'],
    rating: 4.7,
    reviewCount: '62k',
    totalEpisodes: 80,
    heroPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3lBuGd_UwVWZZ3P411IhdIskdi3XQ4RvVw-V1qCkke4lCjnYQexDNQXagC_uHgWWHf91xCCKQ1cwbh92guE8hZ0ICnIWV17CKuBP-G5ieJEJNzTx6bmgrGsbp3KktiRbw42M1yXOFuCe7HA2tL__ZO_5slXTQKA2MBZf-GxlzaSRlwxrdaWc9MOcrgX3SMRvTjkldDg9ApPUTGlmqaou0MVbb-yxgZZiauC3MzP0xrf3F-WLi9CJ8Fw',
    verticalPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3lBuGd_UwVWZZ3P411IhdIskdi3XQ4RvVw-V1qCkke4lCjnYQexDNQXagC_uHgWWHf91xCCKQ1cwbh92guE8hZ0ICnIWV17CKuBP-G5ieJEJNzTx6bmgrGsbp3KktiRbw42M1yXOFuCe7HA2tL__ZO_5slXTQKA2MBZf-GxlzaSRlwxrdaWc9MOcrgX3SMRvTjkldDg9ApPUTGlmqaou0MVbb-yxgZZiauC3MzP0xrf3F-WLi9CJ8Fw',
    synopsis: 'Para salvar a empresa de sua família, ela assina um contrato implacável de casamento com o CEO mais temido da cidade.',
    episodes: OURO_E_CINZA_EPISODES,
    views: '2.9M',
    isVip: true
  }
];

export const COIN_PACKAGES: CoinPackage[] = [
  {
    id: 'pkg-200',
    coins: 200,
    priceMT: 50,
    tag: 'Iniciante',
    desc: 'Ideal para maratonar 1 história completa.'
  },
  {
    id: 'pkg-500',
    coins: 500,
    priceMT: 120,
    bonusText: '+20% BÔNUS',
    badge: 'MAIS POPULAR',
    tag: 'Mais Popular',
    desc: 'Desbloqueia ~25 episódios sem anúncios.',
    isPopular: true
  },
  {
    id: 'pkg-1500',
    coins: 1500,
    priceMT: 300,
    bonusText: '+3 Ingressos VIP',
    badge: 'MELHOR VALOR',
    tag: 'Melhor Valor',
    desc: 'Acesso livre a estreias da semana.',
    isBestValue: true
  },
  {
    id: 'pkg-4500',
    coins: 4500,
    priceMT: 750,
    bonusText: '+50% EXTRA',
    tag: 'Passe Vício',
    desc: 'Acesso total ilimitado a todos os lançamentos.'
  }
];

export const VIP_PLANS: VipPlan[] = [
  {
    id: 'vip-semanal',
    title: 'VIP Semanal',
    period: 'Semanal',
    priceMT: 250,
    frequencyText: '/ semana',
    features: [
      'Sem anúncios (Zero interrupções)',
      'Episódios liberados instantaneamente',
      'Qualidade Full HD 1080p vertical',
      'Download para assistir offline'
    ]
  },
  {
    id: 'vip-mensal',
    title: 'VIP Mensal',
    period: 'Mensal',
    priceMT: 600,
    frequencyText: '/ mês',
    weeklyEquiv: '150 MT / semana',
    badge: 'POPULAR · ECONOMIZE 40%',
    features: [
      'Tudo incluído do plano semanal',
      'Acesso antecipado a novos doramas e estreias',
      'Episódios ilimitados em catálogo completo',
      'Qualidade Ultra HD & Som Espacial',
      'Downloads offline ilimitados'
    ],
    isPopular: true
  },
  {
    id: 'vip-anual',
    title: 'VIP Anual',
    period: 'Anual',
    priceMT: 3500,
    frequencyText: '/ ano',
    weeklyEquiv: '~291 MT / mês',
    badge: 'MELHOR VALOR · 2 MESES GRÁTIS',
    features: [
      'Todos os privilégios VIP Mensal',
      'Distintivo dourado VIP exclusivo no perfil',
      'Prioridade no suporte e sugestão de séries'
    ],
    isBestValue: true
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Desbloqueio Ep. 3: O Amor Secreto',
    date: 'Hoje às 14:20 • Mini-série',
    amount: -30,
    type: 'debit',
    subtitle: 'Mini-série'
  },
  {
    id: 'tx-2',
    title: 'Bônus Check-in Diário',
    date: 'Hoje às 09:15 • Recompensa',
    amount: 30,
    type: 'credit',
    subtitle: 'Recompensa'
  },
  {
    id: 'tx-3',
    title: 'Recarga M-Pesa (500 Moedas)',
    date: 'Ontem • 120 MT',
    amount: 500,
    type: 'credit',
    subtitle: '120 MT'
  },
  {
    id: 'tx-4',
    title: 'Desbloqueio Ep. 12: Vingança do CEO',
    date: 'Há 2 dias • Sucesso de audiência',
    amount: -30,
    type: 'debit',
    subtitle: 'Sucesso de audiência'
  }
];
