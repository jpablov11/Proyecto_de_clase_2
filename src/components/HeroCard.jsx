import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function HeroCard({ hero }) {
  const imageUrl = hero.image?.url || '';
  const isValidUrl = imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('http');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      {/* Contenedor de imagen */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
        {isValidUrl ? (
          <img
            src={imageUrl}
            alt={hero.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x180?text=No+Image';
              e.target.classList.add('opacity-50');
              e.target.style.backgroundColor = '#f3f4f6';
            }}
            style={{ minWidth: '100%', minHeight: '100%' }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300 text-sm font-medium">
            🦸 No Image
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{hero.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">ID: {hero.id}</p>

        {hero.biography?.alignment && (
          <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
            hero.biography.alignment === 'good'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : hero.biography.alignment === 'bad'
              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>
            {hero.biography.alignment === 'good' 
              ? '🌟 Bueno' 
              : hero.biography.alignment === 'bad' 
                ? '🔥 Villano' 
                : '⚖️ Neutral'}
          </span>
        )}

        <div className="mt-3">
          <Link
            to={`/hero/${hero.id}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium inline-flex items-center gap-1"
          >
            <Star size={14} />
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}