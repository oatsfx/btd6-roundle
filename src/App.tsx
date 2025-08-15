import { Layout } from "./components/Layout";
import { BrowserRouter, useNavigate, useHref } from "react-router-dom";
import "./App.css";
import { HeroUIProvider, toast, ToastProvider } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";
import { useEffect, useState } from "react";
import { Footer } from "components/Footer";

function App() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme("system");

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <main className={"text-foreground bg-background"}>
        <Layout />
      </main>
    </HeroUIProvider>
  );
}

export default App;
