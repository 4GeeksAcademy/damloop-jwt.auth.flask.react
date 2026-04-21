import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Private = () => {
  const { token } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchPrivate = async () => {
      try {
        const resp = await fetch("/api/private", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await resp.json();
        setMsg(data.msg || "Sin mensaje");
      } catch (err) {
        setMsg("Error de conexión");
      }
    };

    fetchPrivate();
  }, [token]);

  return (
    <div className="text-center mt-5">
      <h2>Zona Privada</h2>
      <p>{msg}</p>
    </div>
  );
};

export default Private;
