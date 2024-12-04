import { useEffect, useState } from "react";
import { Box, Typography, Container, ButtonGroup, Button } from "@mui/material";
import { fetchCourses, fetchSubscribedCourses } from "../utils/api";
import { useCart } from "../store/CartContext";
import CardList from "../components/courses/CardList";
import PropTypes from "prop-types";
import CourseModalDescription from "../components/CourseModalDescription";

const CourseList = ({ searchQuery }) => {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("All");
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

  // Filtered Courses based on the search query and filter
  const filteredCourses = courses.filter((course) => {
    const matchesSearchQuery =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" || course.courseType === filter;
    return matchesSearchQuery && matchesFilter;
  });

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
      maxWidth="x"
      style={{
        paddingTop: "30px",
        paddingBottom: "50px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          padding: { xs: "15px", sm: "20px" },
          borderRadius: "12px",
          background: "linear-gradient(135deg, #6f73d2 0%, #c2d5f5 100%)",
          color: "#fff",
          textAlign: "center",
          position: "relative",
          animation: "slideUp 1s ease-in-out",
          maxWidth: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: "#201F40",
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem" },
            letterSpacing: "1.5px",
          }}
        >
          Discover Our Courses
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            color: "#201F40",
            fontSize: { xs: "1rem", sm: "1.2rem" },
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Explore a variety of courses tailored to your interests. Subscribe now
          to stay informed about the latest offerings and enhance your learning
          journey.
        </Typography>
        <Box className="triangle-shape" />
      </Box>

      <Box>
        {/* Filter Buttons */}{" "}
        <Box sx={{ textAlign: "center", marginTop: "40px" }}>
          {" "}
          <ButtonGroup variant="contained">
            {" "}
            <Button
              onClick={() => setFilter("All")}
              sx={{
                backgroundColor: filter === "All" ? "#201F40" : " #757AD5",
              }}
            >
              All
            </Button>{" "}
            <Button
              onClick={() => setFilter("Online")}
              sx={{
                backgroundColor: filter === "Online" ? "#201F40" : " #757AD5",
              }}
            >
              Online
            </Button>{" "}
            <Button
              onClick={() => setFilter("Offline")}
              sx={{
                backgroundColor: filter === "Offline" ? "#201F40" : " #757AD5",
              }}
            >
              Offline
            </Button>{" "}
            <Button
              onClick={() => setFilter("Hybrid")}
              sx={{
                backgroundColor: filter === "Hybrid" ? "#201F40" : " #757AD5",
              }}
            >
              Hybrid
            </Button>{" "}
          </ButtonGroup>{" "}
        </Box>
        <Box
          style={{
            marginTop: "40px",
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
