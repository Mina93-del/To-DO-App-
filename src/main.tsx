import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { LocaleProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider value={defaultSystem}>
    <LocaleProvider locale="ar-EG">
      <App />
    </LocaleProvider>
  </ChakraProvider>
);