import { useState } from "react";
import { CoreDialog } from "../core/CoreDialog";
import { Collaborator, RoleEnum } from "@/types/types-collaborator";
import { getInitials } from "@/lib/utils";

interface DeleteCollaboratorDialogProps {
  open: boolean
  selectedUser: Collaborator | null
  onOpenChange: (open: boolean) => void
}

export function DeleteCollaboratorDialog({
  open,
  selectedUser,
  onOpenChange,
}: DeleteCollaboratorDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao criar colaborador:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleDisplay = (role: RoleEnum): { name: string; badgeClass: string } => {
    // switch (role) {
    //   case "admin":
    //     return { name: "Administrador", badgeClass: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" };
    //   case "manager":
    //     return { name: "Gerente", badgeClass: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" };
    //   case "operator":
    //     return { name: "Operador", badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" };
    //   case "viewer":
    //     return { name: "Visualizador", badgeClass: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200" };
    //   case "client":
    //     return { name: "Cliente", badgeClass: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" };
    //   default:
    //     return { name: "Desconhecido", badgeClass: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200" };
    //   }
    return { name: "Desconhecido", badgeClass: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200" };
  };

  return (
    <CoreDialog
      title="Confirmar Exclusão"
      description="Você está prestes a excluir um usuário. Esta ação não pode ser desfeita."
      open={open}
      onOpenChange={onOpenChange}
      loading={loading}
      onCancel={() => onOpenChange(false)}
      onConfirm={handleSubmit}
      confirmText="Excluir Usuário"
      confirmVariant="destructive"
    >
      {selectedUser && (
        <div>
          <p className="mb-4">
            Tem certeza que deseja excluir o usuário <span className="font-medium">{selectedUser.name}</span>?
          </p>
          <div className="bg-muted p-3 rounded-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                {getInitials(selectedUser.name)}
              </div>
              <div>
                <p className="font-medium">{selectedUser.name}</p>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Nome de usuário: <span className="font-medium">{selectedUser.username}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Papel: <span className="font-medium">{getRoleDisplay(selectedUser.roleId).name}</span>
            </p>
          </div>
        </div>
      )}
    </CoreDialog>
  )
}