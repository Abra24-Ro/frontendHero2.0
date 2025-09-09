import type { Hero } from "../types/hero.interface";
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

interface FavoriteHeroContextProps {
  // state
  favorites: Hero[];
  favoriteCount: number;

  // methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext(
  {} as FavoriteHeroContextProps
);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem("favoriteHeroes");
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage
  );

  const toggleFavorite = (hero: Hero) => {
    const heroExists = favorites.find((h) => h.id === hero.id);
    if (heroExists) {
      setFavorites(favorites.filter((h) => h.id !== hero.id));
      return;
    }
    setFavorites([...favorites, hero]);
  };
  const isFavorite = (hero: Hero) => favorites.some((h) => h.id === hero.id);

  useEffect(() => {
    localStorage.setItem("favoriteHeroes", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favorites,
        favoriteCount: favorites.length,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
