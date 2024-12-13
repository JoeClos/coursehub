import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Collapse,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { green } from "@mui/material/colors";
import { useCourses } from "../../store/CourseContext";

const ManageCourses = () => {
  const { courses, getCourses, deleteCourseById } = useCourses();
  // const [error, setError] = useState(null);
  const [openRow, setOpenRow] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Delete course by id
  const handleDeleteCourse = async (courseId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;
    try {
      await deleteCourseById(courseId);
      setMessage({ type: "success", text: "Course deleted successfully!" });
    } catch (error) {
      setMessage(
        { type: "error", text: "Failed to delete course. Please try again." },
        error
      );
    } finally {
      setOpenSnackbar(true);
    }
  };

  const formatDuration = (duration) => {
    if (!duration) return "No duration available";
    const { days, hours, minutes } = duration;
    return `${days ? `${days} days` : ""}${
      days && (hours || minutes) ? ", " : ""
    }${hours ? `${hours} hours` : ""}${hours && minutes ? ", " : ""}${
      minutes ? `${minutes} minutes` : ""
    }`;
  };

  // if (error) {
  //   return (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       minHeight="100vh"
  //     >
  //       <Typography variant="h6" color="error">
  //         {error}
  //       </Typography>
  //     </Box>
  //   );
  // }

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <Typography variant="h4" gutterBottom mt={8}>
          Total Courses: {courses.length}
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: green[500],
            borderColor: "#757AD5",
            marginLeft: 2,
          }}
          startIcon={<AddCircleOutlineIcon />}
          // onClick={() => setIsAdding(true)}
          component={Link}
          to="add"
        >
          Add Course
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
          <TableHead sx={{ backgroundColor: "#201F40" }}>
            <TableRow hover>
              <TableCell sx={{ fontSize: "16px", color: "#FFFFFF" }}>
                #
              </TableCell>
              <TableCell sx={{ fontSize: "16px", color: "#FFFFFF" }}>
                Title
              </TableCell>
              <TableCell sx={{ fontSize: "16px", color: "#FFFFFF" }}>
                Type
              </TableCell>
              <TableCell sx={{ fontSize: "16px", color: "#FFFFFF" }}>
                Description
              </TableCell>
              <TableCell sx={{ fontSize: "16px", color: "#FFFFFF" }}>
                Duration (DD:HH:MM)
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <Fragment key={course._id}>
                <TableRow
                  sx={{
                    borderBottom: "hidden",
                    backgroundColor:
                      openRow === course._id ? "#f5f5f5" : "transparent",
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.courseType}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() =>
                        setOpenRow(openRow === course._id ? null : course._id)
                      }
                    >
                      {openRow === course._id ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>

                  <TableCell>{formatDuration(course.duration)}</TableCell>
                  <TableCell
                    sx={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "#AB221D",
                        borderColor: "#AB221D",
                      }}
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteCourse(course._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "#757AD5",
                        borderColor: "#757AD5",
                        marginLeft: 2,
                      }}
                      startIcon={<UpdateIcon />}
                      component={Link}
                      to={`/dashboard/courses/update/${course._id}`}
                      // onClick={() => handleUpdate(course._id)}
                      // onClick={() => setSelectedCourse(course)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ borderTop: "hidden", backgroundColor: "#f5f5f5" }}
                >
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openRow === course._id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Typography
                          sx={{ fontWeight: "bold", marginBottom: 1 }}
                        >
                          Description
                        </Typography>
                        <Typography>{course.description}</Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default ManageCourses;
