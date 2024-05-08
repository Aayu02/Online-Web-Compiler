import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { Compiler } from "./components/Compiler"
import { NotFound } from "./components/NotFound"
import { ThemeProvider } from "./components/theme-provider"
import Home from "./components/Home"
import { Toaster } from "sonner"
function App() {
  return (
    <>
    <Toaster position="bottom-right" theme="dark"/>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/compiler" element={<Compiler/>}/>
        <Route path="/compiler/:urlId" element={<Compiler/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
