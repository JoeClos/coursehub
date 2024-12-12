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
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

const AddCourse = () => {
  const { addNewCourse, setCourses} = useCourses();
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState({
    title: "",
    courseType: "Online", //default value
    description: "",
    duration: { days: "", hours: "", minutes: "" },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["days", "hours", "minutes"].includes(name)) {
      // Update nested duration field
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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (["days", "hours", "minutes"].includes(name)) {
  //     // Update nested duration field
  //     setCourses((prev) => ({
  //       ...prev,
  //       duration: { ...prev.duration, [name]: value },
  //     }));
  //   } else {
  //     setCourses({ ...courses, [name]: value });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addNewCourse(newCourse);
      setSuccess(true);
      setCourses(newCourse);
      setNewCourse({
        title: "",
        description: "",
        courseType: "",
        duration: {
          days: "",
          hours: "",
          minutes: "",
        },
      });
      // navigate("/dashboard/courses");
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

  {loading && (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  )}
  
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 2,
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" mb={2}>
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
          Duration
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            label="Days"
            name="days"
            type="number"
            value={newCourse.duration.days || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Hours"
            name="hours"
            type="number"
            value={newCourse.duration.hours || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Minutes"
            name="minutes"
            type="number"
            value={newCourse.duration.minutes || ""}
            onChange={handleChange}
            required
          />
        </Box>
        {/* <TextField
          fullWidth
          label="Duration (hours)"
          name="duration"
          type="number"
          value={courseData.duration}
          onChange={handleChange}
          margin="normal"
          required
        /> */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            // size="small"
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/dashboard/courses")}
          >
            Back
          </Button>
          <Button
            // size="small"
            variant="contained"
            color="error"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            disabled={loading}
            sx={{
              bgcolor: green[500],
              borderColor: "#757AD5",
              marginLeft: 2,
            }}
          >
            {loading ? "Adding..." : "Add Course"}
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
