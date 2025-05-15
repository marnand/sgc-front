import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryProvider } from "./providers/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </QueryProvider>
)
