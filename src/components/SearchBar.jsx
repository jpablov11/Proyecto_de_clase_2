import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Por favor, ingresa el nombre de un superhéroe.');
      return;
    }
    setError('');
    navigate(`/search/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="max-w-2xl mx-auto mb-8 px-2">
      <form onSubmit={handleSubmit} className="flex">
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (error) setError('');
            }}
            placeholder="Busca un superhéroe (ej: Batman, Spider-Man)..."
            className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={18}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center gap-1 sm:gap-2"
        >
          <Search size={18} />
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </form>
      {error && (
        <p className="mt-2 text-red-500 dark:text-red-400 text-sm font-medium text-center">
          {error}
        </p>
      )}
    </div>
  );
}