import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseList from "./components/CourseList";
import Navbar from "./components/Navbar";
import MyCourses from "./components/MyCourses";
import Users from "./components/Users";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
