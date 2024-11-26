import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import CourseCard from "./CourseCard";

const CardList = ({ courses, highlightText, getSubscriptionForCourse, handleSubscribe, handleUnsubscribe }) => {
  return (
    <Grid container spacing={3}>
      {courses.map((course) => {
        const subscriptionId = getSubscriptionForCourse(course._id);
        return (
          <Grid item xs={12} sm={6} md={4} xl={3} key={course._id}>
            <CourseCard
              course={course}
              highlightText={highlightText}
              isSubscribed={!!subscriptionId}
              onSubscribe={() => handleSubscribe(course)}
              onUnsubscribe={() => handleUnsubscribe(subscriptionId)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

CardList.propTypes = {
  courses: PropTypes.array.isRequired,
  highlightText: PropTypes.func.isRequired,
  getSubscriptionForCourse: PropTypes.func.isRequired,
  handleSubscribe: PropTypes.func.isRequired,
  handleUnsubscribe: PropTypes.func.isRequired,
};

export default CardList;
