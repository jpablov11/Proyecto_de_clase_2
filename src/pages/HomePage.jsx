import { useState, useEffect } from 'react';
import apiClient from '../api/axiosInstance';
import HeroCard from '../components/HeroCard';
import SearchBar from '../components/SearchBar';

export default function HomePage() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomHeroes = async () => {
      try {
        const ids = Array.from({ length: 6 }, () => Math.floor(Math.random() * 731) + 1);
        const responses = await Promise.all(
          ids.map(id => apiClient.get(`/${id}`))
        );
        setHeroes(responses.map(res => res.data));
      } catch (error) {
        console.error('Error fetching heroes:', error);
        alert('No se pudieron cargar los superhéroes. Verifica tu conexión y token.');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomHeroes();
  }, []);

  return (
    <div className="container mx-auto px-2 py-4">
      <SearchBar />
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Superhéroes del Día
      </h1>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Cargando superhéroes...</p>
        </div>
      ) : heroes.length === 0 ? (
        <p className="text-center text-gray-600">No se encontraron superhéroes.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroes.map(hero => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      )}
    </div>
  );
}