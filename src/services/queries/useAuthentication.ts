import { useMutation } from "@tanstack/react-query"
import { authenticationService } from "../end-points/authentication"
import { toast } from "@/hooks/use-toast";
import { TokenStorage } from "@shared/domain/HandleLocalStorage";

export const useAuthentication = () => {
  return useMutation({
    mutationFn: (data: { username: string; password: string }) => authenticationService.login(data),
    onSuccess: (res) => {
      TokenStorage.set(res);
    },
    onError: (err) => {
      console.log(err)
      toast({
        title: "Login falhou",
        description: "Usuário ou senha incorretos",
        variant: "destructive",
      })
    }
  })
}