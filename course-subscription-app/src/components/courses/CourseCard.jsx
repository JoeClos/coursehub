import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Tooltip,
  IconButton,
  Divider,
} from "@mui/material";
import { SlClock } from "react-icons/sl";
import PropTypes from "prop-types";

const CourseCard = ({
  course,
  highlightText,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
  onOpen,
}) => {
  return (
    <Card style={{ cursor: "pointer", padding: "16px", borderRadius: "8px" }}>
      <CardContent onClick={onOpen} style={{ padding: "16px" }}>
        <Typography
          variant="h5"
          component="div"
          style={{ marginBottom: "12px" }}
        >
          {highlightText(course.title)}
        </Typography>
        <Divider style={{ marginBottom: "12px" }} />

        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginBottom: "12px" }}
        >
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
      <CardActions style={{ justifyContent: "space-between", padding: "16px" }}>
        <Button
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
        >
          View Details
        </Button>
        {isSubscribed ? (
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onUnsubscribe();
            }}
          >
            Unsubscribe
          </Button>
        ) : (
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onSubscribe();
            }}
          >
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
  onOpen: PropTypes.func.isRequired,
};

export default CourseCard;
