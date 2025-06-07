import { CoreDialog } from "@/components/core/CoreDialog";
import { Customer } from "@/types/type-customer";
import { CreateCustomerForm } from "./CreateCustomerForm";

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Customer) => void;
}

export function AddCustomerDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddCustomerDialogProps) {

  return (
    <CoreDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Adicionar Cliente"
      description="Preencha as informações do novo cliente"
    >
      <div className="px-4">
        <CreateCustomerForm
          onOpenChange={onOpenChange}
          onSubmit={onSubmit}
        />
      </div>
    </CoreDialog>
  );
}
