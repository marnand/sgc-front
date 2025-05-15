import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Tenta apenas uma vez após falhar
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 30, // 30 minutos
      refetchOnWindowFocus: import.meta.env.PROD, // Recarrega ao focar janela apenas em produção
      refetchOnMount: true,
    },
    mutations: {
      retry: false,
    },
  },
})
