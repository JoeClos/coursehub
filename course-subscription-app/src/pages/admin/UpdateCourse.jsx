// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Snackbar,
//   Alert,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import { useCourses } from "../../store/CourseContext";
// import { green } from "@mui/material/colors";

// const UpdateCourse = () => {
//   const { updateCourseById, getCourseById, course } = useCourses();
//   //   console.log("🚀 ~ UpdateCourse ~ course:", course);
//   const { courseId } = useParams();
//   const [coursee, setCoursee] = useState({
//     title: "",
//     courseType: "",
//     description: "",
//     duration: { days: "", hours: "", minutes: "" },
//   });
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const navigate = useNavigate();

//   // Fetch course details by id to pre-fill the form
//   useEffect(() => {
//     if (courseId) {
//       getCourseById(courseId);
//     }
//   }, [courseId, getCourseById]);
//   if (!course) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         {" "}
//         <CircularProgress />{" "}
//       </Box>
//     );
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCoursee((prevCourse) => ({
//       ...prevCourse,
//       [name]: value,
//     }));
//   };

//   const handleDurationChange = (e) => {
//     const { name, value } = e.target;
//     setCoursee((prevCourse) => ({
//       ...prevCourse,
//       duration: { ...prevCourse.duration, [name]: value },
//     }));
//   };

//   const handleUpdate = async () => {
//     try {
//       await updateCourseById(course._id, course);
//       setMessage({ type: "success", text: "Course updated successfully!" });
//       setOpenSnackbar(true);
//       navigate("/manage-courses");
//     } catch (err) {
//       setMessage(
//         { type: "error", text: "Failed to update course. Please try again." },
//         err
//       );
//       setOpenSnackbar(true);
//     }
//   };

//   return (
//     <Box sx={{ margin: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Update Course
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             label="Course Title"
//             name="title"
//             value={course.title}
//             onChange={handleInputChange}
//             variant="outlined"
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             label="Course Type"
//             name="courseType"
//             value={course.courseType}
//             onChange={handleInputChange}
//             variant="outlined"
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Description"
//             name="description"
//             value={course.description}
//             onChange={handleInputChange}
//             variant="outlined"
//             multiline
//             rows={4}
//           />
//         </Grid>

//         <Grid item xs={12} sm={4}>
//           <TextField
//             fullWidth
//             label="Duration (Days)"
//             name="days"
//             value={course.duration.days}
//             onChange={handleDurationChange}
//             variant="outlined"
//             type="number"
//           />
//         </Grid>

//         <Grid item xs={12} sm={4}>
//           <TextField
//             fullWidth
//             label="Duration (Hours)"
//             name="hours"
//             value={course.duration.hours}
//             onChange={handleDurationChange}
//             variant="outlined"
//             type="number"
//           />
//         </Grid>

//         <Grid item xs={12} sm={4}>
//           <TextField
//             fullWidth
//             label="Duration (Minutes)"
//             name="minutes"
//             value={course.duration.minutes}
//             onChange={handleDurationChange}
//             variant="outlined"
//             type="number"
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Button
//             variant="contained"
//             sx={{
//               bgcolor: green[500],
//               borderColor: "#757AD5",
//               marginTop: 2,
//             }}
//             onClick={handleUpdate}
//           >
//             Update Course
//           </Button>
//         </Grid>
//       </Grid>

//       {message.type && (
//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           open={openSnackbar}
//           autoHideDuration={4000}
//           onClose={() => setOpenSnackbar(false)}
//         >
//           <Alert
//             onClose={() => setOpenSnackbar(false)}
//             severity={message.type}
//             sx={{ width: "100%" }}
//           >
//             {message.text}
//           </Alert>
//         </Snackbar>
//       )}
//     </Box>
//   );
// };

// export default UpdateCourse;
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
} from "@mui/material";
import { useCourses } from "../../store/CourseContext";
import { green } from "@mui/material/colors";

const UpdateCourse = () => {
  const { updateCourseById, getCourseById, course } = useCourses();
  const { courseId } = useParams();
  const [newInfo, setNewInfo] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  // Fetch course details by id to pre-fill the form
  useEffect(() => {
    if (courseId) {
      getCourseById(courseId);
    }
  }, []);

  // Set course data in the form once fetched
  useEffect(() => {
    if (course) {
      setNewInfo(course);
    }
  }, [course]);

  if (!newInfo) {
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
      setMessage({ type: "success", text: "Course updated successfully!" });
      setOpenSnackbar(true);
      setTimeout(() => navigate("/dashboard/courses"), 2000);
    } catch (err) {
      setMessage({
        type: "error",
        text: "Failed to update course. Please try again.",
        err,
      });
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h4" gutterBottom>
        Update Course
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Course Title"
            name="title"
            value={newInfo.title}
            // onChange={handleInputChange}
            onChange={(e) => {
              setNewInfo((prevState) => ({
                ...prevState,
                title: e.target.value,
              }));
            }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Course Type"
            name="courseType"
            value={newInfo.courseType}
            onChange={handleInputChange}
            variant="outlined"
          />
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
            sx={{
              bgcolor: green[500],
              borderColor: "#757AD5",
              marginTop: 2,
            }}
            onClick={handleUpdate}
          >
            Update Course
          </Button>
        </Grid>
      </Grid>

      {message.type && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={message.type}
            sx={{ width: "100%" }}
          >
            {message.text}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default UpdateCourse;
