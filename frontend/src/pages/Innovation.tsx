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
  growth?: number;
  engagement?: number;
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
        setData(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="p-8 text-gray-500 flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        Cargando estrategias...
      </div>
    );
  }

  /* ================= NORMALIZE DATA ================= */

  const innovation: InnovationItem[] = Array.isArray(data)
    ? data
    : data?.innovation ?? [];

  /* ================= EMPTY ================= */

  if (innovation.length === 0) {
    return (
      <div className="p-8 text-gray-500">
        No hay estrategias disponibles
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6">
          
          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              💡 Innovation Dashboard
            </h2>
            <p className="text-sm text-gray-500">
              AI-generated brand growth strategies
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            {innovation.map((item: InnovationItem, index: number) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition p-5"
              >

                {/* HEADER BRAND */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.brand || "Sin marca"}
                  </h3>

                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    AI insight
                  </span>
                </div>

                {/* METRICS */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">

                  <div className="bg-green-50 p-2 rounded-lg">
                    <p className="text-gray-500">Engagement</p>
                    <p className="font-semibold text-gray-900">
                      {item.engagement ?? "N/A"}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-2 rounded-lg">
                    <p className="text-gray-500">Growth</p>
                    <p className="font-semibold text-gray-900">
                      {item.growth ?? "N/A"}%
                    </p>
                  </div>

                </div>

                {/* STRATEGY */}
                <div className="space-y-3 text-sm">

                  <div>
                    <p className="text-xs text-gray-500">📅 Posting time</p>
                    <p className="font-medium text-gray-900">
                      {item.strategy?.posting_time || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">🎯 Content</p>
                    <p className="text-gray-700 text-sm">
                      {item.strategy?.content || "N/A"}
                    </p>
                  </div>

                  <div className="flex gap-2">

                    <div className="flex-1">
                      <p className="text-xs text-gray-500">📈 Frequency</p>
                      <p className="font-medium text-gray-900 text-sm">
                        {item.strategy?.frequency || "N/A"}
                      </p>
                    </div>

                    <div className="flex-1">
                      <p className="text-xs text-gray-500">💰 Ads</p>
                      <p className="font-medium text-gray-900 text-sm">
                        {item.strategy?.ads || "N/A"}
                      </p>
                    </div>

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