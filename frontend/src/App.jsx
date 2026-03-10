// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import Trends from "./pages/Trends";
import Predictions from "./pages/Predictions";
import Innovation from "./pages/Innovation";

// Componente para rutas privadas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

// Componente para rutas públicas
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {/* Navbar solo visible si hay token */}
    

      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Páginas privadas */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/market" element={<PrivateRoute><Market /></PrivateRoute>} />
        <Route path="/trends" element={<PrivateRoute><Trends /></PrivateRoute>} />
        <Route path="/predictions" element={<PrivateRoute><Predictions /></PrivateRoute>} />
        <Route path="/innovation" element={<PrivateRoute><Innovation /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;