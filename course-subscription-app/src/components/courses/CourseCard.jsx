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
          // variant="h5"
          component="div"
          sx={{
            // fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.40rem" },
            marginBottom: "12px",
          }}
        >
          {highlightText(course.title)}
        </Typography>
        <Divider style={{ marginBottom: "12px" }} />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: "14px", sm: "16px" }, marginBottom: "12px" }}
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "14px", sm: "16px" } }}
          >
            {course.duration.hours} hours
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        style={{ justifyContent: "space-between", padding: "0 16px" }}
      >
        <Button
          size="small"
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          sx={{
            fontSize: { xs: "10px", sm: "12px", md: "13px" },
            padding: {
              xs: "8px 10px",
            },
            borderColor: "#757AD5",
            color: "#757AD5",
          }}
        >
          View Details
        </Button>
        {isSubscribed ? (
          <Button
            size="small"
            variant="contained"
            // color="primary"
            onClick={(e) => {
              e.stopPropagation();
              onUnsubscribe();
            }}
            sx={{
              backgroundColor: "#757AD5",
              borderColor: "#757AD5",
              fontSize: { xs: "10px", sm: "12px", md: "13px" },
              padding: {
                xs: "8px 10px",
              },
            }}
          >
            Unsubscribe
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              onSubscribe();
            }}
            sx={{
              fontSize: { xs: "10px", sm: "12px", md: "13px" },
              padding: {
                xs: "8px 10px",
              },
              borderColor: "#757AD5",
              color: "#757AD5",
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
