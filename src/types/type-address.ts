export interface Address {
  id: string | null
  street: string
  establishmentNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}
