import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

/* ================= TYPES ================= */

type Strategy = {
  posting_time?: string;
  content?: string;
  frequency?: string;
  ads?: string;
};

type InnovationItem = {
  brand?: string;
  strategy?: Strategy;
};

type ApiResponse =
  | InnovationItem[]
  | { innovation: InnovationItem[] };

/* ================= COMPONENT ================= */

export default function Innovation() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/intelligence/innovation")
      .then((res) => {
        if (!res.ok) throw new Error("Error API");
        return res.json();
      })
      .then((data: ApiResponse) => {
        console.log("API RESPONSE:", data);
        setData(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return <p className="p-8">Cargando estrategias...</p>;
  }

  /* ================= NORMALIZE DATA ================= */

  const innovation: InnovationItem[] = Array.isArray(data)
    ? data
    : data?.innovation ?? [];

  /* ================= EMPTY STATE ================= */

  if (innovation.length === 0) {
    return <p className="p-8">No hay estrategias disponibles</p>;
  }

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-6">
            💡 Estrategias inteligentes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {innovation.map((item: InnovationItem, index: number) => (
              <div key={index} className="bg-white p-5 rounded-2xl shadow">
                <h3 className="font-bold text-lg">
                  {item.brand || "Sin marca"}
                </h3>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="bg-purple-50 p-2 rounded">
                    📅 {item.strategy?.posting_time || "N/A"}
                  </div>

                  <div className="bg-blue-50 p-2 rounded">
                    🎯 {item.strategy?.content || "N/A"}
                  </div>

                  <div className="bg-green-50 p-2 rounded">
                    📈 {item.strategy?.frequency || "N/A"}
                  </div>

                  <div className="bg-yellow-50 p-2 rounded">
                    💰 {item.strategy?.ads || "N/A"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}