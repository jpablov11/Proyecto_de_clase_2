import { createContext, useContext, useEffect, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const addFavorite = (hero) => {
    setFavorites((prev) => {
      if (prev.some((h) => h.id === hero.id)) return prev;
      const newFavs = [...prev, hero];
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => {
      const newFavs = prev.filter((h) => h.id !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const isFavorite = (id) => favorites.some((h) => h.id === id);

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);