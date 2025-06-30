import { api } from "@/lib/api/axios";
import { RegisterBankDetails } from "@/types/type-bank-details";

const BANK_DETAILS_API_PATH = '/conta-bancaria'

export const bankDetailsService = {
  register: async (payload: RegisterBankDetails): Promise<boolean> => {
    return api.post<boolean>(BANK_DETAILS_API_PATH, payload)
  }
}