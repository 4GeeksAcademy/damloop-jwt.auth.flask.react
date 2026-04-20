import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="text-center">
        <h1 className="fw-bold mb-3">Bienvenido a tu App JWT</h1>
        <p className="text-muted fs-5 mb-4">
          Autenticación moderna con Flask + React
        </p>

        <Link to="/signup" className="btn btn-primary btn-lg me-2">
          Crear cuenta
        </Link>

        <Link to="/login" className="btn btn-outline-secondary btn-lg">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default Home;
