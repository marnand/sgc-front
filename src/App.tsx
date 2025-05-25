import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import AuthPage from "@/pages/auth/auth-page";
import { ProtectedRoute } from "./lib/protected-route";
import Pessoas from "@/pages/cadastros/pessoas";
import Imoveis from "@/pages/cadastros/imoveis";
import CadastroImovel from "@/pages/imoveis/cadastro";
import Usuarios from "@/pages/usuarios";
import { AuthContextProvider } from "@/context/Authentication/AuthContext";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/cadastros/pessoas" component={Pessoas} />
      <ProtectedRoute path="/cadastros/imoveis" component={Imoveis} />
      <ProtectedRoute path="/imoveis/cadastro" component={CadastroImovel} />
      <ProtectedRoute path="/usuarios" component={Usuarios} />
      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  return (
    <TooltipProvider>
      <AuthContextProvider>
        <Toaster />
        <Router />
      </AuthContextProvider>
    </TooltipProvider>
  )
}

export default App
