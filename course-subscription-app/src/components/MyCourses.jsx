import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, Typography, Grid, Button } from "@mui/material";
import UserContext from "../context/UserContext";

const MyCourses = () => {
  const { user } = useContext(UserContext);
  // console.log("🚀 ~ MyCourses ~ user:", user);
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const [courseTitles, setCourseTitles] = useState({});

  useEffect(() => {
    const fetchSubscribedCourses = async () => {
      const url = import.meta.env.VITE_SN_API_URL_BASE;
      const learnerId = user.sys_id; 
      // console.log("🚀 ~ fetchSubscribedCourses ~ learnerId:", learnerId)

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

        // Extract the subscribed courses from the response
        const subscriptions = response.data.result;
        setSubscribedCourses(subscriptions);

        // Fetch course titles for each subscription
        const titlesPromises = subscriptions.map(async (sub) => {
          const courseLink = sub.course.link;
          const courseResponse = await axios.get(courseLink, {
            auth: {
              username: import.meta.env.VITE_SN_USERNAME,
              password: import.meta.env.VITE_SN_PASSWORD,
            },
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
          return {
            id: sub.sys_id,
            title: courseResponse.data.result.title, // Get the title from course response
          };
        });

        // Wait for all titles to be fetched
        const titles = await Promise.all(titlesPromises);
        // Create a mapping of course titles
        const titlesMap = titles.reduce((acc, { id, title }) => {
          acc[id] = title;
          return acc;
        }, {});

        setCourseTitles(titlesMap); // Store course titles in state
        // Log to see the full fetched data
        console.log("Fetched subscriptions:", subscriptions);
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };
    fetchSubscribedCourses();
  }, [user.sys_id]);

  const unsubscribeCourse = async (subscriptionId) => {
    const url = import.meta.env.VITE_SN_API_URL_BASE;
    try {
      const response = await axios.delete(
        `${url}/x_quo_coursehub_course_subscription/${subscriptionId}`,
        {
          auth: {
            username: import.meta.env.VITE_SN_USERNAME,
            password: import.meta.env.VITE_SN_PASSWORD,
          },
        }
      );
      console.log("Unsubscribed successfully", response.data);

      // Update state to remove the unsubscribed course
      setSubscribedCourses((prevCourses) =>
        prevCourses.filter((sub) => sub.sys_id !== subscriptionId)
      );

      // Also remove course title
      setCourseTitles((prevTitles) => {
        const newTitles = { ...prevTitles };
        delete newTitles[subscriptionId];
        return newTitles;
      });
    } catch (error) {
      console.error("Error unsubscribing", error);
    }
  };

  return (
    <Box style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        My courses
      </Typography>
      <Grid container spacing={3}>
        {subscribedCourses.length === 0 ? (
          <Typography>No subscribed courses available.</Typography>
        ) : (
          subscribedCourses.map((sub) => (
            <Grid item xs={12} sm={6} md={4} key={sub.sys_id}>
              <Box border={1} borderRadius={5} padding={2}>
                <Typography variant="h6">
                  {courseTitles[sub.sys_id] || "Loading title..."}
                </Typography>
                <Button onClick={() => unsubscribeCourse(sub.sys_id)}>
                  Unsubscribe
                </Button>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default MyCourses;
