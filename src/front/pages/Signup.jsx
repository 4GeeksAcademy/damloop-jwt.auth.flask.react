import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    const data = await signup(email, password);

    if (data.msg === "Usuario creado correctamente") {
      setMsg("Usuario creado correctamente");
      setTimeout(() => navigate("/login"), 1200);
    } else {
      setMsg(data.msg || "Error en el registro");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "16px" }}>
        
        <h2 className="text-center mb-4 fw-bold">Crear cuenta</h2>

        {msg && (
          <div className="alert alert-info text-center py-2">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

          <div>
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label fw-semibold">Contraseña</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-lg mt-2" type="submit">
            Crear cuenta
          </button>

        </form>

        <div className="text-center mt-3">
          <span className="text-muted">¿Ya tienes cuenta?</span>
          <Link to="/login" className="ms-1 fw-semibold">
            Inicia sesión
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;
