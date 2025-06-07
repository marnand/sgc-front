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