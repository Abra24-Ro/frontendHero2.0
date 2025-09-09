import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { HeroStats } from "./HeroStats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHeroSummary } from "../hooks/useHeroSummary";
import type { SummaryInformationResponse } from "../types/summary-information-response";
import { FavoriteHeroProvider } from "../context/FavoriteHeroContext";

vi.mock("../hooks/useHeroSummary");

const mockUseHeroSummary = vi.mocked(useHeroSummary);

const mockHero = {
  id: "1",
  name: "Clark Kent",
  slug: "clark-kent",
  alias: "Superman",
  powers: [
    "Súper fuerza",
    "Vuelo",
    "Visión de calor",
    "Visión de rayos X",
    "Invulnerabilidad",
    "Súper velocidad",
  ],
};

const mockSummaryData = {
  totalHeroes: 25,
  strongestHero: {
    id: "1",
    name: "Clark Kent",
    slug: "clark-kent",
    alias: "Superman",
    powers: [
      "Súper fuerza",
      "Vuelo",
      "Visión de calor",
      "Visión de rayos X",
      "Invulnerabilidad",
      "Súper velocidad",
    ],
    description:
      "El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.",
    strength: 10,
    intelligence: 8,
    speed: 9,
    durability: 10,
    team: "Liga de la Justicia",
    image: "1.jpeg",
    firstAppearance: "1938",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  smartestHero: {
    id: "2",
    name: "Bruce Wayne",
    slug: "bruce-wayne",
    alias: "Batman",
    powers: [
      "Artes marciales",
      "Habilidades de detective",
      "Tecnología avanzada",
      "Sigilo",
      "Genio táctico",
    ],
    description:
      "El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.",
    strength: 6,
    intelligence: 10,
    speed: 6,
    durability: 7,
    team: "Liga de la Justicia",
    image: "2.jpeg",
    firstAppearance: "1939",
    status: "Active",
    category: "Hero",
    universe: "DC",
  },
  heroCount: 18,
  villainCount: 7,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderHeroStats = (mockData?: Partial<SummaryInformationResponse>) => {
  if (mockData) {
    mockUseHeroSummary.mockReturnValue({
      summary: mockData,
    } as unknown as ReturnType<typeof useHeroSummary>);
  } else {
    mockUseHeroSummary.mockReturnValue({
      summary: undefined,
    } as unknown as ReturnType<typeof useHeroSummary>);
  }

  return render(
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <HeroStats />
      </FavoriteHeroProvider>
    </QueryClientProvider>
  );
};

describe("HeroStats", () => {
  test("should render component with default values", () => {
    const { container } = renderHeroStats();

    expect(container).toMatchSnapshot();

    expect(screen.getByText("Loading...")).toBeDefined();
  });

  test("should render component with mock  data", () => {
    const { container } = renderHeroStats(mockSummaryData);
    // screen.debug();

    expect(container).toMatchSnapshot();
    expect(screen.getByText("Total de Personajes")).toBeDefined();
    expect(screen.getByText("Favoritos")).toBeDefined();
    expect(screen.getByText("Más fuerte")).toBeDefined();
    expect(screen.getByText("Más inteligente")).toBeDefined();
  });

  test("should change the percentage of favorites when a hero is favorited", () => {
    localStorage.setItem("favoriteHeroes", JSON.stringify([mockHero]));
    renderHeroStats(mockSummaryData);

    const favoritesPercentage = screen.getByTestId("percentage-favorite");
    expect(favoritesPercentage.innerHTML).toContain("4.00%");

    const favoriteCountElement = screen.getByTestId("favorite-count");
    expect(favoriteCountElement.innerHTML).toBe("1");
    screen.debug();
  });
});
