import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency to Brazilian Real (BRL)
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

// Format percentage
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

// Format date to Brazilian format
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(
    typeof date === "string" ? new Date(date) : date
  );
}

// Format datetime to Brazilian format
export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(typeof date === "string" ? new Date(date) : date);
}

// Format CPF: 123.456.789-00
export function formatCPF(cpf: string): string {
  const cpfClean = cpf.replace(/\D/g, "");
  
  if (cpfClean.length !== 11) {
    return cpf;
  }
  
  return cpfClean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Format CNPJ: 12.345.678/0001-90
export function formatCNPJ(cnpj: string): string {
  const cnpjClean = cnpj.replace(/\D/g, "");
  
  if (cnpjClean.length !== 14) {
    return cnpj;
  }
  
  return cnpjClean.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
}

// Format CEP: 12345-678
export function formatCEP(cep: string): string {
  const cepClean = cep.replace(/\D/g, "");
  
  if (cepClean.length !== 8) {
    return cep;
  }
  
  return cepClean.replace(/(\d{5})(\d{3})/, "$1-$2");
}

// Get initials from name (up to 2 letters)
export function getInitials(name: string): string {
  const names = name.split(" ");
  
  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }
  
  return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
}

// Validate CPF
export function validateCPF(cpf: string): boolean {
  const cpfClean = cpf.replace(/\D/g, "");
  
  if (cpfClean.length !== 11) {
    return false;
  }
  
  // Check for known invalid patterns
  if (/^(\d)\1{10}$/.test(cpfClean)) {
    return false;
  }
  
  // Validate first digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpfClean.charAt(i)) * (10 - i);
  }
  
  let remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  
  if (remainder !== parseInt(cpfClean.charAt(9))) {
    return false;
  }
  
  // Validate second digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpfClean.charAt(i)) * (11 - i);
  }
  
  remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  
  if (remainder !== parseInt(cpfClean.charAt(10))) {
    return false;
  }
  
  return true;
}

// Validate CNPJ
export function validateCNPJ(cnpj: string): boolean {
  const cnpjClean = cnpj.replace(/\D/g, "");
  
  if (cnpjClean.length !== 14) {
    return false;
  }
  
  // Check for known invalid patterns
  if (/^(\d)\1{13}$/.test(cnpjClean)) {
    return false;
  }
  
  // Validate first digit
  let sum = 0;
  let weight = 5;
  
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpjClean.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  
  let remainder = sum % 11;
  if (remainder < 2) {
    remainder = 0;
  } else {
    remainder = 11 - remainder;
  }
  
  if (remainder !== parseInt(cnpjClean.charAt(12))) {
    return false;
  }
  
  // Validate second digit
  sum = 0;
  weight = 6;
  
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpjClean.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  
  remainder = sum % 11;
  if (remainder < 2) {
    remainder = 0;
  } else {
    remainder = 11 - remainder;
  }
  
  if (remainder !== parseInt(cnpjClean.charAt(13))) {
    return false;
  }
  
  return true;
}
