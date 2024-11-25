import { useEffect, useState } from "react";
import {
  fetchCourses,
  subscribeToCourse,
  unsubscribeFromCourse,
  fetchSubscribedCourses,
} from "../utils/api";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { SlClock } from "react-icons/sl";
import { useCart } from "../store/CartContext";
import PropTypes from "prop-types";

const CourseList = ({ searchQuery }) => {
  const [courses, setCourses] = useState([]);
  const { subscribedCourses, updateSubscribedCourses, clearSubscribedCourses } =
    useCart();
  const learnerId = localStorage.getItem("learnerId");

  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        if (!learnerId) {
          clearSubscribedCourses(); // Clear subscriptions if no learner is logged in
          return;
        }

        const subscriptions = await fetchSubscribedCourses(learnerId); // Fetch subscriptions for the new user
        updateSubscribedCourses(subscriptions);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    getSubscriptions();
  }, [learnerId]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getCourses();
  }, []);

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to highlight the search term within a string
  const highlightText = (text) => {
    if (!searchQuery) return text; // If no search term, return text as it is
    const regex = new RegExp(`(${searchQuery})`, "gi"); // Create a case-insensitive regex
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSubscribe = async (course) => {
    try {
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
    } catch (error) {
      console.error("Error subscribing to course:", error);
    }
  };

  const handleUnsubscribe = async (subscriptionId) => {
    try {
      await unsubscribeFromCourse(subscriptionId);

      // Remove the unsubscribed course from the UI
      updateSubscribedCourses((prev) =>
        prev.filter((sub) => sub._id !== subscriptionId)
      );
    } catch (error) {
      console.error("Error unsubscribing from course:", error);
    }
  };

  const getSubscriptionForCourse = (courseId) => {
    const subscription = subscribedCourses.find(
      (sub) => sub.courseId._id === courseId // Ensure matching against _id
    );
    return subscription ? subscription._id : null;
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={course._id}>
            <Card
              sx={{
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {highlightText(course.title)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {highlightText(course.description)}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Tooltip title="Duration">
                    <IconButton>
                      <SlClock />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body2" color="text.secondary">
                    {course.duration.hours} hours
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                {getSubscriptionForCourse(course._id) ? (
                  <Button
                    size="small"
                    onClick={() =>
                      handleUnsubscribe(getSubscriptionForCourse(course._id))
                    }
                  >
                    Unsubscribe
                  </Button>
                ) : (
                  <Button size="small" onClick={() => handleSubscribe(course)}>
                    Subscribe
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

CourseList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default CourseList;
