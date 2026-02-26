// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Componente para rutas privadas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 
  return token ? children : <Navigate to="/login" replace />;
};

// Componente para rutas públicas (login/register/home)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {/* Navbar solo visible si hay token */}
      {token && <Navbar />}

      <Routes>
        {/* Página de inicio */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Registro */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Dashboard (ruta privada) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;