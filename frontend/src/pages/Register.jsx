import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_name: "",
    industry: "",
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register-company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar");
      }

      // 🔥 Guardar token
      localStorage.setItem("token", data.token);

      // 🔥 Redirigir al dashboard
      navigate("/dashboard");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Empresa</h2>

      <input
        type="text"
        name="company_name"
        placeholder="Nombre de la empresa"
        onChange={handleChange}
      />

      <input
        type="text"
        name="industry"
        placeholder="Industria"
        onChange={handleChange}
      />

      <input
        type="text"
        name="name"
        placeholder="Nombre del administrador"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email del administrador"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />

      <button type="submit">Crear Empresa</button>
    </form>
  );
}

export default Register;