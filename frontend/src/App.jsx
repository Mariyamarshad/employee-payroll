import './App.css'
import AppRoutes from "./routes/AppRoutes"
import { Toaster, toast} from "sonner";
function App() {

  return (
    <>
     <AppRoutes />
 <Toaster
  position="top-center"
  theme='dark'
  closeButton
  toastOptions={{
    className: "shadow-lg rounded-xl backdrop-blur-md bg-white/70",
  }}
/>
    </>
  )
}

export default App
