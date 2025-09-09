import { Heart, Eye, Zap, Brain, Gauge, Shield } from "lucide-react";
import { Button } from "../../components/ui/button";
import { CardContent, Card, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import type { Hero } from "../types/hero.interface";
import { useNavigate } from "react-router";
import { use } from "react";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";

interface HeroGridCardProps {
  hero: Hero;
}

export const HeroGridCard = ({ hero }: HeroGridCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = use(FavoriteHeroContext);

  const handleClick = () => {
    navigate(`/heroes/${hero.slug}`);
  };

  const {
    name,
    universe,
    image,
    status,
    firstAppearance,
    powers,
    team,
    alias,
    category,
    description,
    strength,
    intelligence,
    speed,
    durability,
  } = hero;

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 rounded-2xl mt-2">
      {/* Imagen */}
      <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden">
        <img
          onClick={handleClick}
          src={image}
          alt={`Image of ${name}`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 cursor-pointer"
        />

        {/* Status */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${
              status === "Active" ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          <Badge
            variant="secondary"
            className="text-xs bg-white/90 text-gray-700 shadow-sm"
          >
            {status}
          </Badge>
        </div>

        {/* Universo */}
        <Badge className="absolute top-3 right-3 text-xs bg-blue-600 text-white shadow">
          {universe}
        </Badge>

        {/* Botones */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white shadow rounded-full p-2"
          onClick={() => toggleFavorite(hero)}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite(hero) ? "text-red-500" : "text-gray-600"
            }`}
          />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 left-3 bg-white/90 hover:bg-white shadow rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      {/* Header */}
      <CardHeader className="py-3 z-10 bg-gray-100/50 backdrop-blur-sm relative top-1 group-hover:top-[-10px] transition-all duration-300">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1">
            <h3 className="font-bold text-lg leading-tight text-gray-900">
              {alias}
            </h3>
            <p className="text-sm text-gray-600">{name}</p>
          </div>
          <Badge className="text-xs bg-green-100 text-green-800 border border-green-200">
            {category}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit text-xs">
          {team}
        </Badge>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: "Strength",
              value: strength,
              icon: <Zap className="h-3 w-3 text-orange-500" />,
              color: "bg-orange-500",
            },
            {
              label: "Intelligence",
              value: intelligence,
              icon: <Brain className="h-3 w-3 text-blue-500" />,
              color: "bg-blue-500",
            },
            {
              label: "Speed",
              value: speed,
              icon: <Gauge className="h-3 w-3 text-green-500" />,
              color: "bg-green-500",
            },
            {
              label: "Durability",
              value: durability,
              icon: <Shield className="h-3 w-3 text-purple-500" />,
              color: "bg-purple-500",
            },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-1">
                {stat.icon}
                <span className="text-xs font-medium">{stat.value}</span>
              </div>
              <Progress value={stat.value * 10} className="h-2 rounded-full" />
            </div>
          ))}
        </div>

        {/* Powers */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-800">Powers</h4>
          <div className="flex flex-wrap gap-2">
            {powers.slice(0, 3).map((power, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs px-2 py-0.5"
              >
                {power}
              </Badge>
            ))}
            {powers.length > 3 && (
              <Badge variant="outline" className="text-xs bg-gray-100">
                +{powers.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 pt-3 border-t">
          {`First Appearance: ${firstAppearance}`}
        </div>
      </CardContent>
    </Card>
  );
};
