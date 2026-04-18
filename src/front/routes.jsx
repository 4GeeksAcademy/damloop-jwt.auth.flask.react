import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Demo from "./pages/Demo.jsx";
import Single from "./pages/Single.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Private from "./pages/Private.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/demo" element={<Demo />} />
    <Route path="/single/:theid" element={<Single />} />
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
  </Routes>
);

export default AppRoutes;
