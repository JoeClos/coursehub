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
  const { addNewCourse, setCourses } = useCourses();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Set default values for duration fields
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

  const isFormChanged = () => {
    if (!newCourse) return false;

    return Object.keys(newCourse).some(
      (key) => newCourse[key] !== newCourse[key] && newCourse[key] !== undefined
    );
  };

  const handleCancel = () => {
    setNewCourse({
      title: "",
      courseType: "Online",
      description: "",
      duration: { days: "", hours: "", minutes: "" },
    });
  };

  {
    loading && (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

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
          Duration ()
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            label="Days"
            name="days"
            type="number"
            value={newCourse.duration.days || 0}
            onChange={handleChange}
            required
            helperText="Leave empty for 0"
          />
          <TextField
            label="Hours"
            name="hours"
            type="number"
            value={newCourse.duration.hours || 0}
            onChange={handleChange}
            required
            helperText="Leave empty for 0"
          />
          <TextField
            label="Minutes"
            name="minutes"
            type="number"
            value={newCourse.duration.minutes || 0}
            onChange={handleChange}
            required
            helperText="Leave empty for 0"
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/dashboard/courses")}
          >
            Back to courses
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              bgcolor: green[500],
              borderColor: "#757AD5",
            }}
            disabled={loading || !isFormChanged}

          >
            {loading ? "Adding..." : "Add Course"}
          </Button>

          <Button
            variant="contained"
            sx={{ color: "#FFFFFF", backgroundColor: "#FEDB30" }}
            startIcon={<CancelIcon />}
            onClick={handleCancel}
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
// import { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useCourses } from "../../store/CourseContext";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { useNavigate } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// // import CircularProgress from "@mui/material/CircularProgress";
// import { green } from "@mui/material/colors";

