import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { UserData, UserRole } from "@/lib/types";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import { User as SelectUser, InsertUser } from "@shared/schema";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// Removed the import of useAuth to fix circular dependency

interface AuthContextProps {
  currentUser: UserData | null;
  userRole: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkPermission: (permission: string) => boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  
  // Add authentication methods
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  
  // Default to most restricted role
  const [userRole, setUserRole] = useState<UserRole>("viewer");
  
  // Fetch current user data
  const { data: user, isLoading } = useQuery<SelectUser | undefined, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (userData: SelectUser) => {
      queryClient.setQueryData(["/api/user"], userData);
    },
    onError: (error: Error) => {
      toast({
        title: "Login falhou",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/register", credentials);
      return await res.json();
    },
    onSuccess: (userData: SelectUser) => {
      queryClient.setQueryData(["/api/user"], userData);
    },
    onError: (error: Error) => {
      toast({
        title: "Registro falhou",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
    },
    onError: (error: Error) => {
      toast({
        title: "Logout falhou",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Login method
  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };
  
  // Register method
  const register = async (username: string, password: string) => {
    await registerMutation.mutateAsync({ username, password });
  };
  
  // Logout method
  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  // Update user data whenever auth status changes
  useEffect(() => {
    if (user) {
      // In a full implementation, the backend would return the complete user data
      // with role information. For now, we're creating a mock user with admin role.
      setCurrentUser({
        id: user.id.toString(),
        name: user.username,
        username: user.username,
        email: `${user.username}@ikasa.com.br`, // Placeholder
        role: "admin", // Default to admin for development
        avatar: undefined
      });
      setUserRole("admin");
    } else {
      setCurrentUser(null);
      setUserRole("viewer");
    }
  }, [user]);

  // Check if user has a specific permission
  const checkPermission = (permission: string): boolean => {
    if (!currentUser) return false;
    
    // This would be a more complex implementation connecting to a permissions system
    // For now, we'll use a simple role-based approach
    const rolePermissions: Record<UserRole, string[]> = {
      admin: ["all", "manage_users", "manage_properties", "manage_finances", "view_reports", "edit_contracts"],
      manager: ["view_reports", "approve_payments", "edit_contracts", "view_properties"],
      operator: ["edit_data", "view_properties", "view_contracts"],
      viewer: ["view_data", "view_properties"],
      client: ["view_own_data"]
    };
    
    if (userRole === "admin") return true; // Admin has all permissions
    
    return rolePermissions[userRole]?.includes(permission) || false;
  };
  
  // Check if user has at least one of the specified roles
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!currentUser) return false;
    
    if (Array.isArray(roles)) {
      return roles.includes(userRole);
    }
    
    return roles === userRole;
  };
  
  return (
    <AuthContext.Provider value={{
      currentUser,
      userRole,
      isAuthenticated: !!currentUser,
      isLoading,
      checkPermission,
      hasRole,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  
  return context;
};
