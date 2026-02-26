import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../services/auth";

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

  if (!data) return <p>Cargando dashboard...</p>;

  return (
    <div style={styles.container}>
      <h2>{data.message}</h2>

      <div style={styles.card}>
        <p><strong>Usuario:</strong> {data.user.name}</p>
        <p><strong>Email:</strong> {data.user.email}</p>
      </div>

      <button onClick={handleLogout} style={styles.button}>
        Cerrar sesión
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
  },
  card: {
    backgroundColor: "#f3f4f6",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Dashboard;