import { useState, useEffect } from "react";
import { fetchCourses } from "../../utils/api";
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
} from "@mui/material";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetchCourses();
        setCourses(response);
        console.log("🚀 ~ getCourses ~ response:", response);
      } catch (error) {
        setError("Error fetching users", error);
      }
    };
    getCourses();
  }, []);

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom mt={8}>
        Total Courses: {courses.length}
      </Typography>{" "}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Ttile
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Duration
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.courseType}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>
                  {course.duration
                    ? `${
                        course.duration.days && course.duration.days
                          ? " and "
                          : ""
                      }${
                        course.duration.hours
                          ? `${course.duration.hours} hours`
                          : ""
                      }${
                        course.duration.hours && course.duration.minutes
                          ? " and "
                          : ""
                      }${
                        course.duration.minutes
                          ? `${course.duration.minutes} minutes`
                          : ""
                      }`
                    : "No duration available"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageCourses;
