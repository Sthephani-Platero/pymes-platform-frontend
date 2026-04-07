// src/pages/Trends.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Trends() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/intelligence/trends")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  if (!data) {
    return <p className="p-8">Cargando tendencias...</p>;
  }

  // 📊 KPIs
  const growing = data.trends.filter((t: any) => t.engagement_growth > 20).length;
  const falling = data.trends.filter((t: any) => t.engagement_growth < 0).length;
  const stable = data.trends.length - growing - falling;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8">

          {/* 🔥 TITULO */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            📊 Tendencias del mercado
          </h2>

          {/* 🧠 INSIGHT GLOBAL */}
          <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl mb-6">
            <p className="font-semibold text-indigo-800 mb-1">
              🤖 Análisis automático
            </p>
            <p className="text-sm text-indigo-700">
              {growing > 3
                ? "El mercado está creciendo. Es buen momento para invertir en contenido."
                : "El mercado está estable. Mantén tu estrategia actual."}
            </p>
          </div>

          {/* 📊 KPIs */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">🚀 En crecimiento</p>
              <p className="text-2xl font-bold text-green-600">{growing}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">⚠ En riesgo</p>
              <p className="text-2xl font-bold text-red-600">{falling}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-gray-500">😐 Estables</p>
              <p className="text-2xl font-bold text-yellow-600">{stable}</p>
            </div>
          </div>

          {/* 🏆 RANKING */}
          <h3 className="text-xl font-bold mb-3">🏆 Top crecimiento</h3>
          <div className="mb-6 space-y-2">
            {data.ranking.top_growth.map((b: any, i: number) => (
              <div key={i} className="bg-green-50 p-3 rounded-lg text-sm">
                {i + 1}. {b.brand} — {b.engagement_growth}%
              </div>
            ))}
          </div>

          {/* 🎯 CARDS INTELIGENTES */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.trends.map((brand: any, index: number) => {

              const isGrowing = brand.engagement_growth > 20;
              const isFalling = brand.engagement_growth < 0;

              return (
                <div
                  key={index}
                  className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{brand.brand}</h3>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isGrowing
                          ? "bg-green-100 text-green-700"
                          : isFalling
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {isGrowing
                        ? "🚀 Creciendo"
                        : isFalling
                        ? "⚠ En caída"
                        : "😐 Estable"}
                    </span>
                  </div>

                  {/* MÉTRICAS */}
                  <div className="flex justify-between mt-4 text-sm">
                    <div>
                      <p className="text-gray-400">Engagement</p>
                      <p className="font-bold">{brand.engagement}</p>
                    </div>

                    <div>
                      <p className="text-gray-400">Crecimiento</p>
                      <p
                        className={
                          isGrowing
                            ? "text-green-600"
                            : isFalling
                            ? "text-red-600"
                            : "text-yellow-600"
                        }
                      >
                        {brand.engagement_growth}%
                      </p>
                    </div>
                  </div>

                  {/* 🔮 PREDICCIÓN */}
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg text-sm">
                    🔮 {brand.prediction}
                  </div>

                  {/* 🎯 RECOMENDACIONES */}
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
                    <p className="font-semibold mb-1">Recomendaciones:</p>
                    {brand.recommendations?.map((rec: string, i: number) => (
                      <p key={i}>• {rec}</p>
                    ))}
                  </div>

                  {/* 📅 PLAN SEMANAL */}
                  <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm">
                    <p className="font-semibold mb-1">Plan semanal:</p>
                    {brand.action_plan?.map((p: string, i: number) => (
                      <p key={i}>• {p}</p>
                    ))}
                  </div>

                  {/* 🚨 ALERTA */}
                  {brand.alert && (
                    <div className="mt-3 p-2 bg-red-100 text-red-700 rounded-lg text-sm">
                      ⚠ {brand.alert}
                    </div>
                  )}
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