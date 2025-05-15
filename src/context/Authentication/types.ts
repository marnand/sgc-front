import { Collaborator, RoleEnum } from "@/types/types-collaborator"

export interface AuthContextProps {
  currentCollaborator: Collaborator | null
  setCurrentCollaborator: React.Dispatch<React.SetStateAction<Collaborator | null>>
  refetch: () => void
  logout: () => void
  isLoading: boolean
  roleEnum: RoleEnum | null
  isAuthenticated: boolean
}