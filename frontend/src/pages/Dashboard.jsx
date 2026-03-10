import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

import {
  fetchBrandsProfiles,
  fetchEngagements,
  fetchComments
} from "../services/api";

function Dashboard() {
  const [brands, setBrands] = useState([]);
  const [engagements, setEngagements] = useState(0);
  const [comments, setComments] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener rango de fechas exactas hasta hoy
  const formatDateRange = () => {
    const today = new Date();
    const dayIndex = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayIndex + 6) % 7)); // lunes de esta semana
    return `${monday.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })} – ${today.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}`;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch marcas, engagements y comentarios
        const brandsData = await fetchBrandsProfiles();
        const engagementData = await fetchEngagements();
        const commentsData = await fetchComments();

        setBrands(brandsData?.brands?.brands || []);
        setEngagements(engagementData?.engagements || 0);
        setComments(commentsData?.comments || 0);

        // Fetch impresiones
        const response = await fetch("http://localhost:8000/api/pulsar/impressions");
        const impressionsData = await response.json();

        // Determinar días de la semana hasta hoy
        const today = new Date();
        const dayIndex = today.getDay(); 
        const monday = new Date(today);
        monday.setDate(today.getDate() - ((dayIndex + 6) % 7)); 
        const daysPassed = ((dayIndex + 6) % 7) + 1;

        // Factores proporcionales (para repartir totales en 7 días)
        const factors = [0.12, 0.15, 0.10, 0.18, 0.20, 0.13, 0.12];

        const chartDataReal = [];
        for (let i = 0; i < daysPassed; i++) {
          const currentDay = new Date(monday);
          currentDay.setDate(monday.getDate() + i);

          chartDataReal.push({
            day: currentDay.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "short", year: "numeric" }),
            facebook: (impressionsData.facebook || 0) * factors[i],
            instagram: (impressionsData.instagram || 0) * factors[i],
            xPlatform: (impressionsData.x || 0) * factors[i]
          });
        }

        setChartData(chartDataReal);

      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Pulsar Dashboard</h2>

        {/* GRAFICO */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-12">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {brands.length > 0 ? brands[0].name : "Empresa"}
          </h3>
          <p className="text-sm text-gray-500 mb-2">Datos de Impresiones por Red Social</p>
          <p className="text-sm text-gray-500 mb-4">Semana: {formatDateRange()}</p>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value, name) => [Math.round(value), name]} />
              <Legend />
              <Line type="monotone" dataKey="facebook" stroke="#1877F2" name="Facebook" />
              <Line type="monotone" dataKey="instagram" stroke="#E1306C" name="Instagram" />
              <Line type="monotone" dataKey="xPlatform" stroke="#000000" name="X" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* METRICAS */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            {brands.length > 0 ? brands[0].name : "Empresa"} – Métricas
          </h3>
          {chartData.length > 0 && (
            <p className="text-gray-500 text-sm">Semana: {formatDateRange()}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Engagement Total</p>
            <h3 className="text-4xl font-bold text-blue-600 mt-2">{engagements}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Comments Totales</p>
            <h3 className="text-4xl font-bold text-green-600 mt-2">{comments}</h3>
          </div>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-700">Perfiles de Redes Sociales</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Marca</th>
                  <th className="px-6 py-3">Profile ID</th>
                  <th className="px-6 py-3">Nombre</th>
                  <th className="px-6 py-3">Red Social</th>
                  <th className="px-6 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {brands.map((brand) =>
                  (brand.profiles || []).map((profile) => (
                    <tr key={profile.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">{brand.name}</td>
                      <td className="px-6 py-4 text-gray-500">{profile.id}</td>
                      <td className="px-6 py-4">{profile.name}</td>
                      <td className="px-6 py-4 capitalize text-gray-600">{profile.source}</td>
                      <td className="px-6 py-4">
                        {profile.plugged ? (
                          <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                            Conectado
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                            Desconectado
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;