export const dynamic = 'force-dynamic';

import { prisma } from '@creative-commerce/database';

export default async function CreadoresPage() {
  const creators = await prisma.creator.findMany({
    orderBy: { followers: 'desc' },
  });

  const allCategories = Array.from(
    new Set(creators.flatMap((c) => c.categories))
  ).sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Creadores</h1>
        <span className="text-sm text-gray-500">{creators.length} creadores</span>
      </div>

      {/* Category filters */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* Creator Grid */}
      {creators.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
          No hay creadores registrados.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {creator.displayName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{creator.displayName}</p>
                    <p className="text-sm text-gray-500">@{creator.tiktokUsername}</p>
                  </div>
                </div>
                {creator.isInNetwork && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    En Red
                  </span>
                )}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="bg-gray-50 rounded-lg py-2">
                  <p className="text-lg font-bold text-gray-900">
                    {creator.followers >= 1000
                      ? `${(creator.followers / 1000).toFixed(1)}k`
                      : creator.followers}
                  </p>
                  <p className="text-xs text-gray-500">Seguidores</p>
                </div>
                <div className="bg-gray-50 rounded-lg py-2">
                  <p className="text-lg font-bold text-gray-900">
                    {creator.engagementRate.toFixed(1)}%
                  </p>
                  <p className="text-xs text-gray-500">Engagement</p>
                </div>
                <div className="bg-gray-50 rounded-lg py-2">
                  <p className="text-lg font-bold text-gray-900">
                    {creator.averageViews >= 1000
                      ? `${(creator.averageViews / 1000).toFixed(1)}k`
                      : creator.averageViews}
                  </p>
                  <p className="text-xs text-gray-500">Views Avg</p>
                </div>
              </div>

              {creator.categories.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {creator.categories.map((cat, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {creator.languages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {creator.languages.map((lang, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
