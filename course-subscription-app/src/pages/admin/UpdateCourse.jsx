import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Grid,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useCourses } from "../../store/CourseContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UpdateIcon from "@mui/icons-material/Update";
import AlertNotification from "../../components/AlertNotification";

const UpdateCourse = () => {
  const { updateCourseById, getCourseById, course } = useCourses();
  const { courseId } = useParams();
  const [newInfo, setNewInfo] = useState(null);
  const [notification, setNotification] = useState({ type: "", text: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch course details by id to pre-fill the form
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        await getCourseById(courseId);
      } catch (err) {
        console.log("🚀 ~ fetchCourse ~ err:", err);
        setNotification({
          type: "error",
          text: "Failed to fetch course details.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  // Set course data in the form once fetched
  useEffect(() => {
    if (course) {
      setNewInfo(course);
    }
  }, [course]);

  // Function to check if any form field has changed
  const isFormChanged = () => {
    if (!newInfo) return false;

    return Object.keys(newInfo).some(
      (key) => newInfo[key] !== course[key] && newInfo[key] !== undefined
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInfo((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleDurationChange = (e) => {
    const { name, value } = e.target;
    setNewInfo((prevCourse) => ({
      ...prevCourse,
      duration: { ...prevCourse.duration, [name]: value },
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateCourseById(courseId, newInfo);
      setNotification({
        type: "success",
        text: "Course updated successfully!",
      });
      setOpenSnackbar(true);
      setTimeout(() => navigate("/dashboard/courses"), 2000);
    } catch (err) {
      console.error("Error updating course:", err);
      setNotification({
        type: "error",
        text: "Failed to update course. Please try again.",
      });
      setOpenSnackbar(true);
    }
    setConfirmDialogOpen(false);
  };

  const handleCancel = () => {
    setNewInfo(course);
  };

  const handleOpenConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };

  const handleBackButton = () => {
    // Navigate back to the course list or dashboard
    navigate("/dashboard/courses");
  };

  // Show loading spinner if the course is still being fetched
  if (loading || !newInfo) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h4" gutterBottom mb={4}>
        Update{" "}
        <Typography
          component="span"
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#1E88E5",
            borderBottom: "4px solid #FF8E53",
            paddingBottom: "5px",
          }}
        >
          {course.title}
        </Typography>{" "}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Course Title"
            name="title"
            value={newInfo.title}
            onChange={handleInputChange}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Course Type"
            name="courseType"
            select
            value={newInfo.courseType}
            onChange={handleInputChange}
            variant="outlined"
          >
            {/* Define the select options */}
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Offline">Offline</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={newInfo.description}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Duration (Days)"
            name="days"
            value={newInfo.duration.days}
            onChange={handleDurationChange}
            variant="outlined"
            type="number"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Duration (Hours)"
            name="hours"
            value={newInfo.duration.hours}
            onChange={handleDurationChange}
            variant="outlined"
            type="number"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Duration (Minutes)"
            name="minutes"
            value={newInfo.duration.minutes}
            onChange={handleDurationChange}
            variant="outlined"
            type="number"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackButton}
            sx={{ marginTop: 2 }}
          >
            Back to courses
          </Button>
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            sx={{
              bgcolor: "#757AD5",
              borderColor: "#757AD5",
              marginTop: 2,
              marginLeft: 2,
            }}
            onClick={handleOpenConfirmDialog}
            disabled={loading || !isFormChanged()}
          >
            {loading ? "Updating..." : "Update Course"}
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={notification.type}
          sx={{ width: "100%" }}
        >
          {notification.text}
        </Alert>
      </Snackbar>

      <AlertNotification
        open={confirmDialogOpen}
        onClose={() => {
          setConfirmDialogOpen(false);
          handleCancel();
        }}
        onConfirm={handleUpdate}
        title="Confirm Update"
        content="Are you sure you want to update this course?"
        confirmText="Proceed"
        cancelText="Cancel"
        confirmColor="warning"
        cancelStyle={{ backgroundColor: "#FEDB30", color: "#FFFFFF" }}
      />
    </Box>
  );
};

export default UpdateCourse;
