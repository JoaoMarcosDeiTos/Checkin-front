// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./styles/GlobalStyle";

function App() {
  return (
    <BrowserRouter basename="/Checkin-front">
      <AppRoutes />
      <ToastContainer />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
