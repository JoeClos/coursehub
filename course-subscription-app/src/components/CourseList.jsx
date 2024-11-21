import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardActions, CardContent, Typography, Button, Grid, IconButton, Tooltip } from "@mui/material";
import { SlClock } from "react-icons/sl";
import { useCart } from "../context/CartContext";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { subscribedCourses, updateSubscribedCourses } = useCart();
  const learnerId = localStorage.getItem("learnerId");

  useEffect(() => {
    const fetchCourses = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await fetch(`${baseUrl}/api/courses`);

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubscribe = async (course) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await axios.post(`${baseUrl}/api/subscribe`, {
        learnerId: learnerId,
        courseId: course._id,
        subscriptionDate: new Date().toISOString(),
      });

      const newSubscription = {
        ...response.data,
        courseId: {
          _id: course._id,
          title: course.title,
        },
      };

      updateSubscribedCourses((prev) => [...prev, newSubscription]);
    } catch (error) {
      console.error("Error subscribing to course:", error);
    }
  };

  const handleUnsubscribe = async (subscriptionId) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      await axios.delete(`${baseUrl}/api/unsubscribe/${subscriptionId}`);

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
