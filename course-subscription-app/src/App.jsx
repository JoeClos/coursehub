import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseList from "./components/CourseList";
import Navbar from "./components/Navbar";
import MyCourses from "./components/MyCourses";
import { UserProvider } from "./context/UserContext";

function App() {
  const [subscribedCourses, setSubscribedCourses] = useState([]);

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
        setSubscribedCourses(subscriptions);
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };

    fetchSubscribedCourses();
  }, []);
  
  return (
    <Router>
      <UserProvider>
        <Navbar subscribedCourses={subscribedCourses} />
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/my-courses" element={<MyCourses />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;