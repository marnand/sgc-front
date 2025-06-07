import { FileDown, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface PageHeaderProps {
  onAddClick: () => void;
}

export default function PageHeader({ onAddClick }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">Cadastro de Clientes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie clientes, locadores, locatários e empresas
        </p>
      </div>

      <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
        <Button variant="outline" className="flex gap-2 items-center">
          <FileDown className="h-4 w-4" />
          Exportar
        </Button>        <Button className="flex gap-2 items-center" onClick={onAddClick}>
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>
    </div>
  );
}