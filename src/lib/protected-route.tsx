import { useAuthContext } from "@/context/Authentication/AuthContext";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { currentCollaborator, isLoading } = useAuthContext()

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    )
  }

  if (!currentCollaborator) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    )
  }

  return <Route path={path} component={Component} />
}
