// src/pages/Predictions.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function Predictions() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/intelligence/predictions")
      .then(res => res.json())
      .then(data => {
        console.log("DATA 👉", data);
        setData(data);
      })
      .catch(err => console.error(err));
  }, []);

  if (!data) {
    return <p className="p-8">Cargando predicciones...</p>;
  }

  const predictions = data?.predictions || [];

  // 📊 KPIs
  const highRisk = predictions.filter(
    (p: any) => p.prediction?.risk === "Alto riesgo"
  ).length;

  const opportunities = predictions.filter(
    (p: any) => p.prediction?.trend?.includes("🚀")
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8">

          {/* 🚨 ALERTAS INTELIGENTES */}
          <div className="mb-6 space-y-3">
            {data?.alerts?.map((alert: any, index: number) => {
          
              const color =
                alert.type === "danger"
                  ? "bg-red-100 text-red-700"
                  : alert.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700";
          
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm font-medium ${color}`}
                >
                  {alert.message}
                </div>
              );
            })}
          </div>

          {/* 🔥 TITULO */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            🔮 Predicciones del mercado
          </h2>

          {/* 🧠 RESUMEN */}
          <div className="bg-purple-50 border border-purple-200 p-5 rounded-xl mb-6">
            <p className="font-semibold text-purple-800 mb-1">
              🤖 Análisis predictivo
            </p>
            <p className="text-sm text-purple-700">
              {opportunities > 3
                ? "Hay varias marcas en crecimiento. Buen momento para competir fuerte."
                : "El mercado está estable. Evalúa oportunidades específicas."}
            </p>
          </div>

          {/* 📊 KPIs */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">⚠ Alto riesgo</p>
              <p className="text-2xl font-bold text-red-600">{highRisk}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">🚀 Oportunidades</p>
              <p className="text-2xl font-bold text-green-600">{opportunities}</p>
            </div>
          </div>

          {/* 🔮 CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((item: any, index: number) => {
              const risk = item.prediction?.risk || "Sin datos";
              const trend = item.prediction?.trend || "Sin tendencia";
              const score = item.prediction?.score || 0;

              const riskColor =
                risk === "Alto riesgo"
                  ? "bg-red-100 text-red-700"
                  : risk === "Riesgo medio"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700";

              // 📈 DATA GRÁFICA
              const chartData = [
                { name: "Hoy", value: item.current_engagement || 0 },
                { name: "7 días", value: item.prediction?.next_7_days || 0 },
                { name: "30 días", value: item.prediction?.next_30_days || 0 }
              ];

              return (
                <div
                  key={index}
                  className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{item.brand}</h3>

                    <span className={`text-xs px-2 py-1 rounded-full ${riskColor}`}>
                      {risk}
                    </span>
                  </div>

                  {/* 🎯 SCORE */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-400">Score competitivo</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <p className="text-xs mt-1 font-semibold">{score}/100</p>
                  </div>

                  {/* 📊 ACTUAL */}
                  <div className="mt-4 text-sm">
                    <p className="text-gray-400">Engagement actual</p>
                    <p className="font-bold text-lg">
                      {item.current_engagement || 0}
                    </p>
                  </div>

                  {/* 📈 GRÁFICA (FIXED) */}
                  <div className="mt-4 w-full h-[200px]">
                    <LineChart width={300} height={200} data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </div>

                  {/* 🔮 TENDENCIA */}
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg text-sm">
                    🔮 {trend}
                  </div>

                  {/* 💡 RECOMENDACIÓN */}
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
                    💡 {item.prediction?.recommendation || "Sin recomendación disponible"}
                  </div>

                  {/* 🚀 PLAN DE ACCIÓN */}
                  <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm">
                    <strong>Plan:</strong>
                    <p>
                      {item.prediction?.action_plan || "Sin plan disponible"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </main>

        <Footer />
      </div>
    </div>
  );
}