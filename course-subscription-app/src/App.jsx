import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import AuthContext from "./store/AuthContext";

function App() {
  const { updateSubscribedCourses } = useCart();
  const { user, isAdmin, learnerId } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getHomePageElement = () => {
    if (isAdmin) return <Navigate to="/dashboard" />;
    return <CourseList searchQuery={searchQuery} />;
  };

  useEffect(() => {
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
  }, [learnerId, updateSubscribedCourses]);

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
            >
              <Route path="users" element={<ManageUsers />} />
              <Route path="subscriptions" element={<ManageSubscriptions />} />
              <Route path="courses" element={<ManageCourses />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
            <Route path="/" element={getHomePageElement()} />

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
