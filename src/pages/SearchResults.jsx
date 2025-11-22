// src/pages/SearchResults.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axiosInstance';
import HeroCard from '../components/HeroCard';

export default function SearchResults() {
  const { name } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/search/${name}`);
        setResults(response.data.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (name) search();
  }, [name]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">
        Resultados para "{decodeURIComponent(name)}"
      </h1>

      {loading ? (
        <p className="text-gray-500">Buscando...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-600">No se encontraron superhéroes.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(hero => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </div>
      )}
    </div>
  );
}