import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const handleCheckUser = async () => {
  const response = await fetch("http://localhost:8000/api/user", {
    credentials: "include"
  });

  const data = await response.json();
  console.log(data);
};

  const handleLogin = async () => {
  try {
    // 1️⃣ Obtener CSRF cookie
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });

    // 2️⃣ Obtener valor de la cookie XSRF-TOKEN
    const getCookie = (name) => {
      return document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1];
    };

    const xsrfToken = decodeURIComponent(getCookie("XSRF-TOKEN"));

    // 3️⃣ Enviar login con header correcto
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": xsrfToken, // 🔥 ESTO FALTABA
      },
      body: JSON.stringify({
        email: "admin@pymes.com",
        password: "12345678",
      }),
    });

    const data = await response.json();
    setMessage(data.message);
    console.log(data);

  } catch (error) {
    console.error(error);
    setMessage("Error al conectar");
  }
};
  return (
  <div>
    <h1>Login prueba Sanctum</h1>

    <button onClick={handleLogin}>
      Iniciar sesión
    </button>

    <button onClick={handleCheckUser}>
      Ver usuario autenticado
    </button>

    <p>{message}</p>
  </div>
);
  
}



export default App;