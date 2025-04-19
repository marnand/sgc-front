import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/use-auth";
import { getInitials } from "@/lib/utils";
import { useLocation } from "wouter";
import { 
  Menu, 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  User, 
  Settings, 
  LogOut
} from "lucide-react";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, logoutMutation } = useAuth();
  
  const getUserInitials = () => {
    if (!user) return "U";
    return getInitials(user.username);
  };
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  // Get page title based on current location
  const getPageTitle = () => {
    switch (true) {
      case location === "/":
        return "Dashboard";
      case location.startsWith("/cadastros/pessoas"):
        return "Cadastro de Pessoas";
      case location.startsWith("/cadastros/imoveis"):
        return "Cadastro de Imóveis";
      case location.startsWith("/imoveis/cadastro"):
        return "Novo Imóvel";
      case location.startsWith("/usuarios"):
        return "Gerenciamento de Usuários";
      default:
        return "IKASA Central";
    }
  };
  
  // Generate breadcrumbs based on current location
  const getBreadcrumbs = () => {
    const paths = location.split("/").filter(Boolean);
    
    if (paths.length === 0) {
      return [{ name: "Home", href: "/" }];
    }
    
    const breadcrumbs = [{ name: "Home", href: "/" }];
    let currentPath = "";
    
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      let name = path.charAt(0).toUpperCase() + path.slice(1);
      
      if (path === "cadastros") name = "Cadastros Básicos";
      if (path === "imoveis" && paths[index - 1] !== "cadastros") name = "Admin. Imobiliária";
      if (path === "pessoas") name = "Pessoas";
      
      breadcrumbs.push({
        name,
        href: currentPath,
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = getBreadcrumbs();
  
  return (
    <header className="h-16 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-4 sm:px-6 border-b">
      <div className="flex items-center md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center space-x-3">
        {/* Breadcrumbs */}
        <nav className="hidden md:flex">
          <ol className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href}>
                {index > 0 && <span className="mx-1">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {crumb.name}
                  </span>
                ) : (
                  <a
                    href={crumb.href}
                    className="hover:text-primary dark:hover:text-primary-foreground"
                  >
                    {crumb.name}
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:block relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="pl-9 w-60 bg-gray-50 dark:bg-gray-700"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1 right-1 h-4 w-4 bg-destructive rounded-full flex items-center justify-center text-white text-xs">
            3
          </span>
        </Button>

        {/* Theme toggle */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 focus:ring-0"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                {getUserInitials()}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.username || "Usuário"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Administrador
                </div>
              </div>
              <svg 
                className="h-4 w-4 text-gray-500 dark:text-gray-400" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Meu Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
