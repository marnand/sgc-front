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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { getInitials } from "@/lib/utils";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash, 
  FileDown,
  Key,
  Lock,
  User,
  Shield,
  CheckCircle,
  X
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

// Form schema for new user
const userFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["admin", "manager", "operator", "viewer", "client"])
});

type UserFormValues = z.infer<typeof userFormSchema>;

export default function Usuarios() {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Collaborator | null>(null);
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  
  // Initialize form for new user
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      role: "viewer"
    }
  });
  
  // Form submission handler
  function onSubmit(values: UserFormValues) {
    console.log(values);
    
    // Here you would normally save the data via API
    toast({
      title: "Usuário cadastrado com sucesso",
      description: "O usuário foi criado e já pode acessar o sistema.",
    });
    
    setUserModalOpen(false);
    form.reset();
  }
  
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
  
  // Handle opening the delete confirmation modal
  const handleDeleteClick = (user: Collaborator) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };
  
  // Handle user deletion
  const handleDeleteConfirm = () => {
    if (selectedUser) {
      console.log(`Deleting user: ${selectedUser.id}`);
      
      // Here you would normally delete the user via API
      toast({
        title: "Usuário removido com sucesso",
        description: `O usuário ${selectedUser.name} foi removido do sistema.`,
      });
      
      setDeleteModalOpen(false);
      setSelectedUser(null);
    }
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
              onClick={() => setUserModalOpen(true)}
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
                  const roleInfo = getRoleDisplay(user.roleId);
                  
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
      <Dialog open={userModalOpen} onOpenChange={setUserModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Novo Usuário
            </DialogTitle>
            <DialogDescription>
              Preencha os dados para criar um novo usuário no sistema.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do usuário" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="nome.sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@ikasa.com.br" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Senha" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Papel</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um papel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="manager">Gerente</SelectItem>
                        <SelectItem value="operator">Operador</SelectItem>
                        <SelectItem value="viewer">Visualizador</SelectItem>
                        <SelectItem value="client">Cliente</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setUserModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Criar Usuário</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash className="h-5 w-5" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription>
              Você está prestes a excluir um usuário. Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="py-4">
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
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
            >
              Excluir Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Permissions Modal */}
      <Dialog open={permissionsModalOpen} onOpenChange={setPermissionsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Gerenciar Permissões
            </DialogTitle>
            <DialogDescription>
              Configure as permissões específicas para este usuário.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium">
                  {getInitials(selectedUser.name)}
                </div>
                <div>
                  <p className="font-medium text-lg">{selectedUser.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                    <Badge className={getRoleDisplay(selectedUser.roleId).badgeClass}>
                      {getRoleDisplay(selectedUser.roleId).name}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
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
                      {/* <Switch id="perm-prop-edit" defaultChecked={["admin", "manager", "operator"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-prop-create" className="flex-1">Criar Imóveis</Label>
                      {/* <Switch id="perm-prop-create" defaultChecked={["admin", "manager"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-prop-delete" className="flex-1">Excluir Imóveis</Label>
                      {/* <Switch id="perm-prop-delete" defaultChecked={["admin"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-contract-approve" className="flex-1">Aprovar Contratos</Label>
                      {/* <Switch id="perm-contract-approve" defaultChecked={["admin", "manager"].includes(selectedUser.roleId)} /> */}
                    </div>
                  </div>
                </div>
                
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
                      <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
                      <line x1="2" y1="20" x2="2" y2="20"></line>
                    </svg>
                    Módulo Financeiro
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-fin-view" className="flex-1">Visualizar Financeiro</Label>
                      {/* <Switch id="perm-fin-view" defaultChecked={["admin", "manager", "operator"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-fin-payment" className="flex-1">Registrar Pagamentos</Label>
                      {/* <Switch id="perm-fin-payment" defaultChecked={["admin", "manager", "operator"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-fin-approve" className="flex-1">Aprovar Transações</Label>
                      {/* <Switch id="perm-fin-approve" defaultChecked={["admin", "manager"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-fin-reports" className="flex-1">Gerar Relatórios</Label>
                      {/* <Switch id="perm-fin-reports" defaultChecked={["admin", "manager"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-fin-settings" className="flex-1">Configurações Financeiras</Label>
                      {/* <Switch id="perm-fin-settings" defaultChecked={["admin"].includes(selectedUser.roleId)} /> */}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-base mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Módulo de Cadastros
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-people-view" className="flex-1">Visualizar Pessoas</Label>
                      <Switch id="perm-people-view" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-people-edit" className="flex-1">Editar Pessoas</Label>
                      {/* <Switch id="perm-people-edit" defaultChecked={["admin", "manager", "operator"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-people-create" className="flex-1">Criar Pessoas</Label>
                      {/* <Switch id="perm-people-create" defaultChecked={["admin", "manager", "operator"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-people-delete" className="flex-1">Excluir Pessoas</Label>
                      {/* <Switch id="perm-people-delete" defaultChecked={["admin"].includes(selectedUser.roleId)} /> */}
                    </div>
                  </div>
                </div>
                
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Administração do Sistema
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-admin-users" className="flex-1">Gerenciar Usuários</Label>
                      {/* <Switch id="perm-admin-users" defaultChecked={["admin"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-admin-roles" className="flex-1">Gerenciar Papéis</Label>
                      {/* <Switch id="perm-admin-roles" defaultChecked={["admin"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-admin-settings" className="flex-1">Configurações do Sistema</Label>
                      {/* <Switch id="perm-admin-settings" defaultChecked={["admin"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-admin-logs" className="flex-1">Visualizar Logs</Label>
                      {/* <Switch id="perm-admin-logs" defaultChecked={["admin"].includes(selectedUser.roleId)} /> */}
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="perm-admin-backup" className="flex-1">Backup e Restauração</Label>
                      {/* <Switch id="perm-admin-backup" defaultChecked={["admin"].includes(selectedUser.roleId)} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setPermissionsModalOpen(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Permissões atualizadas",
                  description: "As permissões do usuário foram atualizadas com sucesso.",
                });
                setPermissionsModalOpen(false);
              }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Salvar Permissões
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
