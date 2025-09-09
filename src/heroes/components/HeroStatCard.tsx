import type { JSX, PropsWithChildren } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface HeroCardProps extends PropsWithChildren {
  icon: JSX.Element;
  nombre: string;

}

export const HeroStatCard = ({ icon, nombre, children }: HeroCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{nombre}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
