import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface Options {
  name?: string;
  category?: string;
  team?: string;
  universe?: string;
  status?: string;
  strength?: string;
}

export const searchHeroesAction = async (options: Options = {}) => {
  const { name, category, team, universe, status, strength } = options;
  const optionsValided =
    !name && !category && !team && !universe && !status && !strength;

  if (optionsValided) return [];

  const { data } = await heroApi.get<Hero[]>("/search", {
    params: {
      name,
      category,
      team,
      universe,
      status,
      strength,
    },
  });

  return data.map((hero) => ({
    ...hero,
    image: `${VITE_API_URL}/images/${hero.image}`,
  }));
};
