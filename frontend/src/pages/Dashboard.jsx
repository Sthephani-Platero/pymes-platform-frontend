import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../services/auth";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const result = await getDashboard();
        setData(result);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!data) return <p className="p-8 text-gray-600">Cargando dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {data.message}
        </h2>

        {/* Tarjeta de usuario */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Usuario:</span> {data.user.name}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Email:</span> {data.user.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition duration-200"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Secciones del dashboard */}
      </div>
    </div>
  );
}

export default Dashboard;