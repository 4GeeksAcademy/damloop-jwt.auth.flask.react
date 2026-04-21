import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    const data = await login(email, password);

    if (data.token) {
      navigate("/private");
    } else {
      setMsg(data.msg || "Error al iniciar sesión");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "16px" }}>
        
        <h2 className="text-center mb-4 fw-bold">Iniciar sesión</h2>

        {msg && (
          <div className="alert alert-danger text-center py-2">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

          <div>
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label fw-semibold">Contraseña</label>
            <input
              type="password"
              className="form-control form-control-lg"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-success btn-lg mt-2" type="submit">
            Entrar
          </button>

        </form>

        <div className="text-center mt-3">
          <span className="text-muted">¿No tienes cuenta?</span>
          <Link to="/signup" className="ms-1 fw-semibold">
            Regístrate
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
