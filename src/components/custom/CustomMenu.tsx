import { Link, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

export function CustomMenu() {
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <NavigationMenu className="w-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <NavigationMenuList className="flex gap-10 px-8 py-4 items-center justify-center">
        {[
          { label: "Inicio", path: "/" },
          { label: "Superhéroes", path: "/search" },
        ].map(({ label, path }) => (
          <NavigationMenuItem key={path}>
            <NavigationMenuLink asChild>
              <Link
                to={path}
                className={`
                  relative text-base font-medium tracking-wide transition-colors duration-300
                  ${
                    isActive(path)
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  }
                `}
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300
                    ${
                      isActive(path)
                        ? "w-full bg-green-600 dark:bg-green-400"
                        : "w-0 bg-transparent group-hover:w-full group-hover:bg-green-600 dark:group-hover:bg-green-400"
                    }`}
                />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
