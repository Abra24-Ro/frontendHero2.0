import { useQuery } from "@tanstack/react-query";
import { CustomBreadcrumb } from "../../components/custom/CustomBreadcrumb";
import { CustomJumbotron } from "../../components/custom/CustomJumbotron";
import { HeroStats } from "../components/HeroStats";
import SearchControls from "./ui/SearchControls";
import { useSearchParams } from "react-router";
import { searchHeroesAction } from "../actions/search.heros.action";
import { HeroGrid } from "../components/HeroGrid";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") || "";
  const strength = searchParams.get("strength") || "";

  const { data: heroes = [] } = useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <>
      <CustomJumbotron
        titulo="Universo de Héroes y Villanos"
        descripcion="Explora, descubre y administra a tus personajes favoritos en un solo lugar."
      />

      <CustomBreadcrumb
        currentPage="Buscador de heroes"
        breadcrumbs={[
          { label: "Superhéroes", to: "/heroes" }, // Cambia a la ruta correcta de superhéroes
        ]}
      />

      <HeroStats />
      {/* filter and search */}
      <SearchControls />

      {/* heroes */}

      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;
