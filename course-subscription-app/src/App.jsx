import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import CourseList from "./components/CourseList";
import Navbar from "./components/Navbar";
import MyCourses from "./components/MyCourses";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import { useCart } from "./context/CartContext";
import { fetchSubscribedCourses } from "./utils/api";

function App() {
  const { updateSubscribedCourses } = useCart();

  useEffect(() => {
    const learnerId = localStorage.getItem("learnerId");
    if (!learnerId) return;

    const loadSubscribedCourses = async () => {
      try {
        const courses = await fetchSubscribedCourses(learnerId);
        updateSubscribedCourses(courses);
      } catch (error) {
        console.error("Failed to load subscribed courses:", error);
      }
    };

    loadSubscribedCourses();
  }, []);

  return (
    <Router>
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
        <Route path="/" element={<CourseList />} />
        <Route path="/my-courses" element={<MyCourses />} />
      </Routes>
    </Router>
  );
}

export default App;
