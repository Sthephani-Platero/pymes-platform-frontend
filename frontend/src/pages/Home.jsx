// pages/Home.jsx
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center px-4">
      {/* Contenedor principal */}
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center transform hover:scale-105 transition duration-300">
        
        {/* Título */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow-lg">
          Bienvenido a Nuestra Plataforma para PYMES
        </h1>

        {/* Descripción */}
        <p className="text-lg text-gray-600 mb-6 drop-shadow-sm">
          Planifica tus actividades, administra tus datos y mejora tu productividad.
          Todo en un solo lugar, fácil y rápido.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Iniciar Sesión
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 border border-indigo-600"
          >
            Crear Cuenta
          </button>
        </div>

        {/* Nota adicional */}
        <p className="mt-6 text-gray-500 text-sm">
          Si ya tienes cuenta, inicia sesión. Si eres nuevo, crea una cuenta gratis.
        </p>
      </div>
    </div>
  );
};

export default Home;