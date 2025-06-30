import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useCreateCollaborator } from "@/services/queries/useCollaborator";
import { RegisterCollaboratorPayload } from "@/types/types-collaborator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const registerSchema = z.object({
  name: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .refine((value) => value.trim().includes(" "), {
      message: "Digite nome e sobrenome"
    })
    .refine((value) => /^[A-Za-zÀ-ÿ\s]*$/.test(value), {
      message: "Nome não pode conter números ou caracteres especiais"
    }),
  username: z.string().min(3, "Usuário deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  email: z.string().email("Email inválido"),
  confirmPassword: z.string().min(1, "Confirme sua senha"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { mutateAsync: createCollaborator, status: registerStatus } = useCreateCollaborator()

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  })

  const normalizeText = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^A-Za-z\s]/g, ''); // Remove special characters and numbers
  };

  useEffect(() => {
    const subscription = registerForm.watch((value, { name }) => {
      if (name === 'name') {
        const fullName = value.name?.trim() || '';
        if (fullName.includes(' ')) {
          const normalizedName = normalizeText(fullName);
          const [firstName, ...lastNames] = normalizedName.split(' ');
          const lastNamePart = lastNames[lastNames.length - 1];
          const generatedUsername = (firstName[0] + lastNamePart).toLowerCase();
          registerForm.setValue('username', generatedUsername);
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [registerForm])

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    const payload: RegisterCollaboratorPayload = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    }

    await createCollaborator(payload)
  }

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[0-9]/g, ''); // Remove numbers
    return value;
  }

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
        <FormField
          control={registerForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu nome"
                  {...field}
                  onChange={(e) => {
                    const value = handleNameInput(e);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={registerForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username será gerado automaticamente"
                  {...field}
                  disabled
                  className="bg-muted"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Escolha uma senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={registerForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirme sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={registerStatus === "pending"}
        >
          {registerStatus === "pending" ? "Registrando..." : "Registrar"}
        </Button>
      </form>
    </Form>
  )
}