import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Collaborator, RoleEnum } from "@/types/types-collaborator";
import { AuthContextProps } from "./types";
import { useCurrentCollaborator } from "@/services/queries/useCollaborator";
import { TokenStorage } from "@shared/domain/HandleLocalStorage";

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [currentCollaborator, setCurrentCollaborator] = useState<Collaborator | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [roleEnum, setRoleEnum] = useState<RoleEnum | null>(RoleEnum.Client)
  const { data, refetch, isLoading } = useCurrentCollaborator()

  const logout = () => {
    setCurrentCollaborator(null)
    setRoleEnum(null)
    TokenStorage.remove()
  }

  useEffect(() => {
    if (data) {
      setCurrentCollaborator(data)
      setRoleEnum(data.roleId)
      setLoading(false)
    }
  }, [data])

  return (
    <AuthContext.Provider value={{
      currentCollaborator,
      setCurrentCollaborator,
      refetch,
      logout,
      isLoading,
      roleEnum,
      isAuthenticated: !!currentCollaborator
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthContextProvider")
  }

  return context
}
