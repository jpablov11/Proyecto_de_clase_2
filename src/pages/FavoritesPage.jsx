// src/pages/FavoritesPage.jsx
import { useFavorites } from '../context/FavoriteContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import HeroCard from '../components/HeroCard';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Mis Favoritos ({favorites.length})
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-xl shadow p-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No tienes superhéroes favoritos aún.
          </p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            ← Explorar héroes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      )}
    </div>
  );
}