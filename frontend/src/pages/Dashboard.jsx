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
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col">

        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* HEADER */}
        <div className="px-6 pt-4 flex justify-between items-center">

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-xs text-gray-500">
              Categoría:{" "}
              <span className="font-medium text-gray-700">{category}</span>
            </p>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-200 px-3 py-2 rounded-lg bg-white shadow-sm text-xs"
          >
            <option value="fitness">Fitness</option>
            <option value="belleza">Belleza</option>
            <option value="educacion">Educación</option>
            <option value="moda">Moda</option>
            <option value="restaurantes">Restaurantes</option>
          </select>

        </div>

        {/* CONTENT */}
        <main className="flex-1 p-6 space-y-8">

          {/* LOADING */}
          {loading && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              Cargando dashboard...
            </div>
          )}

          {!loading && data && (
            <>

              {/* NEWS */}
              <section>
                <h2 className="text-sm font-semibold text-gray-800 mb-3">
                  📰 Noticias
                </h2>

                <div className="grid gap-3">
                  {data.news?.map((item, i) => (
                    <a
                      key={i}
                      href={item.url || "#"}
                      target="_blank"
                      className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition flex overflow-hidden"
                    >

                      <div className="w-24 md:w-28 flex-shrink-0">
                        <img
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-3 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {item.title}
                          </h3>

                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                          <span>{item.source}</span>
                          <span>
                            {item.publishedAt
                              ? new Date(item.publishedAt).toLocaleDateString()
                              : ""}
                          </span>
                        </div>
                      </div>

                    </a>
                  ))}
                </div>
              </section>

              {/* VIDEOS - MÁS PEQUEÑO Y COMPACTO */}
              <section>
                <h2 className="text-sm font-semibold text-gray-800 mb-3">
                  🎥 Videos
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {data.videos?.map((video, i) => (
                    <a
                      key={i}
                      href={video.url}
                      target="_blank"
                      className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition block"
                    >

                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          className="w-full h-24 object-cover"
                        />
                      )}

                      <div className="p-2">
                        <h3 className="text-xs font-semibold text-gray-900 line-clamp-2">
                          {video.title}
                        </h3>

                        <p className="text-[10px] text-gray-500 mt-1">
                          {video.channel}
                        </p>

                        <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                          <span>👁 {video.views}</span>
                          <span>❤️ {video.likes}</span>
                        </div>
                      </div>

                    </a>
                  ))}
                </div>
              </section>

              {/* TRENDS */}
              <section>
                <h2 className="text-sm font-semibold text-gray-800 mb-3">
                  📈 Tendencias
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.trends?.map((trend, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {trend.query}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Score: {trend.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* INSIGHTS */}
              {data.insights && (
                <section>
                  <h2 className="text-sm font-semibold text-gray-800 mb-3">
                    🧠 Insights
                  </h2>

                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl shadow-lg">

                    <p className="text-sm font-semibold">
                      Top Video: {data.insights.top_video?.title}
                    </p>

                    <p className="mt-1 text-white/90 text-xs">
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