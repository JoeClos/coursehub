// import { useEffect } from "react";
// import axios from "axios";
// import { useCart } from "../context/CartContext";

// const Subscription = () => {
//   const { updateSubscribedCourses } = useCart();
//   const learnerId = localStorage.getItem("learnerId");

//   useEffect(() => {
//     const fetchSubscribedCourses = async () => {
//       try {
//         const baseUrl = import.meta.env.VITE_API_BASE_URL;
//         const response = await axios.get(`${baseUrl}/subscriptions/${learnerId}`);
//         const subscriptions = response.data.map((sub) => ({
//           subscriptionId: sub._id,
//           courseId: sub.courseId,
//         }));

//         updateSubscribedCourses(subscriptions);
//       } catch (error) {
//         console.error("Error fetching subscribed courses:", error);
//       }
//     };

//     if (learnerId) {
//       fetchSubscribedCourses();
//     }
//   }, [learnerId, updateSubscribedCourses]);

//   return null;
// };

// export default Subscription;

import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const Subscription = ({ subscribedCourses }) => {
  // Handle loading state
  //   if (subscribedCourses === null) {
  //     return <Typography>Loading...</Typography>;
  //   }

  //   // Handle no subscriptions
  //   if (subscribedCourses.length === 0) {
  //     return <Typography>No subscriptions available.</Typography>;
  //   }

  // Render the subscribed courses
  return (
    <Box>
      <Typography variant="h6">Subscribed Courses</Typography>
      {subscribedCourses.map((course) => (
        <Typography key={course.courseId}>{course.courseId}</Typography>
      ))}
    </Box>
  );
};

Subscription.propTypes = {
  subscribedCourses: PropTypes.arrayOf(
    PropTypes.shape({
      courseId: PropTypes.string.isRequired,
      title: PropTypes.string, // Made optional since not used in rendering
    })
  ),
};

export default Subscription;
