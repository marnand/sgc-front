export interface Address {
  id: string
  street: string
  establishmentNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface RegisterAddress {
  street: string
  establishmentNumber: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}