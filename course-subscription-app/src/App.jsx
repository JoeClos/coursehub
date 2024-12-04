import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import CourseList from "./pages/CourseList";
import Navbar from "./components/Navbar";
import MyCourses from "./pages/MyCourses";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageSubscriptions from "./pages/admin/ManageSubscriptions";
import ManageCourses from "./pages/admin/ManageCourses";
import Analytics from "./pages/admin/Analytics";
import Register from "./pages/Register";
import { useCart } from "./store/CartContext";
import { fetchSubscribedCourses, unsubscribeFromCourse } from "./utils/api";

function App() {
  const { updateSubscribedCourses } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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
  }, [updateSubscribedCourses]);

  return (
    <div className="main">
      <Router>
        <Navbar onSearch={handleSearch} />
        <div className="content">
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
              path="/dashboard/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/subscriptions"
              element={
                <ProtectedRoute requiredRole="admin">
                  <ManageSubscriptions />
                </ProtectedRoute>
              }
            />{" "}
            <Route
              path="/dashboard/courses"
              element={
                <ProtectedRoute requiredRole="admin">
                  <ManageCourses />
                </ProtectedRoute>
              }
            />{" "}
            <Route
              path="/dashboard/analytics"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={<CourseList searchQuery={searchQuery} />}
            />
            <Route
              path="/my-courses"
              element={
                <MyCourses unsubscribeFromCourse={unsubscribeFromCourse} />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
