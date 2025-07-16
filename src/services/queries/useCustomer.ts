import { useMutation, useQuery } from "@tanstack/react-query"
import { customersService } from "../end-points/customers"
import { toast } from "@/hooks/use-toast"
import { CompleteCustomer } from "@/types/types-customer"

type ApiError = {
  data: {
    isSuccess: boolean,
    message: string,
    statusCode: number
  },
  status: number
}

export const useCreateCustomer = () => {
  return useMutation<boolean, ApiError, CompleteCustomer>({
    mutationFn: async (data) => await customersService.register(data),
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

export const useGetAllCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customersService.getAll,
    // Cache por mais tempo pois categorias mudam com menos frequência
    staleTime: 1000 * 60 * 60, // 1 hora
  })
}