import { useEffect, useState } from "react";
import {
  fetchCourses,
  subscribeToCourse,
  unsubscribeFromCourse,
  fetchSubscribedCourses
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
import { useCart } from "../context/CartContext";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { subscribedCourses, updateSubscribedCourses, clearSubscribedCourses} = useCart();
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
  }, [learnerId, clearSubscribedCourses, updateSubscribedCourses]);

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
        {courses.map((course) => (
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
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
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

export default CourseList;
