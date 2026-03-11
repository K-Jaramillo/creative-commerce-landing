// TODO: Replace with real TikTok Creator Marketplace API when business credentials are available

export interface TikTokCreatorSearchParams {
  category?: string;
  language?: string;
  minFollowers?: number;
  maxFollowers?: number;
  minEngagementRate?: number;
  country?: string;
  limit?: number;
}

export interface TikTokCreatorResult {
  username: string;
  displayName: string;
  followers: number;
  engagementRate: number;
  averageViews: number;
  categories: string[];
  languages: string[];
  profileImageUrl: string;
  bio: string;
}

const HISPANIC_FIRST_NAMES = [
  'María', 'Carlos', 'Ana', 'José', 'Valentina', 'Diego', 'Sofía', 'Andrés',
  'Camila', 'Miguel', 'Lucía', 'Fernando', 'Isabella', 'Ricardo', 'Gabriela',
  'Alejandro', 'Daniela', 'Sebastián', 'Mariana', 'Javier',
];

const ENGLISH_FIRST_NAMES = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'James', 'Sophia', 'Mason',
  'Mia', 'Ethan', 'Harper', 'Aiden', 'Chloe', 'Lucas', 'Ella',
  'Jordan', 'Taylor', 'Riley', 'Morgan', 'Casey',
];

const LAST_NAMES = [
  'García', 'Rodríguez', 'Martínez', 'López', 'Hernández', 'González',
  'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera',
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Davis',
  'Miller', 'Wilson',
];

const CATEGORY_MAP: Record<string, string[]> = {
  belleza: ['Skincare', 'Maquillaje', 'Cuidado del cabello', 'Belleza'],
  moda: ['Moda', 'Estilo', 'Outfits', 'Tendencias'],
  fitness: ['Fitness', 'Nutrición', 'Bienestar', 'Deporte'],
  comida: ['Comida', 'Recetas', 'Cocina', 'Gastronomía'],
  tecnología: ['Tech', 'Gadgets', 'Reviews', 'Tecnología'],
  hogar: ['Hogar', 'Decoración', 'Organización', 'DIY'],
  mascotas: ['Mascotas', 'Perros', 'Gatos', 'Animales'],
  lifestyle: ['Lifestyle', 'Vlogs', 'Día a día', 'Motivación'],
};

