import { CreateCollaboratorPayload } from "@/types/types-collaborator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collaboratorService } from "../end-points/collaborators";

export const useCreateCollaborator = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateCollaboratorPayload) => 
      collaboratorService.create(data),
    onSuccess: () => {
      // Invalida todas as listas para recarregar os dados
      // queryClient.invalidateQueries(productKeys.lists())
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
