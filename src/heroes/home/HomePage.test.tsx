import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginationHero } from "../hooks/usePaginationHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach } from "node:test";
import { FavoriteHeroProvider } from "../context/FavoriteHeroContext";

vi.mock("../hooks/usePaginationHero");

const mockUserPaginationHero = vi.mocked(usePaginationHero);

mockUserPaginationHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof usePaginationHero>);

const queryCliente = new QueryClient();

const renderHomePage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryCliente}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>
  );
};

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("should render home page with defaults values", () => {
    const { container } = renderHomePage();

    expect(container).toMatchSnapshot();
  });

  test("should call usePaginationHero with default values", () => {
    renderHomePage();

    expect(mockUserPaginationHero).toHaveBeenCalledWith({
      page: "1",
      limit: "6",
      category: "all",
    });
  });

  test("should call usePaginationHero with custom QUERY params", () => {
    renderHomePage(["/?page=2&limit=10&category=villains"]);

    expect(mockUserPaginationHero).toHaveBeenCalledWith({
      page: "2",
      limit: "10",
      category: "villains",
    });
  });

  test("should called usePaginationHero with  default page and same limit on tab", () => {
    renderHomePage(["/?tab=favorites&limit=10"]);

    const [, , , villainsTab] = screen.getAllByRole("tab");

    fireEvent.click(villainsTab);

    expect(mockUserPaginationHero).toHaveBeenCalledWith({
      category: "villain",
      limit: "10",
      page: "1",
    });
  });
});