const BIOS_TEMPLATES = [
  '✨ Creadora de contenido | {category} | Colaboraciones: DM 📩',
  '🎬 {category} content creator | Bilingüe 🇺🇸🇲🇽 | Link in bio ⬇️',
  '💫 Apasionad@ por {category} | TikTok Shop Creator | Contacto: email',
  '🌟 {category} lover | Reseñas honestas | Compra mis favoritos ⬇️',
  '📸 {category} | Mamá emprendedora | Ofertas exclusivas en mi tienda',
  '🔥 Tu fuente de {category} | +{followers}K seguidores | Shop my picks',
  '💄 {category} sin filtros | UGC Creator | Disponible para collabs',
  '🏠 {category} tips diarios | Bilingüe ES/EN | ¡Suscríbete!',
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateMockCreator(
  index: number,
  params: TikTokCreatorSearchParams,
): TikTokCreatorResult {
  const rand = seededRandom(index * 7919 + (params.category?.length || 3) * 31);

  const useHispanic = rand() > 0.35;
  const firstNames = useHispanic ? HISPANIC_FIRST_NAMES : ENGLISH_FIRST_NAMES;
  const firstName = firstNames[Math.floor(rand() * firstNames.length)];
  const lastName = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
  const displayName = `${firstName} ${lastName}`;

  const usernameBase = `${firstName.toLowerCase().replace(/[áéíóúñ]/g, (c) => {
    const map: Record<string, string> = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ñ: 'n' };
    return map[c] || c;
  })}${lastName.toLowerCase().replace(/[áéíóúñ]/g, (c) => {
    const map: Record<string, string> = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ñ: 'n' };
    return map[c] || c;
  })}`;
  const username = `@${usernameBase}${Math.floor(rand() * 99)}`;

  const minF = params.minFollowers || 10_000;
  const maxF = params.maxFollowers || 500_000;
  const followers = Math.floor(minF + rand() * (maxF - minF));

  const minEng = params.minEngagementRate || 2;
  const engagementRate = parseFloat((minEng + rand() * (8 - minEng)).toFixed(2));

  const averageViews = Math.floor(followers * (engagementRate / 100) * (3 + rand() * 7));

  const categoryKey = params.category?.toLowerCase() || 'lifestyle';
  const matchedCategories = CATEGORY_MAP[categoryKey] || CATEGORY_MAP['lifestyle'];
  const numCategories = 2 + Math.floor(rand() * 2);
  const categories = matchedCategories.slice(0, numCategories);

  const languages: string[] = [];
  if (params.language) {
    languages.push(params.language);
  }
  if (useHispanic || rand() > 0.4) languages.push('Español');
  if (!useHispanic || rand() > 0.3) languages.push('Inglés');
  const uniqueLanguages = [...new Set(languages)];

  const bioTemplate = BIOS_TEMPLATES[Math.floor(rand() * BIOS_TEMPLATES.length)];
  const bio = bioTemplate
    .replace(/{category}/g, categories[0] || 'Lifestyle')
    .replace(/{followers}/g, Math.floor(followers / 1000).toString());

  return {
    username,
    displayName,
    followers,
    engagementRate,
    averageViews,
    categories,
    languages: uniqueLanguages,
    profileImageUrl: `https://placehold.co/200x200?text=${encodeURIComponent(firstName[0] + lastName[0])}`,
    bio,
  };
}

/**
 * Searches for TikTok creators based on the given filters.
 * Currently returns mock data for development purposes.
 *
 * TODO: Replace with real TikTok Creator Marketplace API integration
 */
export async function searchCreators(
  params: TikTokCreatorSearchParams,
): Promise<TikTokCreatorResult[]> {
  const limit = Math.min(params.limit || 15, 50);
  const count = Math.max(10, Math.min(limit, 20));

  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));

  const creators: TikTokCreatorResult[] = [];
  for (let i = 0; i < count; i++) {
    const creator = generateMockCreator(i, params);

    if (params.minFollowers && creator.followers < params.minFollowers) continue;
    if (params.maxFollowers && creator.followers > params.maxFollowers) continue;
    if (params.minEngagementRate && creator.engagementRate < params.minEngagementRate) continue;

    creators.push(creator);
  }

  return creators.sort((a, b) => b.engagementRate - a.engagementRate);
}

/**
 * Fetches a single TikTok creator's profile by username.
 * Currently returns mock data for development purposes.
 *
 * TODO: Replace with real TikTok API
 */
export async function fetchCreatorProfile(
  username: string,
): Promise<TikTokCreatorResult | null> {
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200));

  const cleanUsername = username.replace(/^@/, '');
  const seed = cleanUsername.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const rand = seededRandom(seed);

  const useHispanic = rand() > 0.4;
  const firstNames = useHispanic ? HISPANIC_FIRST_NAMES : ENGLISH_FIRST_NAMES;
  const firstName = firstNames[Math.floor(rand() * firstNames.length)];
  const lastName = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];

  const allCategoryKeys = Object.keys(CATEGORY_MAP);
  const categoryKey = allCategoryKeys[Math.floor(rand() * allCategoryKeys.length)];
  const categories = CATEGORY_MAP[categoryKey].slice(0, 2 + Math.floor(rand() * 2));

  const followers = Math.floor(10_000 + rand() * 490_000);
  const engagementRate = parseFloat((2 + rand() * 6).toFixed(2));

  return {
    username: `@${cleanUsername}`,
    displayName: `${firstName} ${lastName}`,
    followers,
    engagementRate,
    averageViews: Math.floor(followers * (engagementRate / 100) * (3 + rand() * 7)),
    categories,
    languages: useHispanic ? ['Español', 'Inglés'] : ['Inglés', 'Español'],
    profileImageUrl: `https://placehold.co/200x200?text=${encodeURIComponent(firstName[0] + lastName[0])}`,
    bio: BIOS_TEMPLATES[Math.floor(rand() * BIOS_TEMPLATES.length)]
      .replace(/{category}/g, categories[0])
      .replace(/{followers}/g, Math.floor(followers / 1000).toString()),
  };
}
