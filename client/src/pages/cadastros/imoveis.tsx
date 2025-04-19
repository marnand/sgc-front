import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "wouter";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Property } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { 
  ChevronDown, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash, 
  FileDown,
  LayoutGrid,
  List
} from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Imoveis() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  // Mock data (would be replaced by API call)
  const imoveis: Property[] = [
    {
      id: "1",
      title: "Apartamento 302, Ed. Solar",
      type: "Residencial",
      status: "Disponível",
      address: {
        street: "Rua das Flores",
        number: "123",
        neighborhood: "Jardim Primavera",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567"
      },
      features: {
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        parkingSpaces: 1,
        hasElevator: true,
        yearBuilt: 2015
      },
      financials: {
        rentalPrice: 1850,
        iptu: 120,
        condoFee: 450
      },
      ownerId: "1",
      images: ["/images/apt1.jpg"],
      createdAt: "2023-01-15T10:30:00Z",
      updatedAt: "2023-06-20T14:45:00Z"
    },
    {
      id: "2",
      title: "Casa 15, Cond. Verde",
      type: "Residencial",
      status: "Alugado",
      address: {
        street: "Rua dos Ipês",
        number: "15",
        complement: "Condomínio Verde",
        neighborhood: "Morumbi",
        city: "São Paulo",
        state: "SP",
        zipCode: "05651-170"
      },
      features: {
        area: 140,
        bedrooms: 3,
        bathrooms: 2,
        parkingSpaces: 2,
        yearBuilt: 2018
      },
      financials: {
        rentalPrice: 3500,
        iptu: 250,
        condoFee: 600
      },
      ownerId: "2",
      createdAt: "2022-11-10T09:15:00Z",
      updatedAt: "2023-07-05T11:20:00Z"
    },
    {
      id: "3",
      title: "Loja 45, Shop. Central",
      type: "Comercial",
      status: "Disponível",
      address: {
        street: "Av. Paulista",
        number: "1000",
        complement: "Loja 45",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-100"
      },
      features: {
        area: 65,
        hasElevator: true,
        yearBuilt: 2010
      },
      financials: {
        rentalPrice: 4200,
        iptu: 350,
        condoFee: 800
      },
      ownerId: "3",
      createdAt: "2023-02-20T14:30:00Z",
      updatedAt: "2023-06-15T16:10:00Z"
    },
    {
      id: "4",
      title: "Galpão Industrial 78",
      type: "Industrial",
      status: "Em manutenção",
      address: {
        street: "Rodovia Anchieta",
        number: "500",
        neighborhood: "Área Industrial",
        city: "São Bernardo do Campo",
        state: "SP",
        zipCode: "09696-000"
      },
      features: {
        area: 800,
        yearBuilt: 2005
      },
      financials: {
        rentalPrice: 15000,
        iptu: 1200
      },
      ownerId: "3",
      createdAt: "2022-10-05T10:45:00Z",
      updatedAt: "2023-05-30T09:30:00Z"
    },
    {
      id: "5",
      title: "Sala 501, Ed. Empresarial",
      type: "Comercial",
      status: "Alugado",
      address: {
        street: "Av. Brigadeiro Faria Lima",
        number: "3500",
        complement: "Sala 501",
        neighborhood: "Itaim Bibi",
        city: "São Paulo",
        state: "SP",
        zipCode: "04538-132"
      },
      features: {
        area: 45,
        hasElevator: true,
        yearBuilt: 2016,
        parkingSpaces: 1
      },
      financials: {
        rentalPrice: 5800,
        iptu: 400,
        condoFee: 900
      },
      ownerId: "2",
      createdAt: "2022-12-18T11:20:00Z",
      updatedAt: "2023-07-10T15:35:00Z"
    }
  ];
  
  // Filter properties based on search term and filters
  const filteredImoveis = imoveis.filter(imovel => {
    const matchesSearch = 
      imovel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      imovel.address.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
      imovel.address.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      imovel.address.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || imovel.status === statusFilter;
    const matchesType = typeFilter === "all" || imovel.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Calculate pagination
  const itemsPerPage = viewMode === "list" ? 10 : 8;
  const totalPages = Math.ceil(filteredImoveis.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedImoveis = filteredImoveis.slice(startIndex, endIndex);
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Disponível":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Alugado":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Em manutenção":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Vendido":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };
  
  return (
    <AppShell>
      <div className="flex flex-col space-y-6">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Cadastro de Imóveis</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie os imóveis disponíveis, alugados ou em manutenção
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex gap-2 items-center">
              <FileDown className="h-4 w-4" />
              Exportar
            </Button>
            <Link href="/imoveis/cadastro">
              <Button className="flex gap-2 items-center">
                <Plus className="h-4 w-4" />
                Novo Imóvel
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Search and filter */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por título, endereço ou bairro..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === "list" ? "default" : "outline"} 
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "grid" ? "default" : "outline"} 
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="Disponível">Disponível</SelectItem>
                <SelectItem value="Alugado">Alugado</SelectItem>
                <SelectItem value="Em manutenção">Em manutenção</SelectItem>
                <SelectItem value="Vendido">Vendido</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="Residencial">Residencial</SelectItem>
                <SelectItem value="Comercial">Comercial</SelectItem>
                <SelectItem value="Industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex gap-2 items-center">
              <Filter className="h-4 w-4" />
              Mais Filtros
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Table View */}
        {viewMode === "list" ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedImoveis.length > 0 ? (
                  displayedImoveis.map((imovel) => (
                    <TableRow key={imovel.id}>
                      <TableCell className="font-medium">{imovel.title}</TableCell>
                      <TableCell>
                        <div>{imovel.address.street}, {imovel.address.number}</div>
                        <div className="text-sm text-muted-foreground">
                          {imovel.address.neighborhood}, {imovel.address.city}/{imovel.address.state}
                        </div>
                      </TableCell>
                      <TableCell>{imovel.type}</TableCell>
                      <TableCell>
                        {imovel.financials.rentalPrice ? (
                          <div>
                            <div>{formatCurrency(imovel.financials.rentalPrice)}</div>
                            <div className="text-sm text-muted-foreground">
                              IPTU: {formatCurrency(imovel.financials.iptu)}
                              {imovel.financials.condoFee && ` | Cond: ${formatCurrency(imovel.financials.condoFee)}`}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Não disponível</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(imovel.status)}>
                          {imovel.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex gap-2 items-center">
                              <Eye className="h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2 items-center">
                              <Edit className="h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2 items-center text-destructive">
                              <Trash className="h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Nenhum imóvel encontrado com os critérios de busca
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedImoveis.length > 0 ? (
              displayedImoveis.map((imovel) => (
                <Card key={imovel.id} className="overflow-hidden">
                  <div className="h-48 bg-muted flex items-center justify-center">
                    {imovel.images && imovel.images.length > 0 ? (
                      <img 
                        src={imovel.images[0]} 
                        alt={imovel.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-muted-foreground flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 22V12h6v10"
                          />
                        </svg>
                        <span>Sem imagem</span>
                      </div>
                    )}
                    <Badge className={cn("absolute top-2 right-2", getStatusBadgeClass(imovel.status))}>
                      {imovel.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <h3 className="font-medium truncate">{imovel.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {imovel.address.neighborhood}, {imovel.address.city}/{imovel.address.state}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <Badge variant="outline">{imovel.type}</Badge>
                        <div className="mt-2 text-sm">
                          {imovel.features.area} m² 
                          {imovel.features.bedrooms && ` • ${imovel.features.bedrooms} dorm`}
                          {imovel.features.bathrooms && ` • ${imovel.features.bathrooms} banh`}
                        </div>
                      </div>
                      <div className="text-right">
                        {imovel.financials.rentalPrice ? (
                          <div className="font-medium">
                            {formatCurrency(imovel.financials.rentalPrice)}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Não disponível</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                Nenhum imóvel encontrado com os critérios de busca
              </div>
            )}
          </div>
        )}
        
        {/* Pagination */}
        {filteredImoveis.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1} a {Math.min(endIndex, filteredImoveis.length)} de {filteredImoveis.length} registros
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#" 
                      isActive={currentPage === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {totalPages > 3 && (
                  <>
                    <PaginationItem>
                      <div className="flex h-10 w-10 items-center justify-center">
                        ...
                      </div>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(totalPages);
                        }}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </AppShell>
  );
}
