import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import { RegisterAddress } from "@/types/type-address"
import { addressService } from "../end-points/address"

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: (data: RegisterAddress) => addressService.register(data),
    onSuccess: () => {
      toast({
        title: "Endereço criado",
        description: "Endereço cadastrado com sucesso",
        variant: "success",
      })
    },
    onError: (err) => {
      console.log(err)
      toast({
        title: "Erro ao criar endereço",
        description: "Não foi possível cadastrar o endereço",
        variant: "destructive",
      })
    }
  })
}