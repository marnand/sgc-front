import { Address } from "./type-address";
import { BankDetails } from "./type-bank-details";

export enum TypeCustomer {
  fisica = 1,
  juridica = 2,
}

export enum DocumentType {
  cpf = 1,
  cnpj = 2,
}

export interface TableCustomer {
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
}

export interface Customer {
  id: string | null;
  name: string;
  type: TypeCustomer;
  documentType: DocumentType;
  documentNumber: string;
  email: string;
  phone: string;
}

export interface CompleteCustomer extends Customer {
  address: Address
  bankDetails?: BankDetails
}