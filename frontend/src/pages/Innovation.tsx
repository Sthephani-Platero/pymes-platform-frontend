import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Innovation() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/intelligence/innovation")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p className="p-8">Cargando estrategias...</p>;

  const innovation = data.innovation || [];

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
            {innovation.map((item: any, index: number) => (
              <div key={index} className="bg-white p-5 rounded-2xl shadow">

                <h3 className="font-bold text-lg">{item.brand}</h3>

                <div className="mt-4 space-y-2 text-sm">

                  <div className="bg-purple-50 p-2 rounded">
                    📅 {item.strategy.posting_time}
                  </div>

                  <div className="bg-blue-50 p-2 rounded">
                    🎯 {item.strategy.content}
                  </div>

                  <div className="bg-green-50 p-2 rounded">
                    📈 {item.strategy.frequency}
                  </div>

                  <div className="bg-yellow-50 p-2 rounded">
                    💰 {item.strategy.ads}
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