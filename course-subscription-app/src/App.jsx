import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CourseList from "./components/CourseList";
import Navbar from "./components/Navbar";
import MyCourses from "./components/MyCourses";
import { CartProvider } from "./context/CartContext";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [subscribedCourses, setSubscribedCourses] = useState([]);

  useEffect(() => {
    const fetchSubscribedCourses = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const learnerId = localStorage.getItem("learnerId");
      try {
        const response = await axios.get(
          `${baseUrl}/subscriptions/${learnerId}`
        );
        setSubscribedCourses(response.data);
        console.log(
          "🚀 ~ fetchSubscribedCourses ~ response.data:",
          response.data
        );
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };
    fetchSubscribedCourses();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <CourseList
                  subscribedCourses={subscribedCourses}
                  setSubscribedCourses={setSubscribedCourses}
                />
              }
            />
            <Route path="/my-courses" element={<MyCourses />} />
          </Routes>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
