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
      style={{
        paddingTop: "30px",
        paddingBottom: "50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          padding: "20px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #6f73d2 0%, #c2d5f5 100%)",
          color: "#fff",
          textAlign: "center",
          position: "relative",
          animation: "slideUp 1s ease-in-out",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            letterSpacing: "1.5px",
          }}
        >
          Available Courses
        </Typography>
        <Typography
          variant="h6"
          component="p"
          style={{
            fontSize: "1.2rem",
            margin: "10px 0",
            fontWeight: "300",
          }}
        >
          Explore a variety of courses tailored to your interests. Subscribe now
          to stay informed about the latest offerings and enhance your learning
          journey.
        </Typography>

        {/* Triangle Shape */}
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "0",
            height: "0",
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderTop: "20px solid #6f73d2", // Matches background
          }}
        />
      </Box>

      <Box
        style={{
          marginTop: "30px",
          animation: "slideUp 1s ease-in-out",
        }}
      >
        <CardList
          courses={filteredCourses}
          highlightText={highlightText}
          getSubscriptionForCourse={getSubscriptionForCourse}
          handleSubscribe={(course) => subscribeToCourse(learnerId, course)}
          handleUnsubscribe={unsubscribeFromCourse}
          handleOpen={handleOpen}
        />
      </Box>

      <CourseModalDescription
        open={open}
        handleClose={handleClose}
        course={selectedCourse}
      />
    </Container>
  );
};

CourseList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default CourseList;
