import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Por favor, ingresa un nombre de usuario.');
      return;
    }
    setError('');
    login(username);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
                    bg-gray-50 dark:bg-gray-900 
                    text-gray-800 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 
                      p-8 rounded-xl shadow-lg 
                      w-full max-w-md 
                      border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <User className="text-blue-600 dark:text-blue-400" size={28} />
          </div>
          <h1 className="text-2xl font-bold">🦸‍♂️ Iniciar Sesión</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
          </p>
        </div>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label 
              htmlFor="username" 
              className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
              Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-400 dark:text-gray-500" size={18} />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 
                           border border-gray-300 dark:border-gray-600 
                           rounded-lg 
                           bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-white 
                           placeholder-gray-500 dark:placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full 
                      bg-blue-600 hover:bg-blue-700 
                      dark:bg-blue-700 dark:hover:bg-blue-600
                      text-white font-medium py-2.5 rounded-lg 
                      flex items-center justify-center gap-2 
                      transition-colors"
          >
            <LogIn size={18} />
            Ingresar
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        </p>
      </div>
    </div>
  );
}