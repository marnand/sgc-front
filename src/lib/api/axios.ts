import { config } from '@/config/env';
import { TokenStorage } from '@shared/domain/HandleLocalStorage';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl: string = config.API_BASE_URL

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar headers de autenticação
    const token = TokenStorage.get()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para respostas
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error
    
    // Tratamento de erros específicos
    if (response?.status === 401 && TokenStorage.get()) {
      // Logout ou refresh token
      TokenStorage.remove();
      window.location.href = '/auth'
    }
    
    return Promise.reject(error.response)
  }
)

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get<ApiResponse<T>>(url, config)
    return response.data.data
  },
  
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config)
    return response.data.data
  },
  
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config)
    return response.data.data
  },
  
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config)
    return response.data.data
  },
  
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete<ApiResponse<T>>(url, config)
    return response.data.data
  }
}

export default apiClient
