import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { SlashIcon } from "lucide-react";

interface BreadcrumbData {
  label: string;
  to: string;
}


interface CustomBreadcrumbProps {
  currentPage?: string;
  breadcrumbs?: BreadcrumbData[];
}

export const CustomBreadcrumb = ({
  currentPage,
  breadcrumbs = [],
}: CustomBreadcrumbProps = {}) => {
  return (
    <Breadcrumb className="my-4">
      <BreadcrumbList className="flex items-center gap-2 text-sm font-medium text-gray-500">
        {/* Página de Inicio */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="transition-colors hover:text-green-600">
              Inicio
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Breadcrumbs intermedios */}
        {breadcrumbs.map((crumb, index) => (
          <>
            <BreadcrumbSeparator key={`separator-${index}`}>
              <SlashIcon className="h-4 w-4 text-gray-400" />
            </BreadcrumbSeparator>
            <BreadcrumbItem key={crumb.to}>
              <BreadcrumbLink asChild className="cursor-pointer">
                <Link
                 
                  to={crumb.to}
                  className="transition-colors cursor-pointer hover:text-green-600 "
                >
                  {crumb.label}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ))}

        {/* Página actual */}
        {currentPage && (
          <>
            <BreadcrumbSeparator>
              <SlashIcon className="h-4 w-4 text-gray-400" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="transition-colors text-black hover:text-green-600">
                {currentPage}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
