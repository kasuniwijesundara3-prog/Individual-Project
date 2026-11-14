// FavouritesContext.jsx
// Stores the ids of favourite products and keeps them saved in AsyncStorage.
import React, { createContext, useContext, useEffect, useState } from 'react';
import { KEYS, loadData, saveData } from '../services/storage';

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favouriteIds, setFavouriteIds] = useState([]);

  // Load saved favourites when the app starts
  useEffect(() => {
    loadData(KEYS.FAVOURITES, []).then((saved) => {
      setFavouriteIds(Array.isArray(saved) ? saved : []);
    });
  }, []);

  // Add if missing, remove if already there
  const toggleFavourite = (id) => {
    const updated = favouriteIds.includes(id)
      ? favouriteIds.filter((x) => x !== id)
      : [...favouriteIds, id];
    setFavouriteIds(updated);
    saveData(KEYS.FAVOURITES, updated);
  };

  const isFavourite = (id) => favouriteIds.includes(id);

  return (
    <FavouritesContext.Provider value={{ favouriteIds, toggleFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouritesContext);
