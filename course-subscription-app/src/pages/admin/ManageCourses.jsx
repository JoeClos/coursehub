// import { useState, useEffect } from "react";
// import { fetchCourses } from "../../utils/api";
// import {
//   Typography,
//   Box,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   IconButton,
//   Collapse,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// const ManageCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [error, setError] = useState(null);
//   const [openRow, setOpenRow] = useState(null);

//   useEffect(() => {
//     const getCourses = async () => {
//       try {
//         const response = await fetchCourses();
//         setCourses(response);
//         console.log("🚀 ~ getCourses ~ response:", response);
//       } catch (error) {
//         setError("Error fetching users", error);
//       }
//     };
//     getCourses();
//   }, []);

//   if (error) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom mt={8}>
//         Total Courses: {courses.length}
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
//           <TableHead sx={{ backgroundColor: "#201F40" }}>
//             <TableRow hover >
//               <TableCell sx={{ fontSize: "16px", color: "#FFFFFF" }}>
//                 #
//               </TableCell>
//               <TableCell sx={{ fontSize: "16px", color: "#FFFFFF" }}>
//                 Title
//               </TableCell>
//               <TableCell sx={{ fontSize: "16px", color: "#FFFFFF" }}>
//                 Type
//               </TableCell>
//               <TableCell sx={{ fontSize: "16px", color: "#FFFFFF" }}>
//                 Description
//               </TableCell>
//               <TableCell sx={{ fontSize: "16px", color: "#FFFFFF" }}>
//                 Duration (DD:HH:MM)
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {courses.map((course, index) => (
//               <>
//                 <TableRow key={course._id}  sx={{bordeBottom: "hidden"}}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{course.title}</TableCell>
//                   <TableCell>{course.courseType}</TableCell>
//                   <TableCell>
//                     <IconButton
//                       aria-label="expand row"
//                       size="small"
//                       onClick={() =>
//                         setOpenRow(openRow === course._id ? null : course._id)
//                       }
//                     >
//                       {openRow === course._id ? (
//                         <KeyboardArrowUpIcon />
//                       ) : (
//                         <KeyboardArrowDownIcon />
//                       )}
//                     </IconButton>
//                   </TableCell>

//                   <TableCell>
//                     {course.duration
//                       ? `${
//                           course.duration.days
//                             ? `${course.duration.days} days`
//                             : ""
//                         }${
//                           course.duration.days &&
//                           (course.duration.hours || course.duration.minutes)
//                             ? " and "
//                             : ""
//                         }${
//                           course.duration.hours
//                             ? `${course.duration.hours} hours`
//                             : ""
//                         }${
//                           course.duration.hours && course.duration.minutes
//                             ? " and "
//                             : ""
//                         }${
//                           course.duration.minutes
//                             ? `${course.duration.minutes} minutes`
//                             : ""
//                         }`
//                       : "No duration available"}
//                   </TableCell>
//                 </TableRow>
//                 <TableRow sx={{borderTop: "hidden"}}>
//                   <TableCell
//                     style={{ paddingBottom: 0, paddingTop: 0 }}
//                     colSpan={6}
//                   >
//                     <Collapse
//                       in={openRow === course._id}
//                       timeout="auto"
//                       unmountOnExit
//                     >
//                       <Box sx={{ margin: 1 }}>
//                         <Typography sx={{ fontWeight: "bold"}}>Description</Typography>
//                         <Typography>{course.description}</Typography>
//                       </Box>
//                     </Collapse>
//                   </TableCell>
//                 </TableRow>
//               </>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default ManageCourses;

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
  IconButton,
  Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [openRow, setOpenRow] = useState(null);

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
      </Typography>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <>
                <TableRow
                  key={course._id}
                  sx={{
                    borderBottom: "hidden",
                    backgroundColor:
                      openRow === course._id ? "#f5f5f5" : "transparent", // Background color for opened row
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

                  <TableCell>
                    {course.duration
                      ? `${
                          course.duration.days
                            ? `${course.duration.days} days`
                            : ""
                        }${
                          course.duration.days &&
                          (course.duration.hours || course.duration.minutes)
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
                <TableRow sx={{ borderTop: "hidden", backgroundColor: "#f5f5f5" }}>
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
                        <Typography sx={{ fontWeight: "bold", marginBottom: 1 }}>Description</Typography>
                        <Typography>{course.description}</Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageCourses;
