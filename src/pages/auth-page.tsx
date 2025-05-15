import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building } from "lucide-react";
import { useAuthContext } from "@/context/Authentication/AuthContext";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuthentication } from "@/services/queries/useAuthentication";

const loginSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

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

// Helper function to remove accents and special characters
const normalizeText = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^A-Za-z\s]/g, ''); // Remove special characters and numbers
};

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const { currentCollaborator, refetch } = useAuthContext()
  const [_, navigate] = useLocation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutateAsync: login, status, isSuccess } = useAuthentication()

  useEffect(() => {
    if (currentCollaborator) {
      navigate("/")
    }
  }, [currentCollaborator])

  useEffect(() => {
    if (isSuccess) {
      refetch()
    }
  }, [isSuccess])

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

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

  // Updated effect to watch the name field and update username
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

  const onLoginSubmit = async (data: LoginFormValues) => await login(data)

  const onRegisterSubmit = async (data: RegisterFormValues) => {

  }

  // Add this function to handle name input changes
  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[0-9]/g, ''); // Remove numbers
    return value;
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <div className="flex flex-col md:flex-row w-full">
        {/* Login/Register Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground mb-2">
                <Building className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl text-center">IKASA Central</CardTitle>
              <CardDescription className="text-center">
                Sistema de gestão centralizado para contabilidade e imobiliária
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Cadastro</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Usuário</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite seu usuário" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Digite sua senha" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={status === "pending"}
                      >
                        {status === "pending" ? "Entrando..." : "Entrar"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="register">
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
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Registrando..." : "Registrar"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Hero Section */}
        <div className="hidden md:flex md:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-4">Bem-vindo à IKASA Central</h1>
            <p className="text-lg mb-6">
              Sistema integrado para gestão de imóveis e contabilidade, substituindo múltiplas plataformas em uma única solução.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary-foreground/10 rounded-lg">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Administração Imobiliária</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Gerencie contratos, acompanhe locações e monitore o status dos imóveis.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary-foreground/10 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Gestão Financeira</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Controle de contas a pagar, conciliação bancária e classificação de despesas.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary-foreground/10 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Relatórios e Dashboards</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Painéis interativos personalizáveis com filtros avançados e visualizações gráficas de KPIs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
