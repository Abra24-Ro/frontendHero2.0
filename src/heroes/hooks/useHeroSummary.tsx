import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";

export const useHeroSummary = () => {
  const { data: summary, ...query } = useQuery({
    queryKey: ["summary-information"],
    queryFn: getSummaryAction,
    staleTime: 1000 * 60 * 5,
  });

  return {
    summary,
    ...query, // <-- aquí tienes isLoading, isError, etc
  };
};
