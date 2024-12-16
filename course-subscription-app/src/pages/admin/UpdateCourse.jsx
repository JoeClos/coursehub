import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
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
    <Box
      sx={{
        mx: "auto",
        mt: 4,
        p: 2,
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
        padding: { xs: 1, sm: 2 },
        maxWidth: { xs: "90%", sm: 600 },
      }}
    >
      <Typography
        variant="h5"
        mb={2}
        textAlign="center"
        sx={{
          fontWeight: "bold",
          color: "#1E88E5",
          borderBottom: "4px solid #FF8E53",
          paddingBottom: "5px",
        }}
      >
        {course.title}
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOpenConfirmDialog();
        }}
      >
        <TextField
          fullWidth
          label="Course Title"
          name="title"
          value={newInfo.title}
          onChange={handleInputChange}
          margin="normal"
        />

        <TextField
          fullWidth
          select
          label="Course Type"
          name="courseType"
          value={newInfo.courseType}
          onChange={handleInputChange}
          margin="normal"
        >
          <MenuItem value="Online">Online</MenuItem>
          <MenuItem value="Offline">Offline</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={newInfo.description}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={4}
        />
        <Typography variant="subtitle1" mt={2} mb={1}>
          Duration (DD:HH:MM)
        </Typography>
        <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
          <TextField
            label="Days"
            name="days"
            type="number"
            value={newInfo.duration.days}
            onChange={handleDurationChange}
          />
          <TextField
            label="Hours"
            name="hours"
            type="number"
            value={newInfo.duration.hours}
            onChange={handleDurationChange}
          />
          <TextField
            label="Minutes"
            name="minutes"
            type="number"
            value={newInfo.duration.minutes}
            onChange={handleDurationChange}
          />
        </Box>
        <Box
          mt={2}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          gap={2}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={handleBackButton}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Back to courses
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={<UpdateIcon />}
            disabled={loading || !isFormChanged()}
            onClick={handleOpenConfirmDialog}
            sx={{
              bgcolor: "#757AD5",
              borderColor: "#757AD5",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {loading ? "Updating..." : "Update Course"}
          </Button>
        </Box>
      </form>

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
        content={
          <Typography variant="body1">
            Are you sure you want to update <strong  style={{ color: "#1E88E5" }}>{course.title}</strong>{" "}
            course?
          </Typography>
        }
        confirmText="Proceed"
        cancelText="Cancel"
        confirmColor="warning"
        cancelStyle={{ backgroundColor: "#FEDB30", color: "#FFFFFF" }}
      />
    </Box>
  );
};

export default UpdateCourse;
