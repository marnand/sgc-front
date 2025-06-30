import { formatCNPJ, formatCPF } from "@/lib/utils";
import { CoreTable, Column, Action } from "@/components/core/CoreTable";
import { Eye, Edit, Trash } from "lucide-react";
import { Customer } from "@/types/types-customer";

interface CustomerTableProps {
  customers: Customer[];
  onView?: (customer: Customer) => void;
  onEdit?: (customer: Customer) => void;
  onDelete?: (customer: Customer) => void;
}

export function CustomerTable({
  customers,
  onView,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  const columns: Column<Customer>[] = [
    {
      header: "Nome",
      accessor: "name",
      className: "font-medium",
    },
    {
      header: "Tipo",
      accessor: "type",
    },
    {
      header: "Documento",
      accessor: (customer) =>
        customer.documentType === "CPF"
          ? formatCPF(customer.documentNumber)
          : formatCNPJ(customer.documentNumber),
    },
    {
      header: "Contato",
      accessor: (customer) => (
        <div>
          <div>{customer.email}</div>
          <div className="text-sm text-muted-foreground">{customer.phone}</div>
        </div>
      ),
    },
    {
      header: "Cidade/UF",
      accessor: (customer) => `${customer.address.city}/${customer.address.state}`,
    },
  ];

  const actions: Action<Customer>[] = [
    onView && {
      icon: <Eye className="h-4 w-4" />,
      label: "Visualizar",
      onClick: onView,
    },
    onEdit && {
      icon: <Edit className="h-4 w-4" />,
      label: "Editar",
      onClick: onEdit,
    },
    onDelete && {
      icon: <Trash className="h-4 w-4" />,
      label: "Excluir",
      onClick: onDelete,
      className: "text-destructive",
    },
  ].filter(Boolean) as Action<Customer>[];

  return (
    <CoreTable<Customer>
      data={customers}
      columns={columns}
      actions={actions}
      emptyMessage="Nenhum cliente encontrado com os critérios de busca"
    />
  );
}