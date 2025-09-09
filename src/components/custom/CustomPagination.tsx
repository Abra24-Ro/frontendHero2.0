import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

interface CustomPaginationProps {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: CustomPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Ahora sí existe .get
  const queryPage = searchParams.get("page") || "1";

  const page = isNaN(+queryPage) ? 1 : +queryPage;

  const handleChangePage = (newPage: number) => {
    if (page < 1 || page > totalPages) return;
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handleChangePage(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Anteriores
      </Button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          variant={page === index + 1 ? "default" : "outline"}
          size="sm"
          onClick={() => handleChangePage(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handleChangePage(page + 1)}
      >
        Siguientes
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
