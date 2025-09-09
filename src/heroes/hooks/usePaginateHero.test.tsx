import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { usePaginationHero } from "./usePaginationHero";
import { getHeroesByPageAction } from "../api/get-heroes-by-page.action";
import { beforeEach } from "node:test";

vi.mock("../api/get-heroes-by-page.action", () => ({
  getHeroesByPageAction: vi.fn(),
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryCliente = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const tanStackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryCliente}>{children}</QueryClientProvider>
  );
};

describe("usePaginateHero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryCliente.clear();
  });

  test("should return the correct values", () => {
    const { result } = renderHook(
      () => usePaginationHero({ page: "1", limit: "6" }),
      {
        wrapper: tanStackCustomProvider(),
      }
    );

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
  });

  test("should return the success state with data when API CALL succeeds", async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };

    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook(
      () => usePaginationHero({ page: "1", limit: "6" }),
      { wrapper: tanStackCustomProvider() }
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.heroes).toEqual([]);
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "all");
  });

  test("should  call getHeroesByPageAction with Arguments", async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };

    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const { result } = renderHook(
      () => usePaginationHero({ page: "1", limit: "6", category: "heroes" }),
      { wrapper: tanStackCustomProvider() }
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.heroes).toEqual([]);
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "heroes");
  });
});
