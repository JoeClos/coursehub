import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { fetchSubscriptionsForLearner, fetchCourse } from "../utils/api";
import { useCart } from "../store/CartContext";
import CourseModalDescription from "../components/CourseModalDescription";

const MyCourses = () => {
  const { subscriptions, updateSubscribedCourses, unsubscribeFromCourse } =
    useCart();
  const learnerId = localStorage.getItem("learnerId");
  const [selectedCourse, setSelectedCourse] = useState(null);
  console.log("🚀 ~ MyCourses ~ selectedCourse:", selectedCourse);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getSubscriptions = async () => {
      if (!learnerId) {
        console.warn("Learner ID is not available.");
        return;
      }

      try {
        const subscriptionData = await fetchSubscriptionsForLearner(learnerId);
        console.log("🚀 ~ getSubscriptions ~ subscriptionData:", subscriptionData);

        if (subscriptionData.length === 0) {
          console.log("No subscriptions found.");
        } else {
          const subscriptions = subscriptionData.map((sub) => {
            // Ensure courseId exists before extracting properties
            if (sub.courseId) {
              return {
                _id: sub._id,
                courseId: {
                  _id: sub.courseId._id,
                  title: sub.courseId.title,
                  description: sub.courseId.description,
                },
              };
            }
            return null; // Handle null courseId
          }).filter(sub => sub !== null); // Filter out null values

          updateSubscribedCourses(subscriptions);
        }
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };

    getSubscriptions();
  }, [learnerId, updateSubscribedCourses]);

  // useEffect(() => {
  //   const getSubscriptions = async () => {
  //     if (!learnerId) {
  //       console.warn("Learner ID is not available.");
  //       return;
  //     }

  //     try {
  //       const subscriptionData = await fetchSubscribedCourses(learnerId);
  //       console.log(
  //         "🚀 ~ getSubscriptions ~ subscriptionData:",
  //         subscriptionData
  //       );

  //       if (subscriptionData.length === 0) {
  //         console.log("No subscriptions found.");
  //       } else {
  //         const subscriptions = subscriptionData.map((sub) => ({
  //           _id: sub._id,
  //           courseId: {
  //             _id: sub.courseId._id,
  //             title: sub.courseId.title,
  //             description: sub.courseId.description,
  //           },
  //         }));

  //         updateSubscribedCourses(subscriptions);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching subscribed courses:", error);
  //     }
  //   };

  //   getSubscriptions();
  // }, [learnerId, updateSubscribedCourses]);

  const handleUnsubscribe = async (subscriptionId) => {
    await unsubscribeFromCourse(subscriptionId);
  };

  const handleOpen = async (courseId) => {
    try {
      const courseData = await fetchCourse(courseId._id);
      console.log("🚀 ~ handleOpen ~ courseData:", courseData);
      setSelectedCourse(courseData);
      setOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "30px", paddingBottom: "50px" }}>
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontSize: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
            padding: "15px 0",
          }}
        >
          Subscriptions
        </Typography>
        {subscriptions.length === 0 ? (
          <Typography variant="body1" sx={{ color: "#555" }}>
            You have not subscribed to any courses yet.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {subscriptions.map((sub) => (
               sub.courseId ? (
              <Grid item xs={12} sm={6} md={4} key={sub._id}>
                <Card sx={{ borderRadius: "10px" }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.50rem" },
                      }}
                    >
                      {sub.courseId.title}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-around" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: { xs: "10px", sm: "12px", md: "13px" },
                        padding: { xs: "8px 10px" },
                        marginBottom: "1rem",
                        borderColor: "#757AD5",
                        color: "#757AD5",
                      }}
                      onClick={() => handleOpen(sub.courseId)}
                    >
                      View Course
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleUnsubscribe(sub._id)}
                      variant="contained"
                      // color="primary"
                      sx={{
                        backgroundColor: "#757AD5",
                        borderColor: "#757AD5",
                        fontSize: { xs: "10px", sm: "12px", md: "13px" },
                        padding: { xs: "8px 10px" },
                        marginBottom: "1rem",
                      }}
                    >
                      Unsubscribe
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
               ): null
            ))}
          </Grid>
        )}
        <CourseModalDescription
          open={open}
          handleClose={handleClose}
          course={selectedCourse}
        />
      </Box>
    </Container>
  );
};

export default MyCourses;
