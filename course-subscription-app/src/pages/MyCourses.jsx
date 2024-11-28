import { useEffect } from "react";
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
import { fetchSubscribedCourses } from "../utils/api";
import { useCart } from "../store/CartContext";

const MyCourses = () => {
  const { subscribedCourses, updateSubscribedCourses, unsubscribeFromCourse } =
    useCart();
  const learnerId = localStorage.getItem("learnerId");

  useEffect(() => {
    const getSubscriptions = async () => {
      if (!learnerId) {
        console.warn("Learner ID is not available.");
        return;
      }

      try {
        const subscriptionData = await fetchSubscribedCourses(learnerId);

        if (subscriptionData.length === 0) {
          console.log("No subscriptions found.");
        } else {
          const subscriptions = subscriptionData.map((sub) => ({
            _id: sub._id,
            courseId: { _id: sub.courseId._id, title: sub.courseId.title },
          }));

          updateSubscribedCourses(subscriptions);
        }
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };

    getSubscriptions();
  }, [learnerId, updateSubscribedCourses]);

  const handleUnsubscribe = async (subscriptionId) => {
    await unsubscribeFromCourse(subscriptionId);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "30px", paddingBottom: "50px" }}>
      <Box
        sx={{
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
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
        {subscribedCourses.length === 0 ? (
          <Typography variant="body1" sx={{ color: "#555" }}>
            You have not subscribed to any courses yet.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {subscribedCourses.map((sub) => (
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
                  <CardActions sx={{justifyContent: "space-around"}}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: { xs: "10px", sm: "12px", md: "13px" },
                        padding: {
                          xs: "8px 10px",
                        },
                        marginBottom: "1rem"
                      }}
                    >
                      View Course
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleUnsubscribe(sub._id)}
                      variant="contained"
                      color="primary"
                      sx={{
                        fontSize: { xs: "10px", sm: "12px", md: "13px" },
                        padding: {
                          xs: "8px 10px",
                        },
                        marginBottom: "1rem"
                      }}
                    >
                      Unsubscribe
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default MyCourses;
