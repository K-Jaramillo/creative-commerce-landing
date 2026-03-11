// === Lead Types ===
export type LeadStatus = 'nuevo' | 'plan_generado' | 'contactado' | 'convertido' | 'descartado';

export interface LeadFormData {
  brandName: string;
  website: string;
  industry: string;
  mainProducts: string;
  alreadyOnTikTok: boolean;
  monthlySalesVolume: string;
  mainObjective: string;
  estimatedBudget: string;
  hasExistingContent: boolean;
  contactName: string;
  email: string;
  phone: string;
  howFoundUs: string;
  additionalNotes?: string;
}

// === User & Auth Types ===
export type UserRole = 'admin' | 'brand';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  brandId?: string;
}

// === AI Plan Types ===
export interface AIPlanResult {
  brandAnalysis: string;
  recommendedPlan: 'LAUNCH' | 'GROWTH' | 'SCALE';
  planJustification: string;
  priorityServices: string[];
  creatorStrategy: {
    categories: string[];
    languages: string[];
    estimatedCreators: number;
  };
  tiktokPotential: string;
  keyPointsForCall: string[];
}

// === Creator Types ===
export type CreatorContactStatus = 'pendiente' | 'contactado' | 'interesado' | 'activo' | 'rechazado';

export interface CreatorProfile {
  id: string;
  tiktokUsername: string;
  displayName: string;
  followers: number;
  engagementRate: number;
  categories: string[];
  languages: string[];
  averageViews: number;
  contactStatus: CreatorContactStatus;
}

// === Metrics Types ===
export interface BrandMetrics {
  gmv: number;
  roas: number;
  cpa: number;
  totalSales: number;
  salesByChannel: {
    affiliates: number;
    liveCommerce: number;
    ads: number;
    organic: number;
  };
  topCreators: {
    name: string;
    sales: number;
    videos: number;
  }[];
}

// === Service & Plan Types ===
export type PlanTier = 'LAUNCH' | 'GROWTH' | 'SCALE';

export interface ServiceInfo {
  id: string;
  name: string;
  description: string;
  features: string[];
}

export interface PlanInfo {
  id: string;
  tier: PlanTier;
  name: string;
  tagline: string;
  description: string;
  liveCommerceDetails: string;
  features: string[];
  idealFor: string;
  expectedResult: string;
}

// === Chat Types ===
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// === Industry Options ===
export const INDUSTRIES = [
  'Belleza y Cuidado Personal',
  'Moda y Accesorios',
  'Salud y Bienestar',
  'Hogar y Decoración',
  'Tecnología y Gadgets',
  'Alimentos y Bebidas',
  'Deportes y Fitness',
  'Mascotas',
  'Juguetes y Niños',
  'Automotriz',
  'Otra',
] as const;

export const SALES_VOLUMES = [
  'Menos de $10,000/mes',
  '$10,000 - $50,000/mes',
  '$50,000 - $100,000/mes',
  '$100,000 - $500,000/mes',
  'Más de $500,000/mes',
] as const;

export const OBJECTIVES = [
  'Lanzar en TikTok Shop por primera vez',
  'Escalar ventas existentes en TikTok Shop',
  'Diversificar canales de venta',
  'Aumentar presencia de marca en TikTok',
  'Conectar con audiencia hispana',
] as const;

export const BUDGETS = [
  '$1,000 - $3,000/mes',
  '$3,000 - $5,000/mes',
  '$5,000 - $10,000/mes',
  '$10,000 - $25,000/mes',
  'Más de $25,000/mes',
] as const;

export const HOW_FOUND_US = [
  'TikTok',
  'Instagram',
  'Google',
  'Referido',
  'LinkedIn',
  'Evento',
  'Otro',
] as const;
