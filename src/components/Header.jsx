import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoriteContext';
import { useTheme } from '../context/ThemeContext';
import { 
  User, LogOut, Moon, Sun, Home, Star, Search 
} from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span>🦸‍♂️</span>
          <span>SuperHero Wiki</span>
        </Link>

        {/* Navegación */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link
            to="/"
            className="hover:underline hover:text-blue-200 transition-colors 
                       text-gray-800 dark:text-white"
          >
            Inicio
          </Link>

          {user && (
            <Link
              to="/favorites"
              className="hover:underline hover:text-blue-200 transition-colors 
                         text-gray-800 dark:text-white flex items-center gap-1"
            >
              <Star size={16} fill={favorites.length > 0 ? 'currentColor' : 'none'} />
              <span className="hidden sm:inline">Favoritos</span>
              {favorites.length > 0 && (
                <span className="bg-blue-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          )}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          {/* Botón modo oscuro */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-blue-700 transition-colors
                       text-gray-800 dark:text-white"
            aria-label={darkMode ? 'Modo claro' : 'Modo oscuro'}
            title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Usuario / Login */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-gray-800 dark:text-white">
                👋 Hola, <strong>{user.username}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded text-sm font-medium transition-colors
                           text-white"
                aria-label="Cerrar sesión"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded font-medium transition-colors
                         text-white"
            >
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}