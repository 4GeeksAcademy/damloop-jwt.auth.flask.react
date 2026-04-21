import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Cargar sesión guardada
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // SIGNUP
  const signup = async (email, password) => {
    try {
      const resp = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await resp.json();

      // Normalizamos la respuesta
      if (resp.ok) {
        return { ok: true, msg: data.msg || "Usuario creado correctamente" };
      } else {
        return { ok: false, msg: data.msg || "Error al crear usuario" };
      }

    } catch {
      return { ok: false, msg: "Error de conexión" };
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const resp = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await resp.json();

      if (resp.ok && data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);

        return { ok: true, token: data.token, user: data.user };
      }

      return { ok: false, msg: data.msg || "Credenciales incorrectas" };

    } catch {
      return { ok: false, msg: "Error de conexión" };
    }
  };

  // LOGOUT
  const logout = () => {
    sessionStorage.clear();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
