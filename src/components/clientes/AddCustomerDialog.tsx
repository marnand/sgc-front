import { CoreDialog } from "@/components/core/CoreDialog";
import { CreateCustomerForm } from "./CreateCustomerForm";

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCustomerDialog({
  open,
  onOpenChange
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
        />
      </div>
    </CoreDialog>
  );
}
