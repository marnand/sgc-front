import { api } from "@/lib/api/axios";
import { Collaborator, RegisterCollaboratorPayload } from "@/types/types-collaborator";

const COLLAORATORS_API_PATH = '/colaborador'

export const collaboratorService = {
  create: async (payload: RegisterCollaboratorPayload): Promise<Collaborator> => {
    return api.post<Collaborator>(COLLAORATORS_API_PATH, payload)
  },
  getCurrency: async (): Promise<Collaborator> => {
    return api.get<Collaborator>(COLLAORATORS_API_PATH)
  },
}