import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Container,
  Modal,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import {
  fetchCourses,
  fetchSubscribedCourses,
  subscribeToCourse,
  unsubscribeFromCourse,
} from "../utils/api";
import { useCart } from "../store/CartContext";
import CardList from "../components/courses/CardList";
import PropTypes from "prop-types";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CourseList = ({ searchQuery }) => {
  const [courses, setCourses] = useState([]);
  const { subscribedCourses, updateSubscribedCourses, clearSubscribedCourses } =
    useCart();
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

  const handleSubscribe = useCallback(
    async (course) => {
      const newSubscription = await subscribeToCourse(learnerId, course._id);
      updateSubscribedCourses((prev) => [
        ...prev,
        {
          ...newSubscription,
          courseId: {
            _id: course._id,
            title: course.title,
          },
        },
      ]);
    },
    [learnerId, updateSubscribedCourses]
  );

  const handleUnsubscribe = useCallback(
    async (subscriptionId) => {
      await unsubscribeFromCourse(subscriptionId);
      updateSubscribedCourses((prev) =>
        prev.filter((sub) => sub._id !== subscriptionId)
      );
    },
    [updateSubscribedCourses]
  );

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
          style={{ fontWeight: "bold", color: "#333" }}
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
          handleSubscribe={handleSubscribe}
          handleUnsubscribe={handleUnsubscribe}
          handleOpen={handleOpen}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="course-modal-title"
          aria-describedby="course-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px",
          }}
        >
          <Paper
            style={{
              padding: "30px",
              maxWidth: "600px",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography
                id="course-modal-title"
                variant="h5"
                style={{ fontWeight: "bold" }}
              >
                {selectedCourse?.title}
              </Typography>
              <IconButton onClick={handleClose}>
                <HighlightOffIcon />
              </IconButton>
            </Box>
            <Divider />
            <Typography
              id="course-modal-description"
              variant="body1"
              component="p"
              style={{ marginTop: "15px" }}
            >
              {selectedCourse?.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: "18px",
              }}
            >
              <Typography>
                Duration: {selectedCourse?.duration.hours} hours
              </Typography>
              <Typography>{selectedCourse?.courseType}</Typography>
            </Box>
          </Paper>
        </Modal>
      </Box>
    </Container>
  );
};

CourseList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default CourseList;
