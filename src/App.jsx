import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Map } from "./pages/Map";
import { Feed } from "./pages/Feed";
import { Profile } from "./pages/Profile";
import { PrivateRoute } from "./components/PrivateRoute";
import { LoadingScreen } from "./components/LoadingScreen";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#f0f2f5]">
            <div className="app-container">
                <LoadingScreen onComplete={() => setIsLoading(false)} />
            </div>
        </div>
    );
  }

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/map" element={<PrivateRoute><Map /></PrivateRoute>} />
          <Route path="/feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;