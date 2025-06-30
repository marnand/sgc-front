import { RegisterAddress } from "./type-address";
import { RegisterBankDetails } from "./type-bank-details";

export enum TypeCustomer {
  fisica = 1,
  juridica = 2,
}

export enum DocumentType {
  cpf = 1,
  cnpj = 2,
}

export interface Customer {
  id: string;
  name: string;
  type: "Física" | "Jurídica";
  documentType: "CPF" | "CNPJ";
  documentNumber: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  bankDetails?: {
    bank: string;
    agency: string;
    account: string;
    accountType: "Corrente" | "Poupança";
  };
  createdAt: string;
  updatedAt: string;
}

export interface RegisterCustomer {
  name: string;
  type: TypeCustomer;
  documentType: DocumentType;
  documentNumber: string;
  email: string;
  phone: string;
}

export interface RegisterCompleteCustomer {
  customer: RegisterCustomer
  address: RegisterAddress
  bankDetails?: RegisterBankDetails
}