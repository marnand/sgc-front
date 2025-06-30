import { api } from "@/lib/api/axios";
import { RegisterCompleteCustomer } from "@/types/types-customer";

const CUSTOMERS_API_PATH = '/cliente'

export const customersService = {
  register: async (payload: RegisterCompleteCustomer): Promise<boolean> => {
    return api.post<boolean>(CUSTOMERS_API_PATH, payload)
  }
}