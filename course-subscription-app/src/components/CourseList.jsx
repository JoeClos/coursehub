import { useEffect, useState } from "react";
import axios from "axios";
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

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const learnerId = "8c17c7f0eb32010045e1a5115206fe17"; // Learner ID

  useEffect(() => {
    // const fetchCourses = async () => {
    //   try {
    //     const response = await axios.get(
    //       import.meta.env.VITE_SN_API_URL_COURSES,
    //       {
    //         auth: {
    //           username: import.meta.env.VITE_SN_USERNAME,
    //           password: import.meta.env.VITE_SN_PASSWORD,
    //         },
    //       }
    //     );
    //     setCourses(response.data.result);
    //   } catch (error) {
    //     console.error("Error fetching courses:", error);
    //   }
    // };

    const fetchCourses = async () => {
      const baseUrl = import.meta.env.VITE_API_URL_BASE;
      try {
        const response = await fetch(`${baseUrl}/courses`)

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data);
        console.log("🚀 ~ fetchCourses ~ data:", data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchSubscribedCourses = async () => {
      const url = import.meta.env.VITE_SN_API_URL_BASE;
      try {
        const response = await axios.get(
          `${url}/x_quo_coursehub_course_subscription?sysparm_query=learner=${learnerId}`,
          {
            auth: {
              username: import.meta.env.VITE_SN_USERNAME,
              password: import.meta.env.VITE_SN_PASSWORD,
            },
          }
        );

        // Update state with the subscription details (subscriptionId, courseId)
        const subscriptions = response.data.result.map((sub) => ({
          subscriptionId: sub.sys_id, // Subscription record ID
          courseId: sub.course.value, // Course ID from the subscription
        }));
        setSubscribedCourses(subscriptions);
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };

    fetchCourses();
    fetchSubscribedCourses();
  }, []);

  const handleSubscribe = async (course) => {
    const url = import.meta.env.VITE_SN_API_URL_BASE;
    try {
      const response = await axios.post(
        `${url}/x_quo_coursehub_course_subscription`,
        {
          learner: learnerId,
          course: course.sys_id,
          subscription_date: new Date().toISOString(),
        },
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

      // Add the new subscription to the state
      const newSubscription = {
        subscriptionId: response.data.result.sys_id, // Subscription ID returned from API
        courseId: course.sys_id, // Course ID
      };
      setSubscribedCourses((prev) => [...prev, newSubscription]);
    } catch (error) {
      console.error("Error subscribing to course:", error);
    }
  };

  const handleUnsubscribe = async (subscriptionId) => {
    const url = import.meta.env.VITE_SN_API_URL_BASE;
    try {
      await axios.delete(
        `${url}/x_quo_coursehub_course_subscription/${subscriptionId}`,
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

      // Remove the unsubscribed course from the state
      setSubscribedCourses((prev) =>
        prev.filter((sub) => sub.subscriptionId !== subscriptionId)
      );
    } catch (error) {
      console.error("Error unsubscribing", error);
    }
  };

  // Function to check if a course is already subscribed and return the subscription ID
  const getSubscriptionForCourse = (courseId) => {
    const subscription = subscribedCourses.find(
      (sub) => sub.courseId === courseId
    );
    return subscription ? subscription.subscriptionId : null;
  };

  // const getHoursFromDuration = (duration) => {
  //   const timePart = duration.split(" ")[1];
  //   console.log("🚀 ~ getHoursFromDuration ~ timePart:", timePart);

  //   const hours = timePart.split(":")[0];
  //   return hours;
  // };

  return (
    <Box style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          // <Grid item xs={12} sm={6} md={4} xl={3} key={course.sys_id}>
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
                  {/* map through course to get hours*/}
                  <Typography variant="body2" color="text.secondary">
                    {course.duration.hours} hours
                  </Typography>
                  {/* <Typography variant="body2" color="text.secondary">
                    {getHoursFromDuration(course.duration)} hours
                  </Typography> */}
                </Box>
              </CardContent>
              <CardActions>
                {getSubscriptionForCourse(course.sys_id) ? (
                  <Button
                    size="small"
                    onClick={() =>
                      handleUnsubscribe(getSubscriptionForCourse(course.sys_id))
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
