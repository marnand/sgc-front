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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getInitials } from "@/lib/utils";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  FileDown,
  Key,
  Shield
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Collaborator, RoleEnum } from "@/types/types-collaborator";
import { AddCollaboratorDialog, CollaboratorFormData } from "@/components/colaboradores/AddCollaboratorDialog";
import { DeleteCollaboratorDialog } from "@/components/colaboradores/DeleteCollaboratorDialog";
import { PermissionsDialog } from "@/components/colaboradores/PermissionsDialog";

export default function Usuarios() {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Collaborator | null>(null);
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);

  // Form submission handler
  const handleAddCollaborator = async (data: CollaboratorFormData) => {
    try {
      // Implementar lógica de criação do usuário
      // await api.post('/users', data);

      toast({
        title: "Usuário cadastrado com sucesso",
        description: "O usuário foi criado e já pode acessar o sistema.",
      });
    } catch (error) {
      toast({
        title: "Erro ao cadastrar usuário",
        description: "Ocorreu um erro ao tentar cadastrar o usuário.",
        variant: "destructive",
      });
      throw error; // Propaga o erro para o componente do dialog
    }
  };

  // Mock users data (would be fetched from API)
  const users: Collaborator[] = [
    {
      id: "1",
      name: "Bruna Lima",
      username: "bruna.lima",
      email: "bruna.lima@ikasa.com.br",
      roleId: 1,
      createdAt: ""
    }
  ];

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    //const matchesRole = roleFilter === 1 || user.roleId === roleFilter;

    return matchesSearch
  });

  // Calculate pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  // Get role display name and badge color
  // const getRoleDisplay = (role: RoleEnum): { name: string; badgeClass: string } => {
  //   // switch (role) {
  //   //   case "admin":
  //   //     return { name: "Administrador", badgeClass: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" };
  //   //   case "manager":
  //   //     return { name: "Gerente", badgeClass: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" };
  //   //   case "operator":
  //   //     return { name: "Operador", badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" };
  //   //   case "viewer":
  //   //     return { name: "Visualizador", badgeClass: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200" };
  //   //   case "client":
  //   //     return { name: "Cliente", badgeClass: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" };
  //   //   default:
  //   //     return { name: "Desconhecido", badgeClass: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200" };
  //   //   }
  //   return { name: "Desconhecido", badgeClass: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200" };
  // };

  // Handle opening the delete confirmation modal
  const handleDeleteClick = (user: Collaborator) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // Handle opening the permissions modal
  const handlePermissionsClick = (user: Collaborator) => {
    setSelectedUser(user);
    setPermissionsModalOpen(true);
  };

  return (
    <AppShell>
      <div className="flex flex-col space-y-6">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie usuários e permissões de acesso ao sistema
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex gap-2 items-center">
              <FileDown className="h-4 w-4" />
              Exportar
            </Button>
            <Button
              className="flex gap-2 items-center"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Novo Usuário
            </Button>
          </div>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, usuário ou email..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por papel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Papéis</SelectItem>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="manager">Gerente</SelectItem>
              <SelectItem value="operator">Operador</SelectItem>
              <SelectItem value="viewer">Visualizador</SelectItem>
              <SelectItem value="client">Cliente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Nome de Usuário</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Papel</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedUsers.length > 0 ? (
                displayedUsers.map((user) => {
                  //const roleInfo = getRoleDisplay(user.roleId);
                  const roleInfo = { roleId: user.roleId, name: "", badgeClass: "" };

                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                            {getInitials(user.name)}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={roleInfo.badgeClass}>
                          {roleInfo.name}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="flex gap-2 items-center"
                              onClick={() => console.log(`View user: ${user.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex gap-2 items-center"
                              onClick={() => console.log(`Edit user: ${user.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex gap-2 items-center"
                              onClick={() => console.log(`Reset password: ${user.id}`)}
                            >
                              <Key className="h-4 w-4" />
                              Redefinir Senha
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex gap-2 items-center"
                              onClick={() => handlePermissionsClick(user)}
                            >
                              <Shield className="h-4 w-4" />
                              Permissões
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex gap-2 items-center text-destructive"
                              onClick={() => handleDeleteClick(user)}
                            >
                              <Trash className="h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum usuário encontrado com os critérios de busca
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1} a {Math.min(endIndex, filteredUsers.length)} de {filteredUsers.length} usuários
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

      {/* New User Modal */}
      <AddCollaboratorDialog
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmit={handleAddCollaborator}
      />

      {/* Delete Confirmation Modal */}
      <DeleteCollaboratorDialog
        onOpenChange={setDeleteModalOpen}
        open={deleteModalOpen}
        selectedUser={selectedUser}
      />

      {/* Permissions Modal */}
      <PermissionsDialog
        open={permissionsModalOpen}
        onOpenChange={setPermissionsModalOpen}
        selectedUser={selectedUser}
      />
    </AppShell>
  );
}
