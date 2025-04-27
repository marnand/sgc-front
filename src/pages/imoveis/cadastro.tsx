import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Building, Home, Save } from "lucide-react";

// Form schema definition
const propertySchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  type: z.enum(["Residencial", "Comercial", "Industrial"]),
  status: z.enum(["Disponível", "Alugado", "Em manutenção", "Vendido"]),
  
  // Address
  street: z.string().min(3, "Rua deve ter pelo menos 3 caracteres"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro deve ter pelo menos 2 caracteres"),
  city: z.string().min(2, "Cidade deve ter pelo menos 2 caracteres"),
  state: z.string().length(2, "Estado deve ter 2 caracteres"),
  zipCode: z.string().min(8, "CEP deve ter pelo menos 8 caracteres"),
  
  // Features
  area: z.coerce.number().min(1, "Área deve ser maior que 0"),
  bedrooms: z.coerce.number().min(0).optional(),
  bathrooms: z.coerce.number().min(0).optional(),
  parkingSpaces: z.coerce.number().min(0).optional(),
  hasElevator: z.boolean().default(false).optional(),
  yearBuilt: z.coerce.number().min(1900).max(new Date().getFullYear()).optional(),
  
  // Financials
  rentalPrice: z.coerce.number().min(0).optional(),
  salePrice: z.coerce.number().min(0).optional(),
  iptu: z.coerce.number().min(0),
  condoFee: z.coerce.number().min(0).optional(),
  
  // Owner
  ownerId: z.string().min(1, "Proprietário é obrigatório"),
  
  description: z.string().optional(),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export default function CadastroImovel() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  // Default values for the form
  const defaultValues: Partial<PropertyFormValues> = {
    type: "Residencial",
    status: "Disponível",
    hasElevator: false,
  };
  
  // Initialize the form
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues,
    mode: "onChange",
  });
  
  // Form submission handler
  function onSubmit(values: PropertyFormValues) {
    console.log(values);
    
    // Here you would normally save the data via API
    toast({
      title: "Imóvel cadastrado com sucesso",
      description: "O imóvel foi salvo e já está disponível no sistema.",
    });
    
    // Navigate back to the properties list
    navigate("/cadastros/imoveis");
  }
  
  // Mock owners (would be fetched from API)
  const owners = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Oliveira" },
    { id: "3", name: "Construtora Horizonte S.A." },
  ];
  
  return (
    <AppShell>
      <div className="flex flex-col space-y-6">
        {/* Page header */}
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
          <div className="flex items-center space-x-2">
            <Link href="/cadastros/imoveis">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Cadastrar Novo Imóvel</h1>
              <p className="text-sm text-muted-foreground">
                Preencha os dados para cadastrar um novo imóvel no sistema
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate("/cadastros/imoveis")}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              form="property-form" 
              className="gap-1"
            >
              <Save className="h-4 w-4" />
              Salvar Imóvel
            </Button>
          </div>
        </div>
        
        <Form {...form}>
          <form id="property-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="info" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="info" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Informações Básicas</span>
                  <span className="sm:hidden">Básicas</span>
                </TabsTrigger>
                <TabsTrigger value="features" className="flex items-center gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M9.5 14.5 3 21" />
                    <path d="M9.5 14.5 21 3" />
                    <path d="M9.5 9.5 4 15" />
                    <path d="M14.5 9.5 20 4" />
                    <path d="M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                  </svg>
                  <span className="hidden sm:inline">Características</span>
                  <span className="sm:hidden">Caract.</span>
                </TabsTrigger>
                <TabsTrigger value="financial" className="flex items-center gap-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
                    <path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
                    <path d="M7 14c3.22-2.68 4.88-7.8 6-12-3.22 2.68-4.88 7.8-6 12Z" />
                    <path d="M22 9c-8.5 0-10.5 3-12 10 8.5 0 10.5-3 12-10Z" />
                  </svg>
                  <span className="hidden sm:inline">Financeiro</span>
                  <span className="sm:hidden">Finan.</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Tab 1: Basic Information */}
              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Básicas</CardTitle>
                    <CardDescription>
                      Informe os dados essenciais do imóvel, como título, tipo e endereço.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Título do Imóvel</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Apartamento 302, Edifício Solar" {...field} />
                            </FormControl>
                            <FormDescription>
                              Nome que identifica o imóvel no sistema
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione..." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Residencial">Residencial</SelectItem>
                                  <SelectItem value="Comercial">Comercial</SelectItem>
                                  <SelectItem value="Industrial">Industrial</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione..." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Disponível">Disponível</SelectItem>
                                  <SelectItem value="Alugado">Alugado</SelectItem>
                                  <SelectItem value="Em manutenção">Em manutenção</SelectItem>
                                  <SelectItem value="Vendido">Vendido</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Endereço</h3>
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <FormField
                          control={form.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem className="md:col-span-4">
                              <FormLabel>Logradouro</FormLabel>
                              <FormControl>
                                <Input placeholder="Rua, Avenida, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="number"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Número</FormLabel>
                              <FormControl>
                                <Input placeholder="Número" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="complement"
                          render={({ field }) => (
                            <FormItem className="md:col-span-3">
                              <FormLabel>Complemento</FormLabel>
                              <FormControl>
                                <Input placeholder="Apto, Sala, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="neighborhood"
                          render={({ field }) => (
                            <FormItem className="md:col-span-3">
                              <FormLabel>Bairro</FormLabel>
                              <FormControl>
                                <Input placeholder="Bairro" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>CEP</FormLabel>
                              <FormControl>
                                <Input placeholder="00000-000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem className="md:col-span-3">
                              <FormLabel>Cidade</FormLabel>
                              <FormControl>
                                <Input placeholder="Cidade" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem className="md:col-span-1">
                              <FormLabel>UF</FormLabel>
                              <FormControl>
                                <Input placeholder="UF" maxLength={2} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <FormField
                      control={form.control}
                      name="ownerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Proprietário</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o proprietário" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {owners.map(owner => (
                                <SelectItem key={owner.id} value={owner.id}>
                                  {owner.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Pessoa ou empresa responsável pelo imóvel
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva detalhes adicionais sobre o imóvel..." 
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Informações adicionais que possam ser relevantes sobre o imóvel
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Tab 2: Features */}
              <TabsContent value="features" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Características</CardTitle>
                    <CardDescription>
                      Defina as características físicas e diferenciais do imóvel.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Área (m²)</FormLabel>
                            <FormControl>
                              <Input type="number" min={0} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="yearBuilt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ano de Construção</FormLabel>
                            <FormControl>
                              <Input type="number" min={1900} max={new Date().getFullYear()} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="hasElevator"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Elevador</FormLabel>
                              <FormDescription>
                                O imóvel possui elevador?
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Detalhes Residenciais</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="bedrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quartos</FormLabel>
                              <FormControl>
                                <Input type="number" min={0} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bathrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Banheiros</FormLabel>
                              <FormControl>
                                <Input type="number" min={0} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="parkingSpaces"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Vagas de Garagem</FormLabel>
                              <FormControl>
                                <Input type="number" min={0} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Recursos Adicionais</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Esta seção será expandida em versões futuras para incluir mais características,
                        como piscina, área de lazer, segurança, etc.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Imagens</h3>
                      <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-lg p-12 text-center">
                        <Building className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground text-sm">
                          O upload de imagens estará disponível em breve. Por favor, aguarde a próxima atualização.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Tab 3: Financial */}
              <TabsContent value="financial" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Financeiras</CardTitle>
                    <CardDescription>
                      Configure os valores relacionados ao imóvel, como aluguel, venda e impostos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="rentalPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor do Aluguel (R$)</FormLabel>
                            <FormControl>
                              <Input type="number" min={0} step={0.01} {...field} />
                            </FormControl>
                            <FormDescription>
                              Deixe em branco se o imóvel não estiver disponível para locação
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="salePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor de Venda (R$)</FormLabel>
                            <FormControl>
                              <Input type="number" min={0} step={0.01} {...field} />
                            </FormControl>
                            <FormDescription>
                              Deixe em branco se o imóvel não estiver disponível para venda
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="iptu"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IPTU Anual (R$)</FormLabel>
                            <FormControl>
                              <Input type="number" min={0} step={0.01} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="condoFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Taxa de Condomínio (R$)</FormLabel>
                            <FormControl>
                              <Input type="number" min={0} step={0.01} {...field} />
                            </FormControl>
                            <FormDescription>
                              Deixe em branco se não houver condomínio
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Condições Contratuais</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Esta seção será expandida em versões futuras para incluir mais detalhes contratuais,
                        como prazo, multas, reajustes, etc.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </AppShell>
  );
}
