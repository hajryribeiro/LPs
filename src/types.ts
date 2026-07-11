export interface ThemeConfig {
  bg: string;
  bgSoft: string;
  card: string;
  card2: string;
  text: string;
  muted: string;
  muted2: string;
  gold: string;
  goldSoft: string;
  wa: string;
  waDark: string;
  fontDisplay: string;
  fontHead: string;
  fontBody: string;
  fontMono: string;
}

export interface NavLink {
  id: string;
  text: string;
  href: string;
}

export interface NavConfig {
  logoMark: string;
  logoName: string;
  links: NavLink[];
}

export interface HeroConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  btnWaText: string;
  btnSecText: string;
  btnSecHref: string;
  imageUrl: string;
  namecardTitle: string;
  namecardName: string;
  namecardCreci: string;
}

export interface StatItem {
  id: string;
  icon: string;
  value: string;
  label: string;
}

export interface SpecialtyItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  bgType: 'build' | 'sea' | 'chart' | 'custom';
  imageUrl?: string;
}

export interface AdvantageItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface CredentialChip {
  id: string;
  value: string;
  label: string;
}

export interface RegionConfig {
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  num: string;
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  stars: number;
  quote: string;
  initials: string;
  name: string;
  sub: string;
  avatarUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CtaConfig {
  title: string;
  description: string;
  btnText: string;
  contacts: {
    address: string;
    phone: string;
    creci: string;
  };
}

export interface FooterConfig {
  description: string;
  credentialsTitle: string;
  credentialsItems: string[];
  addressTitle: string;
  addressItems: string[];
  copyright: string;
  policyLinks: { text: string; href: string }[];
  instagramUrl: string;
}

export interface ImageStyleConfig {
  width?: number;
  height?: number;
  scale?: number;
  borderRadius?: number;
  rotation?: number;
  translateX?: number;
  translateY?: number;
  mobileWidth?: number;
  mobileHeight?: number;
}

export interface LandingPageData {
  theme: ThemeConfig;
  nav: NavConfig;
  hero: HeroConfig;
  stats: StatItem[];
  specialties: {
    title: string;
    subtitle: string;
    items: SpecialtyItem[];
  };
  advantages: {
    title: string;
    subtitle: string;
    items: AdvantageItem[];
  };
  credentials: {
    title: string;
    chips: CredentialChip[];
  };
  region: RegionConfig;
  process: {
    title: string;
    subtitle: string;
    items: ProcessStep[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  cta: CtaConfig;
  footer: FooterConfig;
  waNumber: string;
  waMessage: string;
  imageStyles?: Record<string, ImageStyleConfig>;
  pageBgUrl?: string;
  pageBgOpacity?: number;
  pageBgParallax?: boolean;
  statsBgUrl?: string;
  statsBgOpacity?: number;
  statsBgParallax?: boolean;
}
