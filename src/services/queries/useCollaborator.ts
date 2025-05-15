import { RegisterCollaboratorPayload } from "@/types/types-collaborator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collaboratorService } from "../end-points/collaborators";
import { toast } from "@/hooks/use-toast";

export const useCreateCollaborator = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: RegisterCollaboratorPayload) => 
      collaboratorService.create(data),
    onError: (err) => {
      console.log(err)

      toast({
        title: "Erro ao registrar",
        description: "Erro ao registrar usuário",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      // Invalida todas as listas para recarregar os dados
      // queryClient.invalidateQueries(productKeys.lists())

      toast({
        title: "Registrado",
        description: "Usuário registrado com sucesso",
        variant: "success",
      })

      setTimeout(() => {
        window.location.href = "/auth";
      }, 3000)
    },
  })
}

export const useCurrentCollaborator = () => {
  return useQuery({
    queryKey: ["currency"],
    queryFn: collaboratorService.getCurrency,
    // Cache por mais tempo pois categorias mudam com menos frequência
    staleTime: 1000 * 60 * 60, // 1 hora
  })
}
