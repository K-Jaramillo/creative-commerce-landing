import type { TikTokCreatorResult } from './tiktok';

export interface BrandProfile {
  name: string;
  industry: string;
  categories: string[];
  targetLanguages: string[];
  targetContentTypes?: string[];
}

export interface MatchBreakdown {
  categoryScore: number;
  languageScore: number;
  engagementScore: number;
  followerScore: number;
  compatibilityScore: number;
}

export interface MatchResult {
  creatorId: string;
  totalScore: number;
  breakdown: MatchBreakdown;
  recommendation: string;
}

const INDUSTRY_CATEGORY_MAP: Record<string, string[]> = {
  belleza: ['Skincare', 'Maquillaje', 'Cuidado del cabello', 'Belleza', 'Beauty'],
  moda: ['Moda', 'Estilo', 'Outfits', 'Tendencias', 'Fashion'],
  fitness: ['Fitness', 'Nutrición', 'Bienestar', 'Deporte', 'Gym', 'Salud'],
  comida: ['Comida', 'Recetas', 'Cocina', 'Gastronomía', 'Food'],
  tecnología: ['Tech', 'Gadgets', 'Reviews', 'Tecnología', 'Technology'],
  hogar: ['Hogar', 'Decoración', 'Organización', 'DIY', 'Home'],
  mascotas: ['Mascotas', 'Perros', 'Gatos', 'Animales', 'Pets'],
  lifestyle: ['Lifestyle', 'Vlogs', 'Día a día', 'Motivación'],
  salud: ['Salud', 'Bienestar', 'Wellness', 'Nutrición', 'Fitness'],
};

/**
 * Category overlap scoring (max 40 points).
 * Compares creator's categories against brand's industry and category list.
 */
function scoreCategoryOverlap(brand: BrandProfile, creator: TikTokCreatorResult): number {
  const brandCategories = new Set<string>();

  // Add direct brand categories
  for (const cat of brand.categories) {
    brandCategories.add(cat.toLowerCase());
  }

  // Add industry-mapped categories
  const industryKey = brand.industry.toLowerCase();
  const mapped = INDUSTRY_CATEGORY_MAP[industryKey];
  if (mapped) {
    for (const cat of mapped) {
      brandCategories.add(cat.toLowerCase());
    }
  }

  if (brandCategories.size === 0) return 20; // No categories defined, give neutral score

  const creatorCats = creator.categories.map((c) => c.toLowerCase());
  let matchCount = 0;
  for (const cc of creatorCats) {
    if (brandCategories.has(cc)) {
      matchCount++;
    }
  }

  if (creatorCats.length === 0) return 0;

  const matchRatio = matchCount / Math.min(creatorCats.length, brandCategories.size);

  if (matchRatio >= 0.75) return 40;
  if (matchRatio >= 0.5) return 30;
  if (matchRatio >= 0.25) return 20;
  if (matchCount > 0) return 10;
  return 0;
}

/**
 * Language match scoring (max 20 points).
 * Bilingual creators (Spanish + English) score highest.
 */
function scoreLanguageMatch(brand: BrandProfile, creator: TikTokCreatorResult): number {
  const brandLangs = new Set(brand.targetLanguages.map((l) => l.toLowerCase()));
  const creatorLangs = new Set(creator.languages.map((l) => l.toLowerCase()));

  // Bilingual bonus: creator speaks both Spanish and English
  const isBilingual =
    (creatorLangs.has('español') || creatorLangs.has('spanish')) &&
    (creatorLangs.has('inglés') || creatorLangs.has('english'));

  if (isBilingual) return 20;

  // Check overlap with brand's target languages
  let matchCount = 0;
  for (const bl of brandLangs) {
    if (creatorLangs.has(bl)) matchCount++;
  }

  if (brandLangs.size === 0) return 10; // No preference, neutral score
  const ratio = matchCount / brandLangs.size;

  if (ratio >= 1) return 18;
  if (ratio >= 0.5) return 12;
  if (matchCount > 0) return 8;
  return 2;
}

/**
 * Engagement rate scoring (max 20 points).
 * Higher engagement = higher score, scaled logarithmically.
 */
function scoreEngagement(creator: TikTokCreatorResult): number {
  const rate = creator.engagementRate;

  if (rate >= 7) return 20;
  if (rate >= 5) return 17;
  if (rate >= 4) return 14;
  if (rate >= 3) return 11;
  if (rate >= 2) return 8;
  if (rate >= 1) return 5;
  return 2;
}

/**
 * Follower count sweet spot scoring (max 10 points).
 * 50K-200K is ideal for TikTok Shop creators — large enough audience,
 * small enough for genuine engagement and reasonable commission rates.
 */
function scoreFollowerCount(creator: TikTokCreatorResult): number {
  const f = creator.followers;

  if (f >= 50_000 && f <= 200_000) return 10; // Sweet spot
  if (f >= 30_000 && f < 50_000) return 8;
  if (f > 200_000 && f <= 350_000) return 7;
  if (f >= 20_000 && f < 30_000) return 6;
  if (f > 350_000 && f <= 500_000) return 5;
  if (f >= 10_000 && f < 20_000) return 4;
  if (f > 500_000) return 3;
  return 2;
}

/**
 * Content compatibility scoring (max 10 points).
 * Based on creator's category breadth and content types.
 */
function scoreContentCompatibility(
  brand: BrandProfile,
  creator: TikTokCreatorResult,
): number {
  let score = 5; // Base score

  // Creators with 2-3 categories are ideal (focused but versatile)
  const catCount = creator.categories.length;
  if (catCount >= 2 && catCount <= 3) score += 3;
  else if (catCount === 1 || catCount === 4) score += 1;

  // Bonus if brand has target content types and creator categories align
  if (brand.targetContentTypes && brand.targetContentTypes.length > 0) {
    const creatorCatsLower = creator.categories.map((c) => c.toLowerCase());
    const hasMatch = brand.targetContentTypes.some((t) =>
      creatorCatsLower.some((cc) => cc.includes(t.toLowerCase()) || t.toLowerCase().includes(cc)),
    );
    if (hasMatch) score += 2;
  }

  return Math.min(score, 10);
}

function getRecommendation(score: number): string {
  if (score >= 75) return 'Alta compatibilidad';
  if (score >= 50) return 'Buena compatibilidad';
  return 'Compatibilidad moderada';
}

/**
 * Calculates a match score (0-100) between a brand and a creator.
 * Returns the total score plus a detailed breakdown of each scoring dimension.
 */
export function calculateMatchScore(
  brand: BrandProfile,
  creator: TikTokCreatorResult,
): MatchResult {
  const categoryScore = scoreCategoryOverlap(brand, creator);
  const languageScore = scoreLanguageMatch(brand, creator);
  const engagementScore = scoreEngagement(creator);
  const followerScore = scoreFollowerCount(creator);
  const compatibilityScore = scoreContentCompatibility(brand, creator);

  const totalScore = categoryScore + languageScore + engagementScore + followerScore + compatibilityScore;

  return {
    creatorId: creator.username,
    totalScore,
    breakdown: {
      categoryScore,
      languageScore,
      engagementScore,
      followerScore,
      compatibilityScore,
    },
    recommendation: getRecommendation(totalScore),
  };
}

/**
 * Ranks all creators for a given brand by match score (highest first).
 */
export function rankCreatorsForBrand(
  brand: BrandProfile,
  creators: TikTokCreatorResult[],
): MatchResult[] {
  return creators
    .map((creator) => calculateMatchScore(brand, creator))
    .sort((a, b) => b.totalScore - a.totalScore);
}
