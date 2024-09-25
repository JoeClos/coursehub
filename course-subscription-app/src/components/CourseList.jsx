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
import MyCourses from "./MyCourses";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [subscribedCourses, setSubscribedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SN_API_URL_COURSES,
          {
            auth: {
              username: import.meta.env.VITE_SN_USERNAME,
              password: import.meta.env.VITE_SN_PASSWORD,
            },
            headers: {
              "Content-Type": "application/json", 
              "Accept": "application/json",
            },
          }
        );
        setCourses(response.data.result);
        // console.log(
        //   "🚀 ~ fetchCourses ~ response.data.result:",
        //   response.data.result
        // );
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();

    fetchSubscribedCourses();
  }, []);

  const getHoursFromDuration = (duration) => {
    const timePart = duration.split(" ")[1];
    // console.log("🚀 ~ getHoursFromDuration ~ timePart:", timePart);

    const hours = timePart.split(":")[0];
    return hours;
  };

  const fetchSubscribedCourses = async () => {
    const url = import.meta.env.VITE_SN_API_URL_BASE;

    try {
      const learnerId = "8c17c7f0eb32010045e1a5115206fe17";
      // const learnerId = "22826bf03710200044e0bfc8bcbe5dec";
      const response = await axios.get(
        `${url}/x_quo_coursehub_course_subscription?sysparm_query=learner=${learnerId}`,
        {
          auth: {
            username: import.meta.env.VITE_SN_USERNAME,
            password: import.meta.env.VITE_SN_PASSWORD,
          },
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      // Fetch course details for the subscribed courses
      const subscribedCourseIds = response.data.result.map(
        (sub) => sub.course
      );

      if (subscribedCourseIds.length > 0) {
        const coursesResponse = await axios.get(
          `${url}/x_quo_coursehub_course?sysparm_query=sys_idIN${subscribedCourseIds.join(",")}`,
          {
            auth: {
              username: import.meta.env.VITE_SN_USERNAME,
              password: import.meta.env.VITE_SN_PASSWORD,
            },
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          }
        );

        setSubscribedCourses(coursesResponse.data.result);
      }
    } catch (error) {
      console.error("Error fetching subscribed courses:", error);
    }
  };

  const handleSubscribe = async (course) => {
    const url = import.meta.env.VITE_SN_API_URL_BASE;

    try {
      const learnerId = "8c17c7f0eb32010045e1a5115206fe17"; 
      // const learnerId = "22826bf03710200044e0bfc8bcbe5dec"; 
      await axios.post(
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
            "Accept": "application/json",
          },
        }
      );

      // Update local subscribed courses state
      setSubscribedCourses((prev) => [...prev, course]);
      console.log(`Subscribed to course: ${course.title}`);
    } catch (error) {
      console.error("Error subscribing to course:", error);
    }
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={course.sys_id}>
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
                    {getHoursFromDuration(course.duration)} hours
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleSubscribe(course)}>
                  Subscribe
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <MyCourses subscribedCourses={subscribedCourses} />
    </Box>
  );
};

export default CourseList;
