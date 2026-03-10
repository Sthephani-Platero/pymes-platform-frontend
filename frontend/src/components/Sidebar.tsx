// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiTrendingUp, FiBarChart2, FiZap } from "react-icons/fi";
import { MdLightbulb } from "react-icons/md";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  // Menú con referencias a los íconos
  const menuItems = [
    { name: "Dashboard", icon: FiHome, path: "/Dashboard" },
    { name: "Mercado Digital", icon: FiBarChart2, path: "/Market" },
    { name: "Tendencias", icon: FiTrendingUp, path: "/Trends" },
    { name: "Predicciones", icon: FiZap, path: "/Predictions" },
    { name: "Innovación", icon: MdLightbulb, path: "/Innovation" },
  ];

  return (
    <>
      {/* Botón toggle mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:static top-0 left-0 w-64 bg-white shadow-lg min-h-screen p-6 transition-transform duration-300 z-40 flex flex-col`}
      >
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-gray-800">PYMES PLATFORM</h1>
          <p className="text-sm text-gray-500 mt-1">Inteligencia para PYMEs</p>
        </div>

        {/* Menú */}
        <nav className="flex flex-col gap-2 flex-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition relative ${
                  isActive ? "bg-blue-100 text-blue-700" : ""
                }`
              }
              title={item.name}
            >
              {/* Renderizamos el ícono dinámicamente */}
              <span className="text-xl">{React.createElement(item.icon)}</span>
              <span className="hidden md:inline">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 text-xs text-gray-400">© 2026 PYMES PLATFORM</div>
      </aside>
    </>
  );
}