import { Shield } from "lucide-react";
import { Collaborator } from "@/types/types-collaborator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { CoreDialog } from "../core/CoreDialog";

interface PermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: Collaborator | null;
}

export function PermissionsDialog({ open, onOpenChange, selectedUser }: PermissionsDialogProps) {
  const { toast } = useToast();

  if (!selectedUser) return null;

  const handleSavePermissions = async () => {
    try {
      // Implementar lógica de atualização das permissões
      toast({
        title: "Permissões atualizadas",
        description: "As permissões do usuário foram atualizadas com sucesso.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro ao atualizar permissões",
        description: "Ocorreu um erro ao tentar atualizar as permissões.",
        variant: "destructive",
      });
    }
  };

  return (
    <CoreDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Gerenciar Permissões"
      description="Configure as permissões específicas para este usuário"
      icon={Shield}
      iconClassName="h-5 w-5"
      onConfirm={handleSavePermissions}
      confirmText="Salvar Permissões"
      cancelText="Cancelar"
    >
      <div className="py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
            {getInitials(selectedUser.name)}
          </div>
          <div>
            <p className="font-medium text-lg">{selectedUser.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              <Badge variant="outline">
                {selectedUser.roleId === 1 ? "Cliente" : "Gerente"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Módulo Imobiliário */}
          <div>
            <h3 className="font-medium text-base mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Módulo Imobiliário
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="perm-prop-view" className="flex-1">Visualizar Imóveis</Label>
                <Switch id="perm-prop-view" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="perm-prop-edit" className="flex-1">Editar Imóveis</Label>
                <Switch id="perm-prop-edit" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="perm-prop-create" className="flex-1">Criar Imóveis</Label>
                <Switch id="perm-prop-create" />
              </div>
            </div>
          </div>

          {/* Módulo Financeiro */}
          <div>
            <h3 className="font-medium text-base mb-3 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                <line x1="2" y1="20" x2="2" y2="20" />
              </svg>
              Módulo Financeiro
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="perm-fin-view" className="flex-1">Visualizar Financeiro</Label>
                <Switch id="perm-fin-view" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="perm-fin-payment" className="flex-1">Registrar Pagamentos</Label>
                <Switch id="perm-fin-payment" />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="perm-fin-approve" className="flex-1">Aprovar Transações</Label>
                <Switch id="perm-fin-approve" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CoreDialog>
  );
}