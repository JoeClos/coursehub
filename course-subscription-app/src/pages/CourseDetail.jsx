import { Card, CardContent, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

const CourseCard = ({ course, highlightText, isSubscribed, onSubscribe, onUnsubscribe }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {highlightText(course.title)} {/* Highlight the search text in title */}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {highlightText(course.description)} {/* Highlight the search text in description */}
        </Typography>
        <Button
          onClick={isSubscribed ? onUnsubscribe : onSubscribe}
          variant="contained"
          color={isSubscribed ? "secondary" : "primary"}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
      </CardContent>
    </Card>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  highlightText: PropTypes.func.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
};

export default CourseCard;
