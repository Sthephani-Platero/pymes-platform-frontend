import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function Market() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/api/intelligence/market", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json"
          }
        });

        const json = await res.json();
        console.log("DATA BACKEND 👉", json);

        setData(json);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  // 🔹 Top 5 marcas
  const topBrands = data?.trends
    ?.slice(0, 5)
    ?.sort((a: any, b: any) => b.engagement - a.engagement);

  // 🔹 Engagement vs Impressions
  const engagementVsImpressions = data?.trends?.slice(0, 5);

  // 🔹 Distribución de estados
  const statusCount: any = {};

  data?.predictions?.forEach((item: any) => {
    statusCount[item.status] = (statusCount[item.status] || 0) + 1;
  });

  const predictionChart = Object.keys(statusCount).map((key) => ({
    name: key,
    value: statusCount[key]
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Mercado Digital
          </h2>

          {loading && <p>Cargando datos del mercado...</p>}

          {!loading && data && (
            <>
              {/* 🔹 MÉTRICAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="text-gray-500 text-sm">Marcas</p>
                  <h3 className="text-3xl font-bold">
                    {data.metrics.total_brands}
                  </h3>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="text-gray-500 text-sm">Interaccion con el contenido</p>
                  <h3 className="text-3xl font-bold">
                    {data.metrics.total_engagement}
                  </h3>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="text-gray-500 text-sm">Comentarios</p>
                  <h3 className="text-3xl font-bold">
                    {data.metrics.total_comments}
                  </h3>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="text-gray-500 text-sm">Impresiones de el contenido</p>
                  <h3 className="text-3xl font-bold">
                    {data.metrics.total_impressions}
                  </h3>
                </div>

              </div>

              {/* 🔹 GRÁFICAS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 🔹 TOP 5 MARCAS */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="text-xl font-semibold mb-4">
                    Top 5 Marcas (Interaccion con el contenido)
                  </h3>

                  <BarChart width={500} height={300} data={topBrands}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="brand" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="engagement" fill="#3b82f6" />
                  </BarChart>
                </div>

                {/* 🔹 ENGAGEMENT VS IMPRESSIONS */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="text-xl font-semibold mb-4">
                    Interaccion con el contenido vs Impresiones
                  </h3>

                  <BarChart width={500} height={300} data={engagementVsImpressions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="brand" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="engagement" fill="#3b82f6" />
                    <Bar dataKey="impressions" fill="#10b981" />
                  </BarChart>
                </div>

                {/* 🔹 PIE CHART */}
                <div className="bg-white p-6 rounded-xl shadow col-span-1 lg:col-span-2 flex justify-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-center">
                      Nivel de Presencia Digital de las marcas (Predicciones)
                    </h3>

                    <PieChart width={400} height={300}>
                      <Pie
                        data={predictionChart}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {predictionChart.map((entry: any, index: number) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>
                </div>

              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}