import { api } from "@/lib/api/axios"

const COLLAORATORS_API_PATH = '/auth'

export const authenticationService = {
  login: async (data: { username: string, password: string }): Promise<string> => {
    return api.post<string>(COLLAORATORS_API_PATH, data)
  },
}