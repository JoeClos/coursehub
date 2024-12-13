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
import Pagination from "../../components/Pagination";
import AlertNotification from "../../components/AlertNotification";

const ManageCourses = () => {
  const { courses, getCourses, deleteCourseById, setCourses } = useCourses();
  const [openRow, setOpenRow] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null); // Holds the ID of the course to delete

  const totalPages = Math.ceil(courses.length / rowsPerPage);
  const showPagination = courses.length > 0 && totalPages > 1;

  const paginatedCourses = courses.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Delete course by id
  const handleDeleteCourse = async () => {
    if (!selectedCourseId) return;

    try {
      await deleteCourseById(selectedCourseId);

      const updatedCourses = courses.filter(
        (course) => course._id !== selectedCourseId
      );
      setCourses(updatedCourses);

      setMessage({ type: "success", text: "Course deleted successfully!" });

      const totalPagesAfterDeletion = Math.ceil(
        updatedCourses.length / rowsPerPage
      );
      if (page > totalPagesAfterDeletion) {
        setPage(totalPagesAfterDeletion);
      } else if (totalPagesAfterDeletion === 0 && page !== 1) {
        setPage(1);
      }
    } catch (error) {
      setMessage(
        {
          type: "error",
          text: "Failed to delete course. Please try again.",
        },
        error
      );
    } finally {
      setOpenSnackbar(true);
      setConfirmDialogOpen(false);
    }
  };

  const handleOpenConfirmDialog = (courseId) => {
    setSelectedCourseId(courseId); // Set the course ID to delete
    setConfirmDialogOpen(true); // Open the confirmation dialog
  };

  const handleCancel = () => {
    setConfirmDialogOpen(false);
    setSelectedCourseId(null); // Clear the selected course ID
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
            {paginatedCourses.map((course, index) => (
              <Fragment key={course._id}>
                <TableRow
                  sx={{
                    borderBottom: "hidden",
                    backgroundColor:
                      openRow === course._id ? "#f5f5f5" : "transparent",
                  }}
                >
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
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
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleOpenConfirmDialog(course._id)}
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

      {/* Pagination */}
      {showPagination && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            sx={{ backgroundColor: "#757AD5" }}
          />
        </Box>
      )}

      {/* Confirmation Dialog */}
      <AlertNotification
        open={confirmDialogOpen}
        onClose={handleCancel}
        onConfirm={handleDeleteCourse}
        title="Confirm Deletion"
        content="Are you sure you want to delete this course?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        cancelStyle={{ backgroundColor: "#FEDB30", color: "#FFFFFF" }}
        icon={<DeleteIcon />}
      />
    </Box>
  );
};

export default ManageCourses;
