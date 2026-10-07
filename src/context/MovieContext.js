import React, { createContext, useState, useEffect } from 'react';

// Create a context for managing global movie state (like favorites).
export const MovieContext = createContext();

/**
 * Provider component that wraps the application to supply global movie context.
 * Manages the user's favorite movies list and persists it to local storage.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children The nested components to receive context.
 * @returns {JSX.Element}
 */
export const MovieProvider = ({ children }) => {
  // Initialize state from local storage to persist data across sessions.
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Effect hook to sync state changes to local storage whenever 'favorites' updates.
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Toggles a movie's favorite status. 
   * If the movie exists in the state, it is removed; otherwise, it is added.
   *
   * @param {object} movie The movie object to toggle.
   */
  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === movie.id)) {
        return prev.filter((f) => f.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  return (
    <MovieContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </MovieContext.Provider>
  );
};