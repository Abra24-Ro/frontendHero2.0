import { Heart } from "lucide-react";
import { CustomJumbotron } from "../../components/custom/CustomJumbotron";
import { HeroStats } from "../components/HeroStats";
import { HeroGrid } from "../components/HeroGrid";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import { use, useMemo } from "react";
import { CustomPagination } from "../../components/custom/CustomPagination";
import { CustomBreadcrumb } from "../../components/custom/CustomBreadcrumb";
import { useSearchParams } from "react-router";
import { useHeroSummary } from "../hooks/useHeroSummary";
import { usePaginationHero } from "../hooks/usePaginationHero";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";

type Tab = "all" | "favorites" | "heroes" | "villains";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { summary } = useHeroSummary();
  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const activeTab = searchParams.get("tab") ?? ("all" as Tab);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? (activeTab as Tab) : "all";
  }, [activeTab]);

  // Función helper para cambiar tabs y actualizar parámetros
  const handleTabChange = (tab: Tab, categoryValue: string) => {
    setSearchParams((prev) => {
      prev.set("tab", tab);
      prev.set("category", categoryValue);
      prev.set("page", "1"); // Siempre resetear a página 1 al cambiar tab
      return prev;
    });
  };

  // usePaginationHero
  const { heroes, heroResponse } = usePaginationHero({ page, limit, category });

  // Debug temporal (puedes quitar después)

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          titulo="Universo de Héroes y Villanos"
          descripcion="Explora, descubre y administra a tus personajes favoritos en un solo lugar."
        />
        <CustomBreadcrumb
          breadcrumbs={[{ label: "Super héroes", to: "/search" }]}
        />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() => handleTabChange("all", "all")}
            >
              Todos ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              onClick={() => handleTabChange("favorites", "all")}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Favoritos ({favoriteCount})
            </TabsTrigger>

            <TabsTrigger
              value="heroes"
              onClick={() => handleTabChange("heroes", "hero")}
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>

            <TabsTrigger
              value="villains"
              onClick={() => handleTabChange("villains", "villain")}
            >
              Villanos ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Hero Grid */}
            <HeroGrid heroes={heroes} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* mostrar personajes favoritos */}

            {favoriteCount > 0 && (
              <h2 className="text-muted-foreground text-center">
                Héroes favoritos
              </h2>
            )}

            {favoriteCount === 0 && (
              <p className="text-muted-foreground text-center">
                No tienes héroes favoritos aún.
              </p>
            )}
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* mostrar heroes */}
            <h2 className="text-muted-foreground text-center">Héroes</h2>
            <HeroGrid heroes={heroes || []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* mostrar villanos */}
            <h2 className="text-muted-foreground text-center">Villanos</h2>
            <HeroGrid heroes={heroes || []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {selectedTab !== "favorites" && (
          <CustomPagination totalPages={heroResponse?.pages || 1} />
        )}
      </>
    </>
  );
};
