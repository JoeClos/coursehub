import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCourses } from "../../store/CourseContext";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { green } from "@mui/material/colors";

const AddCourse = () => {
  const { addNewCourse, setCourses } = useCourses();
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState({
    title: "",
    courseType: "Online",
    description: "",
    duration: { days: "", hours: "", minutes: "" },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Check if at least one field has a value
  const isFormEmpty = () => {
    return (
      !newCourse.title.trim() &&
      !newCourse.description.trim() &&
      !newCourse.duration.days.trim() &&
      !newCourse.duration.hours.trim() &&
      !newCourse.duration.minutes.trim()
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["days", "hours", "minutes"].includes(name)) {
      setNewCourse((prev) => ({
        ...prev,
        duration: { ...prev.duration, [name]: value },
      }));
    } else {
      setNewCourse((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const courseWithDefaultDuration = {
      ...newCourse,
      duration: {
        days: newCourse.duration.days || 0,
        hours: newCourse.duration.hours || 0,
        minutes: newCourse.duration.minutes || 0,
      },
    };

    try {
      await addNewCourse(courseWithDefaultDuration);
      setSuccess(true);
      setCourses((prevCourses) => [...prevCourses, courseWithDefaultDuration]);
      setNewCourse({
        title: "",
        description: "",
        courseType: "Online",
        duration: { days: "", hours: "", minutes: "" },
      });
    } catch (err) {
      setError("Failed to add course. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewCourse({
      title: "",
      courseType: "Online",
      description: "",
      duration: { days: "", hours: "", minutes: "" },
    });
  };

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
      <Typography variant="h5" mb={2} textAlign="center">
        Add a New Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={newCourse.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={newCourse.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          fullWidth
          select
          label="Type"
          name="courseType"
          value={newCourse.courseType}
          onChange={handleChange}
          margin="normal"
          required
        >
          <MenuItem value="Online">Online</MenuItem>
          <MenuItem value="Offline">Offline</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
        </TextField>
        <Typography variant="subtitle1" mt={2} mb={1}>
          Duration (Leave empty for 0)
        </Typography>
        <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
          <TextField
            label="Days"
            name="days"
            type="number"
            value={newCourse.duration.days}
            onChange={handleChange}
          />
          <TextField
            label="Hours"
            name="hours"
            type="number"
            value={newCourse.duration.hours}
            onChange={handleChange}
          />
          <TextField
            label="Minutes"
            name="minutes"
            type="number"
            value={newCourse.duration.minutes}
            onChange={handleChange}
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
            onClick={() => navigate("/dashboard/courses")}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Back to courses
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            disabled={loading || isFormEmpty()}
            sx={{
              bgcolor: green[500],
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {loading ? "Adding..." : "Add Course"}
          </Button>

          <Button
            variant="contained"
            sx={{
              color: "#FFFFFF",
              backgroundColor: "#FEDB30",
              width: { xs: "100%", sm: "auto" },
            }}
            startIcon={<CancelIcon />}
            onClick={handleCancel}
            disabled={isFormEmpty()}
          >
            Cancel
          </Button>
        </Box>
      </form>

      {success && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={success}
          autoHideDuration={4000}
          onClose={() => setSuccess(false)}
        >
          <Alert onClose={() => setSuccess(false)} severity="success">
            Course added successfully!
          </Alert>
        </Snackbar>
      )}

      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={!!error}
          autoHideDuration={4000}
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default AddCourse;
