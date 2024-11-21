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
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";

// const FetchSubscribedCourses = () => {
//   const { updateSubscribedCourses } = useCart();
//   const learnerId = localStorage.getItem("learnerId");

//   useEffect(() => {
//     const baseUrl = import.meta.env.VITE_API_BASE_URL;

//     const fetchSubscribedCourses = async () => {
//       try {
//         // Update with your backend URL
//         const response = await axios.get(
//           `${baseUrl}/subscriptions/${learnerId}`
//         );

//         // Assuming the response data structure includes the result
//         const subscriptions = response.data.map((sub) => ({
//           subscriptionId: sub._id, // MongoDB's ObjectId field
//           courseId: sub.courseId, // Assuming the course has an _id field
//           // courseTitle: sub.course.title, // Assuming the course model has a 'title' field
//         }));

//         updateSubscribedCourses(subscriptions);
//       } catch (error) {
//         console.error("Error fetching subscribed courses:", error);
//       }
//     };

//     fetchSubscribedCourses();
//   }, [learnerId, updateSubscribedCourses]);

//   return null;
// };

function App() {
  return (
    <AuthProvider>
      <Router>
        <CartProvider>
          {/* <FetchSubscribedCourses /> */}
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
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
