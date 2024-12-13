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
import ManageUsers from "./pages/admin/manageUsers/ManageUsers";
import ManageSubscriptions from "./pages/admin/ManageSubscriptions";
import ManageCourses from "./pages/admin/manageCourses.css/ManageCourses";
import Analytics from "./pages/admin/Analytics";
import Register from "./pages/Register";
import { useCart } from "./store/CartContext";
import { fetchSubscribedCourses, unsubscribeFromCourse } from "./utils/api";
import AuthContext from "./store/AuthContext";
import AddCourse from "./pages/admin/AddCourse";
import UpdateCourse from "./pages/admin/UpdateCourse";

function App() {
  const { updateSubscribedCourses } = useCart();
  const { isAdmin, learnerId } = useContext(AuthContext);
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
    <div className="main" id="root">
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
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
              <Route path="courses/add" element={<AddCourse />} />
              <Route path="courses/update/:courseId" element={<UpdateCourse />} />
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
