import { useMutation } from "@tanstack/react-query"
import { customersService } from "../end-points/customers"
import { toast } from "@/hooks/use-toast"
import { RegisterCompleteCustomer } from "@/types/types-customer"

type ApiError = {
  data: {
    isSuccess: boolean,
    message: string,
    statusCode: number
  },
  status: number
}

export const useCreateCustomer = () => {
  return useMutation<boolean, ApiError, RegisterCompleteCustomer>({
    mutationFn: (data) => customersService.register(data),
    onSuccess: () => {
      toast({
        title: "Cliente criado",
        description: "Cliente cadastrado com sucesso",
        variant: "success",
      })
    },
    onError: (err) => {
      const errMensage = err.data.message
      let message = null
      
      if (errMensage.includes("duplicate key value")) {
        if (errMensage.includes("customer_email_key")) {
          message = "Email já cadastrado!"
        }

        if (errMensage.includes("uq_customer_document")) {
          message = "Número de documento já cadastrado!"
        }
      }

      toast({
        title: "Erro ao criar cliente",
        description: message ?? "Não foi possível cadastrar o cliente",
        variant: "destructive",
      })
    }
  })
}