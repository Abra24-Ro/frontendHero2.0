import { Badge } from "../../components/ui/badge";
import { Heart, Trophy, Users, Zap } from "lucide-react";
import { HeroStatCard } from "./HeroStatCard";

import { useHeroSummary } from "../hooks/useHeroSummary";
import { use } from "react";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";

export const HeroStats = () => {
  const { summary } = useHeroSummary();
  const { favoriteCount } = use(FavoriteHeroContext);

  if (!summary)
    return <div className="text-2xl font-bold text-center">Loading...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {/* Total de personajes */}
      <HeroStatCard
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        nombre="Total de Personajes"
      >
        <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {summary?.heroCount} Héroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary?.villainCount} Villanos
          </Badge>
        </div>
      </HeroStatCard>

      {/* Favoritos */}
      <HeroStatCard
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
        nombre="Favoritos"
      >
        {/* /TODO: */}
        <div className="text-2xl font-bold text-red-600" data-testid="favorite-count">{favoriteCount}</div>
        <p className="text-xs text-muted-foreground" data-testid="percentage-favorite">
          {((favoriteCount / summary?.totalHeroes) * 100).toFixed(2)}% de tus
          favoritos
        </p>
      </HeroStatCard>

      {/* Más fuerte */}
      <HeroStatCard
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
        nombre="Más fuerte"
      >
        <div className="text-2xl font-bold">{summary?.strongestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Fuerza: {summary?.strongestHero.strength}
        </p>
      </HeroStatCard>

      {/* Más inteligente */}
      <HeroStatCard
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
        nombre="Más inteligente"
      >
        <div className="text-2xl font-bold">{summary?.smartestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Inteligencia: {summary?.smartestHero.intelligence}
        </p>
      </HeroStatCard>
    </div>
  );
};
