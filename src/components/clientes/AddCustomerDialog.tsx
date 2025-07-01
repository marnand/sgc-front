import { CoreDialog } from "@/components/core/CoreDialog";
import { CreateCustomerForm } from "./CreateCustomerForm";
import { Customer } from "@/types/types-customer";

interface AddCustomerDialogProps {
  open: boolean
  mode?: "add" | "edit" | "view"
  customer?: Customer | null
  onOpenChange: (open: boolean) => void
}

export function AddCustomerDialog({
  open,
  mode = "add",
  customer,
  onOpenChange
}: AddCustomerDialogProps) {

  return (
    <CoreDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        mode === "add"
          ? "Adicionar Cliente"
          : mode === "edit"
            ? "Editar Cliente"
            : "Visualizar Cliente"
      }
      description={
        mode === "add"
          ? "Preencha as informações do novo cliente"
          : mode === "edit"
            ? "Edite as informações do cliente"
            : "Visualize os dados do cliente"
      }
    >
      <div className="px-4">
        <CreateCustomerForm
          mode={mode}
          customer={customer}
          onOpenChange={onOpenChange}
        />
      </div>
    </CoreDialog>
  );
}
