// src/pages/Dashboard.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Dashboard() {
  // Estado para manejar el sidebar en mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Área de contenido */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Bienvenido a PYMES Pulsar Dashboard
          </h2>
          <p className="text-gray-500">
            Aquí se mostrará el contenido de los módulos próximamente.
          </p>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}