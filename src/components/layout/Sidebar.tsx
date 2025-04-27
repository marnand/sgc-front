import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { Link } from "wouter";
import {
  ChartBar,
  UserCircle,
  Building,
  Receipt,
  FileText,
  Settings,
  CreditCard,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
}

interface SidebarSubmenuProps {
  icon: React.ReactNode;
  label: string;
  id: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function Sidebar() {
  const { isOpen } = useSidebar();
  const [location] = useLocation();

  return (
    <aside
      className={cn(
        "w-64 bg-white dark:bg-gray-800 shadow-md transition-all transform z-30 overflow-y-auto border-r",
        "fixed inset-y-0 left-0 lg:relative",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center px-4 border-b">
        <div className="text-2xl font-bold text-primary dark:text-primary-foreground">
          <span>IKASA</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
            Central
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="py-4">
        <ul>
          <SidebarItem
            icon={<ChartBar className="w-5 h-5" />}
            label="Dashboard"
            href="/"
            isActive={location === "/"}
          />

          <SidebarSubmenu
            icon={<UserCircle className="w-5 h-5" />}
            label="Cadastros Básicos"
            id="cadastros"
            isExpanded={location.startsWith("/cadastros")}
            onToggle={() => {}}
          >
            <li>
              <Link href="/cadastros/pessoas">
                <a className={cn(
                  "block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground",
                  location === "/cadastros/pessoas" && "text-primary dark:text-primary-foreground font-medium"
                )}>
                  Pessoas
                </a>
              </Link>
            </li>
            <li>
              <Link href="/cadastros/imoveis">
                <a className={cn(
                  "block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground",
                  location === "/cadastros/imoveis" && "text-primary dark:text-primary-foreground font-medium"
                )}>
                  Imóveis
                </a>
              </Link>
            </li>
            <li>
              <Link href="/cadastros/empresas">
                <a className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                  Empresas
                </a>
              </Link>
            </li>
            <li>
              <Link href="/cadastros/categorias">
                <a className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                  Categorias
                </a>
              </Link>
            </li>
          </SidebarSubmenu>

          <SidebarSubmenu
            icon={<CreditCard className="w-5 h-5" />}
            label="Gestão Financeira"
            id="financeiro"
            isExpanded={location.startsWith("/financeiro")}
            onToggle={() => {}}
          >
            <li>
              <Link href="/financeiro/contas-pagar">
                <a className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                  Contas a Pagar
                </a>
              </Link>
            </li>
            <li>
              <Link href="/financeiro/cobrancas">
                <a className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                  Cobranças
                </a>
              </Link>
            </li>
            <li>
              <Link href="/financeiro/conciliacao">
                <a className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                  Conciliação Bancária
                </a>
              </Link>
            </li>
            <li>
              <Link href="/financeiro/despesas">
                <a className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                  Despesas
                </a>
              </Link>
            </li>
          </SidebarSubmenu>

          <SidebarSubmenu
            icon={<Building className="w-5 h-5" />}
            label="Admin. Imobiliária"
            id="imoveis"
            isExpanded={location.startsWith("/imoveis")}
            onToggle={() => {}}
          >
            <li>
              <Link href="/imoveis/contratos">
                <a className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                  Contratos
                </a>
              </Link>
            </li>
            <li>
              <Link href="/imoveis/status">
                <a className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                  Status de Imóveis
                </a>
              </Link>
            </li>
            <li>
              <Link href="/imoveis/locacoes">
                <a className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                  Locações
                </a>
              </Link>
            </li>
            <li>
              <Link href="/imoveis/pagamentos">
                <a className="block py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                  Pagamentos e Repasses
                </a>
              </Link>
            </li>
          </SidebarSubmenu>

          <SidebarItem
            icon={<FileText className="w-5 h-5" />}
            label="Relatórios"
            href="/relatorios"
            isActive={location === "/relatorios"}
          />

          <SidebarItem
            icon={<Settings className="w-5 h-5" />}
            label="Configurações"
            href="/configuracoes"
            isActive={location === "/configuracoes"}
          />

          <SidebarItem
            icon={<UserCircle className="w-5 h-5" />}
            label="Usuários"
            href="/usuarios"
            isActive={location === "/usuarios"}
          />
        </ul>
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label, href, isActive }: SidebarItemProps) {
  return (
    <li>
      <Link href={href}>
        <a className={cn(
          "sidebar-item flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
          isActive && "active"
        )}>
          <span className="text-primary dark:text-primary-foreground mr-3">{icon}</span>
          <span>{label}</span>
        </a>
      </Link>
    </li>
  );
}

function SidebarSubmenu({ icon, label, id, isExpanded, onToggle, children }: SidebarSubmenuProps) {
  const { expandedItems, toggleExpandedItem } = useSidebar();
  const isOpen = expandedItems.includes(id) || isExpanded;

  return (
    <li>
      <div>
        <button
          type="button"
          onClick={() => toggleExpandedItem(id)}
          className="sidebar-item flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="flex items-center">
            <span className="text-primary dark:text-primary-foreground mr-3">{icon}</span>
            <span>{label}</span>
          </div>
          <svg
            className={cn(
              "w-4 h-4 transition-transform",
              isOpen && "transform rotate-180"
            )}
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
        </button>

        <ul className={cn(
          "pl-12 border-l border-gray-200 dark:border-gray-700 ml-4 transition-all",
          !isOpen && "hidden"
        )}>
          {children}
        </ul>
      </div>
    </li>
  );
}
