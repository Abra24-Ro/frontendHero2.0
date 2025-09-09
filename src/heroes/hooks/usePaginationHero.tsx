import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../api/get-heroes-by-page.action";

interface Props {
  page: string;
  limit: string;
  category?: string;
}

export const usePaginationHero = ({ page, limit, category = "all" }: Props) => {
  const {
    data: heroResponse,
    isLoading,
    isError,
    error,
    status,
  } = useQuery({
    queryKey: ["heroes", { page, limit, category }],
    queryFn: () => getHeroesByPageAction(+page, +limit, category),
  });

  const heroes = heroResponse?.heroes || [];

  return {
    heroes,
    heroResponse,
    isLoading,
    isError,
    error,
    status, // <-- esto permite que tu test funcione
  };
};
