import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import { RegisterBankDetails } from "@/types/type-bank-details"
import { bankDetailsService } from "../end-points/bank-details"

export const useCreateBankDetails = () => {
  return useMutation({
    mutationFn: (data: RegisterBankDetails) => bankDetailsService.register(data),
    onSuccess: () => {
      toast({
        title: "Conta bancária criada",
        description: "Conta bancária cadastrada com sucesso",
        variant: "success",
      })
    },
    onError: (err) => {
      console.log(err)
      toast({
        title: "Erro ao criar conta bancária",
        description: "Não foi possível cadastrar o conta bancária",
        variant: "destructive",
      })
    }
  })
}