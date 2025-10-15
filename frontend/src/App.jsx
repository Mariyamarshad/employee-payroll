import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/slices/authSlice";
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])
  
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-center"
        theme="dark"
        closeButton
        toastOptions={{
          className: "shadow-lg rounded-xl backdrop-blur-md bg-white/70",
        }}
      />
    </>
  );
}

export default App;
