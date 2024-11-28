import PropTypes from "prop-types";
import {
  Modal,
  Paper,
  Box,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CourseModalDescription = ({ open, handleClose, course }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="course-modal-title"
      aria-describedby="course-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px",
      }}
    >
      <Paper
        style={{
          padding: "30px",
          maxWidth: "600px",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            id="course-modal-title"
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#333",
              fontSize: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
            }}
          >
            {course?.title || "Course Details"}
          </Typography>
          <IconButton onClick={handleClose}>
            <HighlightOffIcon />
          </IconButton>
        </Box>
        <Divider />
        <Typography
          id="course-modal-description"
          variant="body1"
          component="p"
          sx={{ fontSize: { xs: "14px", sm: "16px" }, marginTop: "15px" }}
        >
          {course?.description || "No description available."}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "18px",
          }}
        >
          <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
            Duration: {course?.duration?.hours || "N/A"} hours
          </Typography>
          <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
            {course?.courseType || "N/A"}
          </Typography>
        </Box>
      </Paper>
    </Modal>
  );
};

CourseModalDescription.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  course: PropTypes.object,
};

export default CourseModalDescription;
