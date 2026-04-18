import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Private = () => {
  const { token } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchPrivate = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/private`, {
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
    if (token) fetchPrivate();
  }, [token]);

  return (
    <div className="text-center mt-5">
      <h2>Private</h2>
      <p>{msg}</p>
    </div>
  );
};

export default Private;
