// Dashboard related types
export interface KpiData {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  changeType: "increase" | "decrease";
}

export interface ActivityItem {
  id: string;
  type: "contract" | "property" | "payment" | "error" | "user";
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  iconBgColor: string;
}

export interface Contract {
  id: string;
  client: {
    id: string;
    name: string;
    documentType: "CPF" | "CNPJ";
    documentNumber: string;
    avatar?: string;
  };
  property: {
    id: string;
    title: string;
    address: string;
  };
  value: number;
  period: "Mensal" | "Anual" | "Trimestral" | "Semestral";
  status: "Ativo" | "Pendente" | "Atrasado" | "Cancelado" | "Finalizado";
}

// Property related types
export interface Property {
  id: string;
  title: string;
  type: "Residencial" | "Comercial" | "Industrial";
  status: "Disponível" | "Alugado" | "Em manutenção" | "Vendido";
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  features: {
    area: number;
    bedrooms?: number;
    bathrooms?: number;
    parkingSpaces?: number;
    hasElevator?: boolean;
    yearBuilt?: number;
  };
  financials: {
    rentalPrice?: number;
    salePrice?: number;
    iptu: number;
    condoFee?: number;
  };
  ownerId: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

// Client/Person related types
export interface Person {
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
