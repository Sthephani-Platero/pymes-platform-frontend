const API_URL = "http://127.0.0.1:8000/api";

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error al iniciar sesión");
  }

  // Guardamos el token
  localStorage.setItem("token", data.token);

  return data;
};
export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/dashboard`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("No autorizado");
  }

  return await response.json();
};

