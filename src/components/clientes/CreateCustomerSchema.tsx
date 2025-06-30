import { validateCNPJ, validateCPF } from "@/lib/utils";
import { DocumentType } from "@/types/types-customer";
import { z } from "zod";

export const customerSchema = z.object({
  name: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .refine((value) => value.trim().includes(" "), {
      message: "Digite nome completo"
    }),
  type: z.enum(["fisica", "juridica"]),
  documentType: z.enum(["CPF", "CNPJ"]),
  documentNumber: z.string()
    .min(1, "Documento é obrigatório")
    .refine((value) => {
      const cleanValue = value.replace(/\D/g, "");
      const isCPF = cleanValue.length === 11;
      const isCNPJ = cleanValue.length === 14;
      return isCPF || isCNPJ;
    }, {
      message: "Documento deve ter 11 (CPF) ou 14 (CNPJ) números"
    })
    .refine((value) => {
      const cleanValue = value.replace(/\D/g, "");
      return cleanValue.length === 11 ? validateCPF(cleanValue) : validateCNPJ(cleanValue);
    }, {
      message: "Documento inválido"
    }),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  address: z.object({
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().length(2, "Estado deve ter 2 letras"),
    zipCode: z.string().min(8, "CEP inválido"),
  }),
  hasBankDetails: z.boolean().default(false),
  bankDetails: z.object({
    bank: z.string(),
    agency: z.string(),
    account: z.string(),
    accountType: z.enum(["Corrente", "Poupança"]),
  }).optional()
});

export type CustomerFormData = z.infer<typeof customerSchema>;