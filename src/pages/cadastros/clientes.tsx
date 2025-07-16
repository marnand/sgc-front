import AppShell from "@/components/layout/AppShell";
import { useEffect, useState } from "react";
import PageHeader from "@/components/clientes/PageHeader";
import { CustomerTable } from "@/components/clientes/CustomerTable";
import { TableCustomer } from "@/types/types-customer";
import { AddCustomerDialog } from "@/components/clientes/AddCustomerDialog";
import { usePagination } from "@/hooks/use-pagination";
import { ChevronDown, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CorePagination } from "@/components/core/CorePagination";
import { useGetAllCustomers } from "@/services/queries/useCustomer";

export default function Clientes() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("add");
  const [selectedCustomer, setSelectedCustomer] = useState<TableCustomer | null>(null);

  const { data: customers } = useGetAllCustomers()

  useEffect(() => {
    console.log('customers', customers)
  }, [customers]);

  // Mock data (would be replaced by API call)
  const clientes: TableCustomer[] = [
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
      }
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
      }
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
      }
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
      }
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
      }
    }
  ];

  // Filter clientes based on search term
  const filteredClientes = clientes.filter(cliente =>
    cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    displayedItems: displayedClientes,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex
  } = usePagination(filteredClientes);

  const handleViewCustomer = (customer: TableCustomer) => {
    setSelectedCustomer(customer);
    setDialogMode("view");
    setIsAddDialogOpen(true);
  };

  const handleEditCustomer = (customer: TableCustomer) => {
    setSelectedCustomer(customer);
    setDialogMode("edit");
    setIsAddDialogOpen(true);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setDialogMode("add");
    setIsAddDialogOpen(true);
  };

  const handleDeleteCustomer = (customer: TableCustomer) => {
    // Implementar exclusão do cliente
    console.log("Excluir cliente:", customer);
  };

  return (
    <AppShell>
      <div className="flex flex-col space-y-6">
        <PageHeader onAddClick={() => handleAddCustomer()} />

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
        <CustomerTable
          customers={displayedClientes}
          onView={handleViewCustomer}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
        />

        {/* Pagination */}
        <CorePagination
          filteredItems={filteredClientes}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
        />

        {/* New User Modal */}
        <AddCustomerDialog
          open={isAddDialogOpen}
          mode={dialogMode}
          customer={selectedCustomer}
          onOpenChange={setIsAddDialogOpen}
        />
      </div>
    </AppShell>
  )
}
