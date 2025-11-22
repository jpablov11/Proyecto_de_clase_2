import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoriteContext';

const HeroDetail = () => {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await apiClient.get(`/${id}`);
        setHero(response.data);
      } catch (error) {
        console.error('Error fetching hero:', error);
        alert('⚠️ Superhéroe no encontrado. Verifica el ID.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHero();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando superhéroe...</p>
        </div>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="text-center p-10">
        <p className="text-gray-600 dark:text-gray-400">No se encontró el superhéroe.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 pb-10">
      {/* Botón de favoritos (solo si está logueado) */}
      {user && (
        <div className="text-center mb-6">
          <button
            onClick={() => {
              if (isFavorite(hero.id)) {
                removeFavorite(hero.id);
              } else {
                addFavorite(hero);
              }
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              isFavorite(hero.id)
                ? 'bg-yellow-500 text-black hover:bg-yellow-600 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
            }`}
          >
            {isFavorite(hero.id) ? '⭐ Ya es favorito' : '➕ Agregar a favoritos'}
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3 flex justify-center">
          <div className="w-full max-w-xs">
            {hero.image?.url ? (
              <img
                src={hero.image.url}
                alt={hero.name}
                className="rounded-xl shadow-lg w-full h-auto object-cover"
                style={{ aspectRatio: '2/3' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                  e.target.classList.add('opacity-50');
                }}
              />
            ) : (
              <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-full h-[450px] flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-center px-4">
                  🦸 No hay imagen disponible
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{hero.name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">ID: #{hero.id}</p>

          {hero.biography?.alignment && (
            <span
              className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold ${
                hero.biography.alignment === 'good'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : hero.biography.alignment === 'bad'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              {hero.biography.alignment === 'good'
                ? '🌟 Bueno'
                : hero.biography.alignment === 'bad'
                ? '🔥 Villano'
                : '⚖️ Neutral'}
            </span>
          )}
        </div>
      </div>

      {/* Power Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {Object.entries(hero.powerstats || {}).map(([key, value]) => (
          <div
            key={key}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center border border-gray-200 dark:border-gray-700"
          >
            <div className="font-bold text-gray-700 dark:text-gray-200 mb-1 capitalize">
              {key.replace('-', ' ')}
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {value === 'null' ? '—' : value}
            </div>
          </div>
        ))}
      </div>

      {/* Biografía */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Biografía</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Nombre real" value={hero.biography?.['full-name']} />
          <InfoItem label="Alter egos" value={hero.biography?.['alter-egos']} />
          <InfoItem
            label="Lugar de nacimiento"
            value={hero.biography?.['place-of-birth']}
          />
          <InfoItem
            label="Primera aparición"
            value={hero.biography?.['first-appearance']}
          />
          <InfoItem label="Editorial" value={hero.biography?.publisher} />
          <InfoItem label="Ocupación" value={hero.work?.occupation} />
        </div>
      </div>

      {/* Conexiones */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Conexiones</h2>
        <div className="space-y-3">
          <InfoItem
            label="Grupo de afiliación"
            value={hero.connections?.['group-affiliation']}
          />
          <InfoItem label="Parientes" value={hero.connections?.relatives} />
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="break-words">
    <span className="font-semibold text-gray-600 dark:text-gray-400">{label}:</span>{' '}
    <span className="text-gray-800 dark:text-gray-200">{value || '—'}</span>
  </div>
);

export default HeroDetail;