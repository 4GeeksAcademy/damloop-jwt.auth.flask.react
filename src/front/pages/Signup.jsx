import React, { useState } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    try {
      const resp = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await resp.json();
      if (resp.ok) {
        setMsg("Usuario creado, ve a Login.");
      } else {
        setMsg(data.msg || "Error en el registro");
      }
    } catch (err) {
      setMsg("Error de conexión");
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Signup</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
};

export default Signup;
