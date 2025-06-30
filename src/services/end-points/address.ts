import { api } from "@/lib/api/axios";
import { RegisterAddress } from "@/types/type-address";

const CUSTOMERS_API_PATH = '/endereco'

export const addressService = {
  register: async (payload: RegisterAddress): Promise<boolean> => {
    return api.post<boolean>(CUSTOMERS_API_PATH, payload)
  }
}