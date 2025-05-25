import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building } from "lucide-react";
import { useAuthContext } from "@/context/Authentication/AuthContext";
import { useLocation } from "wouter";
import HeroSection from "@/components/auth/HeroSection";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginForm from "@/components/auth/LoginForm";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login")
  const { currentCollaborator, refetchCurrentCollaborator } = useAuthContext()
  const [_, navigate] = useLocation()

  useEffect(() => {
    if (currentCollaborator) {
      navigate("/")
    }
  }, [currentCollaborator])

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
                  <LoginForm refetchCurrentCollaborator={refetchCurrentCollaborator} />
                </TabsContent>

                <TabsContent value="register">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <HeroSection />
      </div>
    </div>
  )
}
