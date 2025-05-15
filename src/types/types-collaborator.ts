export enum RoleEnum {
  Client = 1,
  Manager
}

export interface Collaborator {
  id: string
  name: string
  username: string
  email: string
  roleId: RoleEnum
  avatar?: string
  createdAt: string
  updatedAt?: string
}

export interface CreateCollaboratorPayload {
  name: string
  username: string
  email: string
  roleId: RoleEnum
  avatar?: string
}