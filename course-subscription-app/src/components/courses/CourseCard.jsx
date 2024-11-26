import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { SlClock } from "react-icons/sl";
import PropTypes from "prop-types";

const CourseCard = ({
  course,
  highlightText,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
}) => {
  return (
    <Card
      sx={{
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {highlightText(course.title)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {highlightText(course.description)}
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
        {isSubscribed ? (
          <Button size="small" onClick={() => onUnsubscribe()}>
            Unsubscribe
          </Button>
        ) : (
          <Button size="small" onClick={() => onSubscribe()}>
            Subscribe
          </Button>
        )}
      </CardActions>
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
