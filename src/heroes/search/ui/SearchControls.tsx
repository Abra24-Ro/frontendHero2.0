import { Filter, Grid, Plus, Search, SortAsc } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useRef } from "react";
import { useSearchParams } from "react-router";
import { Slider } from "../../../components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "../../../components/ui/accordion";

const SearchControls = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeAccordion = searchParams.get("active-accordion") || "";
  const selectedStrenght = Number(searchParams.get("strength") || "0");

  const setQueryParams = (name: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(name, value);
      prev.set("page", "1");
      return prev;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = inputRef.current?.value || "";
      setQueryParams("name", value);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Barra de búsqueda */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            ref={inputRef}
            placeholder="Buscar héroes, villanos, poderes, equipos..."
            aria-label="Buscar personajes"
            className="pl-12 h-12 text-lg bg-white focus:ring-2 focus:ring-blue-500"
            onKeyDown={handleKeyDown}
            defaultValue={searchParams.get("name") || ""}
          />
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <Button
            variant={
              activeAccordion === "advance-filters" ? "default" : "outline"
            }
            className="h-12 "
            onClick={() => {
              if (activeAccordion === "advance-filters") {
                // setQueryParams("active-accordion", "");
                setQueryParams("active-accordion", "");
                return;
              }
              setQueryParams("active-accordion", "advance-filters");
            }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>

          <Button variant="outline" className="h-12 ">
            <SortAsc className="h-4 w-4 mr-2" />
            Ordenar por nombre
          </Button>

          <Button variant="outline" className="h-12 ">
            <Grid className="h-4 w-4" />
          </Button>

          <Button className="h-12">
            <Plus className="h-4 w-4 mr-2" />
            Agregar personaje
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}

      <Accordion type="single" collapsible value={activeAccordion} data-testid="accordion">
        <AccordionItem value="advance-filters">
          {/* <AccordionTrigger>F</AccordionTrigger> */}
          <AccordionContent>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              {/* Encabezado */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filtros Avanzados</h3>
                <Button variant="ghost">Limpiar todo</Button>
              </div>

              {/* Filtros en grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Equipo</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    Todos los equipos
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    Todas las categorías
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Universo</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    Todos los universos
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    Todos los estados
                  </div>
                </div>
              </div>

              {/* Filtro de fuerza */}
              <div className="mt-4">
                <label className="text-sm font-medium">
                  Fuerza mínima: {selectedStrenght}/10
                </label>
                <Slider
                  defaultValue={[selectedStrenght]}
                  onValueChange={(value) =>
                    setQueryParams("strength", value[0].toString())
                  }
                  max={10}
                  step={1}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default SearchControls;
