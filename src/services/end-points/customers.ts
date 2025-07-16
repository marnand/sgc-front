import { api } from "@/lib/api/axios";
import { CompleteCustomer } from "@/types/types-customer";

const CUSTOMERS_API_PATH = '/cliente'

export const customersService = {
  register: async (payload: CompleteCustomer): Promise<boolean> => {
    return await api.post<boolean>(CUSTOMERS_API_PATH, payload)
  },

  getAll: async (): Promise<CompleteCustomer[]> => {
    return await api.get<CompleteCustomer[]>(CUSTOMERS_API_PATH)
  }
}