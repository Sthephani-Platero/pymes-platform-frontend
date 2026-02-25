import { useEffect, useState } from "react";
import { getDashboard } from "../services/auth";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashboard();
        setData(result);
      } catch (error) {
        alert("Debes iniciar sesión");
      }
    };

    fetchData();
  }, []);

  if (!data) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{data.message}</h2>
      <p>Usuario: {data.user.name}</p>
      <p>Email: {data.user.email}</p>
    </div>
  );
}

export default Dashboard;