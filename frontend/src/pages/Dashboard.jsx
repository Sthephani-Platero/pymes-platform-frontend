import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import axios from "axios";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState("fitness");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async (cat) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/dashboard?category=${cat}`
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard(category);
  }, [category]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* HEADER */}
        <div className="px-8 pt-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard · {category}
          </h1>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded-lg bg-white shadow-sm"
          >
            <option value="fitness">Fitness</option>
            <option value="belleza">Belleza</option>
            <option value="educacion">Educación</option>
            <option value="moda">Moda</option>
            <option value="restaurantes">Restaurantes</option>
          </select>
        </div>

        {/* CONTENT */}
        <main className="flex-1 p-8 space-y-10">

          {loading && (
            <div className="text-gray-500">Cargando dashboard...</div>
          )}

          {!loading && data && (
            <>
              {/* NEWS */}
              <section>
                <h2 className="text-xl font-semibold mb-4">📰 Noticias</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.news?.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {item.source}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* VIDEOS */}
              <section>
                <h2 className="text-xl font-semibold mb-4">🎥 Videos</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.videos?.map((video, i) => (
                    <a
                      key={i}
                      href={video.url}
                      target="_blank"
                      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                    >
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          className="w-full h-40 object-cover"
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800">
                          {video.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                          {video.channel}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          👁 {video.views} · ❤️ {video.likes}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* TRENDS */}
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  📈 Tendencias
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.trends?.map((trend, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
                    >
                      <p className="font-medium text-gray-800">
                        {trend.query}
                      </p>
                      <p className="text-sm text-gray-500">
                        Score: {trend.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* INSIGHTS */}
              {data.insights && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">
                    🧠 Insights
                  </h2>

                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow">
                    <p className="text-lg font-semibold">
                      Top Video: {data.insights.top_video?.title}
                    </p>
                    <p className="mt-2">
                      Top Trend: {data.insights.top_trend?.query}
                    </p>
                  </div>
                </section>
              )}
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}