// const AddCourse = () => {
//   const { addNewCourse, setCourses } = useCourses();
//   const navigate = useNavigate();
//   const [newCourse, setNewCourse] = useState({
//     title: "",
//     courseType: "Online", //default value
//     description: "",
//     duration: { days: "", hours: "", minutes: "" },
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (["days", "hours", "minutes"].includes(name)) {
//       // Update nested duration field
//       setNewCourse((prev) => ({
//         ...prev,
//         duration: { ...prev.duration, [name]: value },
//       }));
//     } else {
//       setNewCourse((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
  
//     // Set default values for duration fields
//     const courseWithDefaultDuration = {
//       ...newCourse,
//       duration: {
//         days: newCourse.duration.days || 0,
//         hours: newCourse.duration.hours || 0,
//         minutes: newCourse.duration.minutes || 0,
//       },
//     };
  
//     try {
//       await addNewCourse(courseWithDefaultDuration);
//       setSuccess(true);
//       setCourses((prevCourses) => [...prevCourses, courseWithDefaultDuration]);
//       setNewCourse({
//         title: "",
//         description: "",
//         courseType: "Online",
//         duration: { days: "", hours: "", minutes: "" },
//       });
//     } catch (err) {
//       setError("Failed to add course. Please try again.", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setNewCourse({
//       title: "",
//       courseType: "Online",
//       description: "",
//       duration: { days: "", hours: "", minutes: "" },
//     });
//   };

//   return (
//     <Box
//       sx={{
//         // maxWidth: 600,
//         mx: "auto",
//         mt: 4,
//         p: 2,
//         boxShadow: 2,
//         borderRadius: 2,
//         backgroundColor: "#fff",
//         // Responsive padding and max-width adjustments
//         padding: { xs: 1, sm: 2 },
//         maxWidth: { xs: "90%", sm: 600 },
//       }}
//     >
//       <Typography variant="h5" mb={2} textAlign="center">
//         Add a New Course
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Title"
//           name="title"
//           value={newCourse.title}
//           onChange={handleChange}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="Description"
//           name="description"
//           value={newCourse.description}
//           onChange={handleChange}
//           margin="normal"
//           multiline
//           rows={4}
//           required
//         />
//         <TextField
//           fullWidth
//           select
//           label="Type"
//           name="courseType"
//           value={newCourse.courseType}
//           onChange={handleChange}
//           margin="normal"
//           required
//         >
//           <MenuItem value="Online">Online</MenuItem>
//           <MenuItem value="Offline">Offline</MenuItem>
//           <MenuItem value="Hybrid">Hybrid</MenuItem>
//         </TextField>
//         <Typography variant="subtitle1" mt={2} mb={1}>
//           Duration (Leave empty for 0)
//         </Typography>
//         <Box
//           display="flex"
//           gap={2}
//           flexDirection={{ xs: "column", sm: "row" }} // Stack fields on small screens
//         >
//           <TextField
//             label="Days"
//             name="days"
//             type="number"
//             value={newCourse.duration.days || 0}
//             onChange={handleChange}
//             required
//             helperText="Leave empty for 0"
//           />
//           <TextField
//             label="Hours"
//             name="hours"
//             type="number"
//             value={newCourse.duration.hours || 0}
//             onChange={handleChange}
//             required
//             helperText="Leave empty for 0"
//           />
//           <TextField
//             label="Minutes"
//             name="minutes"
//             type="number"
//             value={newCourse.duration.minutes || 0}
//             onChange={handleChange}
//             required
//             helperText="Leave empty for 0"
//           />
//         </Box>
//         <Box
//           mt={2}
//           display="flex"
//           flexDirection={{ xs: "column", sm: "row" }}
//           justifyContent="space-between"
//           gap={2}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate("/dashboard/courses")}
//             sx={{ width: { xs: "100%", sm: "auto" } }} // Full width on small screens
//           >
//             Back to courses
//           </Button>

//           <Button
//             type="submit"
//             variant="contained"
//             startIcon={<AddCircleOutlineIcon />}
//             disabled={loading}
//             sx={{
//               bgcolor: green[500],
//               borderColor: "#757AD5",
//               width: { xs: "100%", sm: "auto" }, // Full width on small screens
//             }}
//           >
//             {loading ? "Adding..." : "Add Course"}
//           </Button>

//           <Button
//             variant="contained"
//             sx={{ color: "#FFFFFF", backgroundColor: "#FEDB30", width: { xs: "100%", sm: "auto" } }}
//             startIcon={<CancelIcon />}
//             onClick={handleCancel}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </form>

//       {success && (
//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           open={success}
//           autoHideDuration={4000}
//           onClose={() => setSuccess(false)}
//         >
//           <Alert onClose={() => setSuccess(false)} severity="success">
//             Course added successfully!
//           </Alert>
//         </Snackbar>
//       )}

//       {error && (
//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           open={!!error}
//           autoHideDuration={4000}
//           onClose={() => setError(null)}
//         >
//           <Alert onClose={() => setError(null)} severity="error">
//             {error}
//           </Alert>
//         </Snackbar>
//       )}
//     </Box>
//   );
// };

// export default AddCourse;

// import { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useCourses } from "../../store/CourseContext";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { useNavigate } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import { green } from "@mui/material/colors";

// const AddCourse = () => {
//   const { addNewCourse, setCourses } = useCourses();
//   const navigate = useNavigate();
//   const [newCourse, setNewCourse] = useState({
//     title: "",
//     courseType: "Online", // default value
//     description: "",
//     duration: { days: "", hours: "", minutes: "" },
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const isFormValid =
//     newCourse.title.trim() !== "" &&
//     newCourse.description.trim() !== "" &&
//     Object.values(newCourse.duration).some((value) => value.trim() !== "");

  

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (["days", "hours", "minutes"].includes(name)) {
//       // Update nested duration field
//       setNewCourse((prev) => ({
//         ...prev,
//         duration: { ...prev.duration, [name]: value },
//       }));
//     } else {
//       setNewCourse((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const courseWithDefaultDuration = {
//       ...newCourse,
//       duration: {
//         days: newCourse.duration.days || 0,
//         hours: newCourse.duration.hours || 0,
//         minutes: newCourse.duration.minutes || 0,
//       },
//     };

//     try {
//       await addNewCourse(courseWithDefaultDuration);
//       setSuccess(true);
//       setCourses((prevCourses) => [...prevCourses, courseWithDefaultDuration]);
//       setNewCourse({
//         title: "",
//         description: "",
//         courseType: "Online",
//         duration: { days: "", hours: "", minutes: "" },
//       });
//     } catch (err) {
//       setError("Failed to add course. Please try again.", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setNewCourse({
//       title: "",
//       courseType: "Online",
//       description: "",
//       duration: { days: "", hours: "", minutes: "" },
//     });
//   };

//   return (
//     <Box
//       sx={{
//         mx: "auto",
//         mt: 4,
//         p: 2,
//         boxShadow: 2,
//         borderRadius: 2,
//         backgroundColor: "#fff",
//         padding: { xs: 1, sm: 2 },
//         maxWidth: { xs: "90%", sm: 600 },
//       }}
//     >
//       <Typography variant="h5" mb={2} textAlign="center">
//         Add a New Course
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Title"
//           name="title"
//           value={newCourse.title}
//           onChange={handleChange}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="Description"
//           name="description"
//           value={newCourse.description}
//           onChange={handleChange}
//           margin="normal"
//           multiline
//           rows={4}
//           required
//         />
//         <TextField
//           fullWidth
//           select
//           label="Type"
//           name="courseType"
//           value={newCourse.courseType}
//           onChange={handleChange}
//           margin="normal"
//           required
//         >
//           <MenuItem value="Online">Online</MenuItem>
//           <MenuItem value="Offline">Offline</MenuItem>
//           <MenuItem value="Hybrid">Hybrid</MenuItem>
//         </TextField>
//         <Typography variant="subtitle1" mt={2} mb={1}>
//           Duration (Leave empty for 0)
//         </Typography>
//         <Box
//           display="flex"
//           gap={2}
//           flexDirection={{ xs: "column", sm: "row" }}
//         >
//           <TextField
//             label="Days"
//             name="days"
//             type="number"
//             value={newCourse.duration.days || ""}
//             onChange={handleChange}
//             helperText="Leave empty for 0"
//           />
//           <TextField
//             label="Hours"
//             name="hours"
//             type="number"
//             value={newCourse.duration.hours || ""}
//             onChange={handleChange}
//             helperText="Leave empty for 0"
//           />
//           <TextField
//             label="Minutes"
//             name="minutes"
//             type="number"
//             value={newCourse.duration.minutes || ""}
//             onChange={handleChange}
//             helperText="Leave empty for 0"
//           />
//         </Box>
//         <Box
//           mt={2}
//           display="flex"
//           flexDirection={{ xs: "column", sm: "row" }}
//           justifyContent="space-between"
//           gap={2}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate("/dashboard/courses")}
//             sx={{ width: { xs: "100%", sm: "auto" } }}
//           >
//             Back to courses
//           </Button>

//           <Button
//             type="submit"
//             variant="contained"
//             startIcon={<AddCircleOutlineIcon />}
//             disabled={!isFormValid || loading}
//             sx={{
//               bgcolor: green[500],
//               borderColor: "#757AD5",
//               width: { xs: "100%", sm: "auto" },
//             }}
//           >
//             {loading ? "Adding..." : "Add Course"}
//           </Button>

//           <Button
//             variant="contained"
//             sx={{ color: "#FFFFFF", backgroundColor: "#FEDB30", width: { xs: "100%", sm: "auto" } }}
//             startIcon={<CancelIcon />}
//             onClick={handleCancel}
//             disabled={!isFormValid || loading}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </form>

//       {success && (
//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           open={success}
//           autoHideDuration={4000}
//           onClose={() => setSuccess(false)}
//         >
//           <Alert onClose={() => setSuccess(false)} severity="success">
//             Course added successfully!
//           </Alert>
//         </Snackbar>
//       )}

//       {error && (
//         <Snackbar
//           anchorOrigin={{ vertical: "center", horizontal: "center" }}
//           open={!!error}
//           autoHideDuration={4000}
//           onClose={() => setError(null)}
//         >
//           <Alert onClose={() => setError(null)} severity="error">
//             {error}
//           </Alert>
//         </Snackbar>
//       )}
//     </Box>
//   );
// };

// export default AddCourse;


// import { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useCourses } from "../../store/CourseContext";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { useNavigate } from "react-router-dom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import { green } from "@mui/material/colors";

// const AddCourse = () => {
//   const { addNewCourse, setCourses } = useCourses();
//   const navigate = useNavigate();
//   const [newCourse, setNewCourse] = useState({
//     title: "",
//     courseType: "Online",
//     description: "",
//     duration: { days: "", hours: "", minutes: "" },
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   // Check if at least one field has a value
//   const isFormEmpty = () => {
//     return (
//       !newCourse.title.trim() &&
//       !newCourse.description.trim() &&
//       !newCourse.duration.days.trim() &&
//       !newCourse.duration.hours.trim() &&
//       !newCourse.duration.minutes.trim()
//     );
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (["days", "hours", "minutes"].includes(name)) {
//       setNewCourse((prev) => ({
//         ...prev,
//         duration: { ...prev.duration, [name]: value },
//       }));
//     } else {
//       setNewCourse((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const courseWithDefaultDuration = {
//       ...newCourse,
//       duration: {
//         days: newCourse.duration.days || 0,
//         hours: newCourse.duration.hours || 0,
//         minutes: newCourse.duration.minutes || 0,
//       },
//     };

//     try {
//       await addNewCourse(courseWithDefaultDuration);
//       setSuccess(true);
//       setCourses((prevCourses) => [...prevCourses, courseWithDefaultDuration]);
//       setNewCourse({
//         title: "",
//         description: "",
//         courseType: "Online",
//         duration: { days: "", hours: "", minutes: "" },
//       });
//     } catch (err) {
//       setError("Failed to add course. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setNewCourse({
//       title: "",
//       courseType: "Online",
//       description: "",
//       duration: { days: "", hours: "", minutes: "" },
//     });
//   };

//   return (
//     <Box
//       sx={{
//         mx: "auto",
//         mt: 4,
//         p: 2,
//         boxShadow: 2,
//         borderRadius: 2,
//         backgroundColor: "#fff",
//         padding: { xs: 1, sm: 2 },
//         maxWidth: { xs: "90%", sm: 600 },
//       }}
//     >
//       <Typography variant="h5" mb={2} textAlign="center">
//         Add a New Course
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="Title"
//           name="title"
//           value={newCourse.title}
//           onChange={handleChange}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Description"
//           name="description"
//           value={newCourse.description}
//           onChange={handleChange}
//           margin="normal"
//           multiline
//           rows={4}
//         />
//         <TextField
//           fullWidth
//           select
//           label="Type"
//           name="courseType"
//           value={newCourse.courseType}
//           onChange={handleChange}
//           margin="normal"
//         >
//           <MenuItem value="Online">Online</MenuItem>
//           <MenuItem value="Offline">Offline</MenuItem>
//           <MenuItem value="Hybrid">Hybrid</MenuItem>
//         </TextField>
//         <Typography variant="subtitle1" mt={2} mb={1}>
//           Duration (Leave empty for 0)
//         </Typography>
//         <Box
//           display="flex"
//           gap={2}
//           flexDirection={{ xs: "column", sm: "row" }}
//         >
//           <TextField
//             label="Days"
//             name="days"
//             type="number"
//             value={newCourse.duration.days}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Hours"
//             name="hours"
//             type="number"
//             value={newCourse.duration.hours}
//             onChange={handleChange}
//           />
//           <TextField
//             label="Minutes"
//             name="minutes"
//             type="number"
//             value={newCourse.duration.minutes}
//             onChange={handleChange}
//           />
//         </Box>
//         <Box
//           mt={2}
//           display="flex"
//           flexDirection={{ xs: "column", sm: "row" }}
//           justifyContent="space-between"
//           gap={2}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate("/dashboard/courses")}
//             sx={{ width: { xs: "100%", sm: "auto" } }}
//           >
//             Back to courses
//           </Button>

//           <Button
//             type="submit"
//             variant="contained"
//             startIcon={<AddCircleOutlineIcon />}
//             disabled={loading || isFormEmpty()}
//             sx={{
//               bgcolor: green[500],
//               width: { xs: "100%", sm: "auto" },
//             }}
//           >
//             {loading ? "Adding..." : "Add Course"}
//           </Button>

//           <Button
//             variant="contained"
//             sx={{
//               color: "#FFFFFF",
//               backgroundColor: "#FEDB30",
//               width: { xs: "100%", sm: "auto" },
//             }}
//             startIcon={<CancelIcon />}
//             onClick={handleCancel}
//             disabled={isFormEmpty()}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </form>

//       {success && (
//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           open={success}
//           autoHideDuration={4000}
//           onClose={() => setSuccess(false)}
//         >
//           <Alert onClose={() => setSuccess(false)} severity="success">
//             Course added successfully!
//           </Alert>
//         </Snackbar>
//       )}

//       {error && (
//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           open={!!error}
//           autoHideDuration={4000}
//           onClose={() => setError(null)}
//         >
//           <Alert onClose={() => setError(null)} severity="error">
//             {error}
//           </Alert>
//         </Snackbar>
//       )}
//     </Box>
//   );
// };

// export default AddCourse;
