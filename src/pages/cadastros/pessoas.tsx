import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Person } from "@/lib/types";
import { formatCPF, formatCNPJ } from "@/lib/utils";
import { 
  ChevronDown, 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash, 
  FileDown 
} from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

export default function Pessoas() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data (would be replaced by API call)
  const pessoas: Person[] = [
    {
      id: "1",
      name: "João Silva",
      type: "Física",
      documentType: "CPF",
      documentNumber: "123.456.789-00",
      email: "joao.silva@email.com",
      phone: "(11) 98765-4321",
      address: {
        street: "Rua das Flores",
        number: "123",
        neighborhood: "Jardim Primavera",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567"
      },
      createdAt: "2023-01-15T10:30:00Z",
      updatedAt: "2023-06-20T14:45:00Z"
    },
    {
      id: "2",
      name: "Maria Oliveira",
      type: "Física",
      documentType: "CPF",
      documentNumber: "987.654.321-00",
      email: "maria.oliveira@email.com",
      phone: "(11) 91234-5678",
      address: {
        street: "Avenida Paulista",
        number: "1000",
        complement: "Apto 502",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-100"
      },
      createdAt: "2023-02-10T09:15:00Z",
      updatedAt: "2023-05-18T11:20:00Z"
    },
    {
      id: "3",
      name: "Imobiliária Central LTDA",
      type: "Jurídica",
      documentType: "CNPJ",
      documentNumber: "12.345.678/0001-90",
      email: "contato@imobiliariacentral.com",
      phone: "(11) 3456-7890",
      address: {
        street: "Rua Vergueiro",
        number: "500",
        complement: "Sala 304",
        neighborhood: "Liberdade",
        city: "São Paulo",
        state: "SP",
        zipCode: "01504-001"
      },
      bankDetails: {
        bank: "Banco do Brasil",
        agency: "1234",
        account: "56789-0",
        accountType: "Corrente"
      },
      createdAt: "2022-11-05T14:30:00Z",
      updatedAt: "2023-07-02T16:10:00Z"
    },
    {
      id: "4",
      name: "Ana Beatriz Santos",
      type: "Física",
      documentType: "CPF",
      documentNumber: "456.789.123-00",
      email: "ana.santos@email.com",
      phone: "(11) 97654-3210",
      address: {
        street: "Rua Augusta",
        number: "782",
        neighborhood: "Consolação",
        city: "São Paulo",
        state: "SP",
        zipCode: "01304-001"
      },
      createdAt: "2023-03-25T10:45:00Z",
      updatedAt: "2023-06-30T09:30:00Z"
    },
    {
      id: "5",
      name: "Construtora Horizonte S.A.",
      type: "Jurídica",
      documentType: "CNPJ",
      documentNumber: "98.765.432/0001-10",
      email: "contato@horizonteconstrutora.com",
      phone: "(11) 2345-6789",
      address: {
        street: "Avenida Brigadeiro Faria Lima",
        number: "3500",
        complement: "Andar 12",
        neighborhood: "Itaim Bibi",
        city: "São Paulo",
        state: "SP",
        zipCode: "04538-132"
      },
      bankDetails: {
        bank: "Itaú",
        agency: "4567",
        account: "12345-6",
        accountType: "Corrente"
      },
      createdAt: "2022-10-18T11:20:00Z",
      updatedAt: "2023-07-10T15:35:00Z"
    }
  ];
  
  // Filter pessoas based on search term
  const filteredPessoas = pessoas.filter(pessoa => 
    pessoa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pessoa.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pessoa.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredPessoas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedPessoas = filteredPessoas.slice(startIndex, endIndex);
  
  return (
    <AppShell>
      <div className="flex flex-col space-y-6">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Cadastro de Pessoas</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie clientes, locadores, locatários e empresas
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex gap-2 items-center">
              <FileDown className="h-4 w-4" />
              Exportar
            </Button>
            <Button className="flex gap-2 items-center">
              <Plus className="h-4 w-4" />
              Nova Pessoa
            </Button>
          </div>
        </div>
        
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nome, documento ou email..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex gap-2 items-center">
            <Filter className="h-4 w-4" />
            Filtros
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Cidade/UF</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedPessoas.length > 0 ? (
                displayedPessoas.map((pessoa) => (
                  <TableRow key={pessoa.id}>
                    <TableCell className="font-medium">{pessoa.name}</TableCell>
                    <TableCell>{pessoa.type}</TableCell>
                    <TableCell>
                      {pessoa.documentType === "CPF" 
                        ? formatCPF(pessoa.documentNumber) 
                        : formatCNPJ(pessoa.documentNumber)}
                    </TableCell>
                    <TableCell>
                      <div>{pessoa.email}</div>
                      <div className="text-sm text-muted-foreground">{pessoa.phone}</div>
                    </TableCell>
                    <TableCell>
                      {pessoa.address.city}/{pessoa.address.state}
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
                    Nenhuma pessoa encontrada com os critérios de busca
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {filteredPessoas.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1} a {Math.min(endIndex, filteredPessoas.length)} de {filteredPessoas.length} registros
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
