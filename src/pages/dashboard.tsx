import AppShell from "@/components/layout/AppShell";
import KpiCard from "@/components/dashboard/KpiCard";
import { KpiData, ActivityItem, Contract } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useState } from "react";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { ChartContainer, FinancialChart, PropertyDistributionChart } from "@/components/dashboard/ChartContainer";
import ContractsTable from "@/components/dashboard/ContractsTable";

export default function Dashboard() {
  const [period, setPeriod] = useState("today");
  const [contractsPage, setContractsPage] = useState(1);

  // KPI data
  const kpiData: KpiData[] = [
    {
      title: "Imóveis Disponíveis",
      value: "38",
      change: 5,
      changeType: "increase",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-500 dark:text-primary-300"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
      iconBgColor: "bg-primary-100 dark:bg-primary-900",
      iconColor: "text-primary-500 dark:text-primary-300"
    },
    {
      title: "Contratos Ativos",
      value: "72",
      change: 2.8,
      changeType: "increase",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-secondary-500 dark:text-green-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>',
      iconBgColor: "bg-secondary-100 dark:bg-green-900",
      iconColor: "text-secondary-500 dark:text-green-400"
    },
    {
      title: "Receita Mensal",
      value: "R$ 187.349",
      change: 8.1,
      changeType: "increase",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent-500 dark:text-amber-400"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2" y2="20"></line></svg>',
      iconBgColor: "bg-accent-100 dark:bg-amber-900",
      iconColor: "text-accent-500 dark:text-amber-400"
    },
    {
      title: "Taxa de Ocupação",
      value: "84.3%",
      change: 1.2,
      changeType: "decrease",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500 dark:text-sky-400"><circle cx="12" cy="12" r="10"></circle><polyline points="8 14 12 10 16 14"></polyline></svg>',
      iconBgColor: "bg-blue-100/20 dark:bg-sky-900",
      iconColor: "text-blue-500 dark:text-sky-400"
    }
  ];

  // Activity data
  const activityData: ActivityItem[] = [
    {
      id: "act1",
      type: "contract",
      title: "<span class='font-medium'>Contrato assinado</span> com o cliente <span class='font-medium'>Ana Mendes</span>",
      description: "Casa 15, Cond. Verde",
      timestamp: "2023-08-08T13:25:00",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      iconBgColor: "bg-green-500"
    },
    {
      id: "act2",
      type: "property",
      title: "<span class='font-medium'>Novo imóvel cadastrado</span> por <span class='font-medium'>Carlos Santos</span>",
      description: "Apt. 104, Ed. Aurora",
      timestamp: "2023-08-08T11:10:00",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
      iconBgColor: "bg-primary-500"
    },
    {
      id: "act3",
      type: "error",
      title: "<span class='font-medium'>Pagamento atrasado</span> de <span class='font-medium'>J&C Contabilidade</span>",
      description: "Vencimento: 05/08/2023 - R$ 5.800,00",
      timestamp: "2023-08-08T09:45:00",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
      iconBgColor: "bg-red-500"
    },
    {
      id: "act4",
      type: "payment",
      title: "<span class='font-medium'>Pagamento recebido</span> de <span class='font-medium'>Marcos Ribeiro</span>",
      description: "Aluguel Agosto - R$ 1.850,00",
      timestamp: "2023-08-07T16:20:00",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2" y2="20"></line></svg>',
      iconBgColor: "bg-amber-500"
    },
    {
      id: "act5",
      type: "user",
      title: "<span class='font-medium'>Novo usuário</span> <span class='font-medium'>Pedro Almeida</span> adicionado",
      description: "Função: Operador",
      timestamp: "2023-08-07T11:05:00",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
      iconBgColor: "bg-gray-500"
    }
  ];

  // Contracts data
  const contractsData: Contract[] = [
    {
      id: "con1",
      client: {
        id: "cli1",
        name: "Marcos Ribeiro",
        documentType: "CPF",
        documentNumber: "123.456.789-00"
      },
      property: {
        id: "prop1",
        title: "Apt. 302, Ed. Solar",
        address: "Centro, São Paulo"
      },
      value: 1850,
      period: "Mensal",
      status: "Ativo"
    },
    {
      id: "con2",
      client: {
        id: "cli2",
        name: "Café Sereno LTDA",
        documentType: "CNPJ",
        documentNumber: "12.345.678/0001-90"
      },
      property: {
        id: "prop2",
        title: "Loja 45, Shop. Central",
        address: "Pinheiros, São Paulo"
      },
      value: 4200,
      period: "Mensal",
      status: "Pendente"
    },
    {
      id: "con3",
      client: {
        id: "cli3",
        name: "Ana Mendes",
        documentType: "CPF",
        documentNumber: "987.654.321-00"
      },
      property: {
        id: "prop3",
        title: "Casa 15, Cond. Verde",
        address: "Morumbi, São Paulo"
      },
      value: 3500,
      period: "Mensal",
      status: "Ativo"
    },
    {
      id: "con4",
      client: {
        id: "cli4",
        name: "J&C Contabilidade",
        documentType: "CNPJ",
        documentNumber: "45.678.901/0001-23"
      },
      property: {
        id: "prop4",
        title: "Sala 501, Ed. Empresarial",
        address: "Vila Olímpia, São Paulo"
      },
      value: 5800,
      period: "Mensal",
      status: "Atrasado"
    }
  ];

  return (
    <AppShell>
      {/* Page title and actions */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Visão geral e indicadores principais
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mês</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>

          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} data={kpi} />
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main chart */}
        <ChartContainer
          title="Receita x Despesa (R$)"
          className="lg:col-span-2"
          action={
            <div className="flex space-x-2 text-sm">
              <Button variant="outline" size="sm" className="h-7">
                Diário
              </Button>
              <Button variant="secondary" size="sm" className="h-7">
                Mensal
              </Button>
              <Button variant="outline" size="sm" className="h-7">
                Anual
              </Button>
            </div>
          }
        >
          <FinancialChart />
        </ChartContainer>

        {/* Sidebar chart */}
        <ChartContainer
          title="Distribuição de Imóveis"
          action={
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </Button>
          }
        >
          <PropertyDistributionChart />

          {/* Legend */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span className="text-sm">Residencial</span>
              </div>
              <span className="text-sm font-medium">58%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
                <span className="text-sm">Comercial</span>
              </div>
              <span className="text-sm font-medium">27%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-accent mr-2"></div>
                <span className="text-sm">Industrial</span>
              </div>
              <span className="text-sm font-medium">15%</span>
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* Tables section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent contracts table */}
        <div className="lg:col-span-2">
          <ContractsTable
            contracts={contractsData}
            totalContracts={24}
            currentPage={contractsPage}
            onPageChange={setContractsPage}
          />
        </div>

        {/* Activity feed */}
        <div>
          <ActivityFeed activities={activityData} />
        </div>
      </div>
    </AppShell>
  );
}
