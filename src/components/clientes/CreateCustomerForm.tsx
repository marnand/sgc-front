import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Customer, DocumentType, RegisterCustomer, TypeCustomer } from "@/types/types-customer";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputMask from "react-input-mask";
import { CustomerFormData, customerSchema } from "./CreateCustomerSchema";
import { useCreateCustomer } from "@/services/queries/useCustomer";
import { RegisterAddress } from "@/types/type-address";
import { AccountType, RegisterBankDetails } from "@/types/type-bank-details";

interface CreateCustomerFormProps {
  mode?: "add" | "edit" | "view"
  customer?: Customer | null
  onOpenChange: (open: boolean) => void
}

export function CreateCustomerForm({ mode = "add", customer, onOpenChange }: CreateCustomerFormProps) {
  const [documentType, setDocumentType] = useState<"CPF" | "CNPJ">("CPF");

  const { mutateAsync: createCustomer, isPending } = useCreateCustomer()

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: {
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: ""
      },
      bankDetails: {
        bank: "",
        agency: "",
        account: "",
        accountType: "Corrente"
      },
      documentNumber: "",
      type: "fisica",
      documentType: "CPF",
      hasBankDetails: false,
    },
  });

  const handleSubmit = async (data: CustomerFormData) => {
    const payloadCustomer: RegisterCustomer = {
      name: data.name,
      type: data.type === "fisica" ? TypeCustomer.fisica : TypeCustomer.juridica,
      documentType: data.documentType === "CPF" ? DocumentType.cpf : DocumentType.cnpj,
      documentNumber: data.documentNumber,
      email: data.email,
      phone: data.phone
    }

    const payloadAddress: RegisterAddress = {
      street: data.address.street,
      establishmentNumber: data.address.number,
      complement: data.address.complement,
      neighborhood: data.address.neighborhood,
      city: data.address.city,
      state: data.address.state,
      zipCode: data.address.zipCode
    }

    const payloadBankDetails: RegisterBankDetails = {
      bank: data.bankDetails?.bank || "",
      agency: data.bankDetails?.agency || "",
      account: data.bankDetails?.account || "",
      accountType:
        data.bankDetails?.accountType === "Poupança"
          ? AccountType.poupanca
          : AccountType.corrente,
    }

    const result = await createCustomer({
      customer: payloadCustomer,
      address: payloadAddress,
      bankDetails: data.hasBankDetails ? payloadBankDetails : undefined
    });

    onOpenChange(!result);
  };

  const watchType = form.watch("type");
  const watchHasBankDetails = form.watch("hasBankDetails");

  useEffect(() => {
    if (customer && (mode === "edit" || mode === "view")) {      
      const formData: CustomerFormData = {
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        type: customer.type === "Física" ? "fisica" : "juridica",
        documentType: customer.documentType,
        documentNumber: customer.documentNumber || "",
        address: {
          street: customer.address?.street || "",
          number: customer.address?.number || "",
          complement: customer.address?.complement || "",
          neighborhood: customer.address?.neighborhood || "",
          city: customer.address?.city || "",
          state: customer.address?.state || "",
          zipCode: customer.address?.zipCode || "",
        },
        hasBankDetails: !!customer.bankDetails,
        bankDetails: customer.bankDetails
          ? {
              bank: customer.bankDetails.bank || "",
              agency: customer.bankDetails.agency || "",
              account: customer.bankDetails.account || "",
              accountType:
                customer.bankDetails.accountType,
            }
          : {
              bank: "",
              agency: "",
              account: "",
              accountType: "Corrente",
            },
      };

      form.reset(formData);
    }
  }, [customer, mode]);

  const isReadOnly = mode === "view";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome completo" {...field} disabled={isReadOnly} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={(value: string) => {
                    field.onChange(value);
                    setDocumentType(value === "fisica" ? "CPF" : "CNPJ");
                    form.setValue("documentType", value === "fisica" ? "CPF" : "CNPJ");
                  }}
                  value={field.value}
                  disabled={isReadOnly}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="fisica">Pessoa Física</SelectItem>
                    <SelectItem value="juridica">Pessoa Jurídica</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documentNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{watchType === "fisica" ? "CPF" : "CNPJ"}</FormLabel>
                <FormControl>
                  <InputMask
                    mask={watchType === "fisica" ? "999.999.999-99" : "99.999.999/9999-99"}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isReadOnly}
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        placeholder={watchType === "fisica" ? "000.000.000-00" : "00.000.000/0000-00"}
                        disabled={isReadOnly}
                      />
                    )}
                  </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@exemplo.com" type="email" disabled={isReadOnly} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(00) 00000-0000" disabled={isReadOnly} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da rua" disabled={isReadOnly} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input placeholder="123" disabled={isReadOnly} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input placeholder="Apto, Sala, etc." disabled={isReadOnly} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="address.neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do bairro" disabled={isReadOnly} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da cidade" disabled={isReadOnly} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input placeholder="UF" maxLength={2} disabled={isReadOnly} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <InputMask
                    mask="99999-999"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isReadOnly}
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        placeholder="00000-000"
                        disabled={isReadOnly}
                      />
                    )}
                  </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="hasBankDetails"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Dados Bancários</FormLabel>
                <FormDescription>
                  Informar dados bancários do cliente
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isReadOnly}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {watchHasBankDetails && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="bankDetails.bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banco</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do banco" disabled={isReadOnly} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankDetails.agency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agência</FormLabel>
                  <FormControl>
                    <Input placeholder="0000" disabled={isReadOnly} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankDetails.account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conta</FormLabel>
                  <FormControl>
                    <Input placeholder="00000-0" disabled={isReadOnly} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankDetails.accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Conta</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isReadOnly}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="Corrente">Corrente</SelectItem>
                      <SelectItem value="Poupança">Poupança</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
          {mode !== "view" && (
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Salvando..."
                : mode === "edit"
                  ? "Salvar Alterações"
                  : "Salvar"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}