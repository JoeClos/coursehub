import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const Subscription = ({ subscribedCourses }) => {
  // Handle loading state
  if (subscribedCourses === null) {
    return <Typography>Loading...</Typography>;
  }

  // Handle no subscriptions
  if (subscribedCourses.length === 0) {
    return <Typography>No subscriptions available.</Typography>;
  }

  // Render the subscribed courses
  return (
    <Box>
      <Typography variant="h6">Subscribed Courses</Typography>
      {subscribedCourses.map((sub) => (
        <Typography key={sub.subscriptionId}>{sub.courseId.title}</Typography>
      ))}
    </Box>
  );
};

Subscription.propTypes = {
  subscribedCourses: PropTypes.arrayOf(
    PropTypes.shape({
      subscriptionId: PropTypes.string.isRequired,
      courseId: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default Subscription;
