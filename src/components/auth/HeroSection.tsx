import { Building } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="hidden md:flex md:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à IKASA Central</h1>
        <p className="text-lg mb-6">
          Sistema integrado para gestão de imóveis e contabilidade, substituindo múltiplas plataformas em uma única solução.
        </p>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="mr-4 p-2 bg-primary-foreground/10 rounded-lg">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Administração Imobiliária</h3>
              <p className="text-sm text-primary-foreground/80">
                Gerencie contratos, acompanhe locações e monitore o status dos imóveis.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-4 p-2 bg-primary-foreground/10 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">Gestão Financeira</h3>
              <p className="text-sm text-primary-foreground/80">
                Controle de contas a pagar, conciliação bancária e classificação de despesas.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="mr-4 p-2 bg-primary-foreground/10 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium mb-1">Relatórios e Dashboards</h3>
              <p className="text-sm text-primary-foreground/80">
                Painéis interativos personalizáveis com filtros avançados e visualizações gráficas de KPIs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}