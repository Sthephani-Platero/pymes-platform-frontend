// src/pages/Predictions.tsx
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Predictions() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Predicciones</h2>
          <p className="text-gray-500">
            Aquí se mostrarán proyecciones y predicciones basadas en los datos históricos de las PYMEs.
          </p>
        </main>

        <Footer />
      </div>
    </div>
  );
}