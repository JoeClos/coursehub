import { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { fetchCourses, fetchSubscribedCourses } from "../utils/api";
import { useCart } from "../store/CartContext";
import CardList from "../components/courses/CardList";
import PropTypes from "prop-types";
import CourseModalDescription from "../components/CourseModalDescription";

const CourseList = ({ searchQuery }) => {
  const [courses, setCourses] = useState([]);
  const {
    subscribedCourses,
    subscribeToCourse,
    unsubscribeFromCourse,
    updateSubscribedCourses,
    clearSubscribedCourses,
  } = useCart();
  const learnerId = localStorage.getItem("learnerId");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  useEffect(() => {
    const getSubscriptions = async () => {
      if (!learnerId) {
        clearSubscribedCourses();
        return;
      }
      const subscriptions = await fetchSubscribedCourses(learnerId);
      updateSubscribedCourses(subscriptions);
    };

    getSubscriptions();
  }, [learnerId, clearSubscribedCourses, updateSubscribedCourses]);

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCourses();
      setCourses(data);
    };

    getCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightText = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span
          key={index}
          style={{
            backgroundColor: "yellow",
            transition: "background-color 0.2s ease",
          }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const getSubscriptionForCourse = (courseId) =>
    subscribedCourses.find((sub) => sub.courseId._id === courseId)?._id || null;

  return (
    <Container
      maxWidth="xl"
      style={{ paddingTop: "30px", paddingBottom: "50px" }}
    >
      <Box style={{ padding: "10px" }}>
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontWeight: "bold", color: "#333",  fontSize: { xs: "1.3rem", sm: "1.5rem", md: "2rem" }, }}
        >
          Available Courses
        </Typography>
        <Typography
          variant="body1"
          component="p"
          style={{ color: "#555", marginBottom: "20px" }}
        >
          Browse and subscribe to the courses that interest you. Stay updated
          with the latest offerings.
        </Typography>
        <CardList
          courses={filteredCourses}
          highlightText={highlightText}
          getSubscriptionForCourse={getSubscriptionForCourse}
          handleSubscribe={(course) => subscribeToCourse(learnerId, course)}
          handleUnsubscribe={unsubscribeFromCourse}
          handleOpen={handleOpen}
        />
        <CourseModalDescription
          open={open}
          handleClose={handleClose}
          course={selectedCourse}
        />
      </Box>
    </Container>
  );
};

CourseList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default CourseList;
