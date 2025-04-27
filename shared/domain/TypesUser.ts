export type UserRole = "admin" | "manager" | "operator" | "viewer" | "client";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface ResponseUser {
  data: User | null
  isSuccess: boolean
  message: string
  statusCode: number
}