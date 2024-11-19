// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import CourseList from "./components/CourseList";
import Navbar from "./components/Navbar";
import MyCourses from "./components/MyCourses";
import { CartProvider, useCart } from "./context/CartContext";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

const FetchSubscribedCourses = () => {
  const { updateSubscribedCourses } = useCart();

  useEffect(() => {
    const fetchSubscribedCourses = async () => {
      const url = import.meta.env.VITE_SN_API_URL_BASE;
      const learnerId = "8c17c7f0eb32010045e1a5115206fe17";

      try {
        const response = await axios.get(
          `${url}/x_quo_coursehub_course_subscription?sysparm_query=learner=${learnerId}`,
          {
            auth: {
              username: import.meta.env.VITE_SN_USERNAME,
              password: import.meta.env.VITE_SN_PASSWORD,
            },
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const subscriptions = response.data.result.map((sub) => ({
          subscriptionId: sub.sys_id,
          courseId: sub.course.value,
        }));

        updateSubscribedCourses(subscriptions);
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };

    fetchSubscribedCourses();
  }, [updateSubscribedCourses]);

  return null;
};

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // Fetch user details with the token
  //     axios
  //       .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
  //       .then((response) => {
  //         setUser(response.data.user);
  //       })
  //       .catch(() => {
  //         // If token is invalid, clear it
  //         localStorage.removeItem("token");
  //       });
  //   }
  // }, []);

  return (
    <Router>
      <CartProvider>
        <FetchSubscribedCourses />
        <Navbar />
        <Routes>
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
      </CartProvider>
    </Router>
  );
}

export default App;
