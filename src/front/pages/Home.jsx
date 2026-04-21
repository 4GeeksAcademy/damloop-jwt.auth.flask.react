import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Home = () => {
  const { token, user } = useContext(AuthContext);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <div className="text-center">
        
        <h1 className="fw-bold mb-3">Bienvenido a tu App JWT</h1>
        <p className="text-muted fs-5 mb-4">
          Autenticación moderna con Flask + React
        </p>

        {!token && (
          <>
            <Link to="/signup" className="btn btn-primary btn-lg me-2">
              Crear cuenta
            </Link>

            <Link to="/login" className="btn btn-outline-secondary btn-lg">
              Iniciar sesión
            </Link>
          </>
        )}

        {token && (
          <>
            <h4 className="mb-4">Hola, {user?.email}</h4>

            <Link to="/private" className="btn btn-success btn-lg">
              Ir a zona privada
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default Home;
