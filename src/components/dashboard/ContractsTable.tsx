import { Contract } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials, formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ContractsTableProps {
  contracts: Contract[];
  totalContracts: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function ContractsTable({
  contracts,
  totalContracts,
  currentPage,
  onPageChange,
}: ContractsTableProps) {
  const pageSize = 4;
  const totalPages = Math.ceil(totalContracts / pageSize);
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "Pendente":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "Atrasado":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      case "Cancelado":
        return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200";
      case "Finalizado":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <Card className="border border-border dark:border-border">
      <CardHeader className="px-4 py-3 border-b border-border flex flex-row items-center justify-between space-y-0">
        <CardTitle className="font-medium text-base">Contratos Recentes</CardTitle>
        <a href="#" className="text-sm text-primary dark:text-primary-foreground hover:underline">
          Ver todos
        </a>
      </CardHeader>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Cliente
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Imóvel
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Valor
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
                      {getInitials(contract.client.name)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">
                        {contract.client.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {contract.client.documentType}: {contract.client.documentNumber}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm">{contract.property.title}</div>
                  <div className="text-xs text-muted-foreground">{contract.property.address}</div>
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm">{formatCurrency(contract.value)}</div>
                  <div className="text-xs text-muted-foreground">{contract.period}</div>
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap">
                  <span className={cn(
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                    getStatusBadgeClass(contract.status)
                  )}>
                    {contract.status}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap text-right text-sm">
                  <Button variant="ghost" size="icon">
                    <EyeIcon className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <PencilIcon className="h-4 w-4 text-muted-foreground hover:text-primary" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CardContent className="px-4 py-3 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Mostrando <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> a{" "}
              <span className="font-medium">{Math.min(currentPage * pageSize, totalContracts)}</span> de{" "}
              <span className="font-medium">{totalContracts}</span> resultados
            </p>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) onPageChange(currentPage - 1);
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
                      onPageChange(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {totalPages > 3 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(totalPages);
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
                    if (currentPage < totalPages) onPageChange(currentPage + 1);
                  }} 
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
