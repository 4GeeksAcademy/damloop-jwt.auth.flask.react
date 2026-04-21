import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Demo from "./pages/Demo.jsx";
import Single from "./pages/Single.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Private from "./pages/Private.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";  // ← RUTA CORRECTA

const AppRoutes = () => (
  <Routes>

    <Route element={<Layout />}>

      <Route path="/" element={<Home />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/private"
        element={
          <ProtectedRoute>
            <Private />
          </ProtectedRoute>
        }
      />

    </Route>

  </Routes>
);

export default AppRoutes;
