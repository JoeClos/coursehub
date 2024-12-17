// import { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Box,
//   Grid,
//   Card,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
// } from "@mui/material"; // MUI components
// import { useCourses } from "../../store/CourseContext";
// import { useUsers } from "../../store/UserContext";

// const groupByMonthAndYear = (courses, users) => {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const grouped = {};

//   // Group courses by month and year
//   courses.forEach((course) => {
//     const date = new Date(course.createdAt);
//     const monthIndex = date.getMonth();
//     const year = date.getFullYear();
//     const key = `${year}-${monthIndex}`;

//     if (!grouped[key]) {
//       grouped[key] = {
//         name: `${months[monthIndex]} ${year}`,
//         users: 0,
//         courses: 0,
//       };
//     }
//     grouped[key].courses += 1;
//   });

//   // Group users by month and year
//   users.forEach((user) => {
//     const date = new Date(user.createdAt);
//     const monthIndex = date.getMonth();
//     const year = date.getFullYear();
//     const key = `${year}-${monthIndex}`;

//     if (!grouped[key]) {
//       grouped[key] = {
//         name: `${months[monthIndex]} ${year}`,
//         users: 0,
//         courses: 0,
//       };
//     }
//     grouped[key].users += 1;
//   });

//   return Object.values(grouped).sort(
//     (a, b) => new Date(a.name) - new Date(b.name)
//   );
// };

// const Analytics = () => {
//   const [analyticsData, setAnalyticsData] = useState([]);
//   const { courses, getCourses } = useCourses();
//   const { users, getUsers } = useUsers();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true); // Start loading

//       // Fetch courses and users in parallel with await
//       await Promise.all([getCourses(), getUsers()]);

//       // Process the data once both are fetched
//       const groupedData = groupByMonthAndYear(courses, users);
//       setAnalyticsData(groupedData);
//       setLoading(false); // End loading
//     };

//     fetchData();
//     // Empty dependency array ensures this effect runs once when the component mounts
//   }, []);

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Analytics Overview
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Line Chart Section */}
//         <Grid item xs={12} md={8}>
//           <Card sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Users and Courses Growth (Monthly)
//             </Typography>
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart data={analyticsData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="users" stroke="#8884d8" />
//                 <Line type="monotone" dataKey="courses" stroke="#82ca9d" />
//               </LineChart>
//             </ResponsiveContainer>
//           </Card>
//         </Grid>

//         {/* Data Table Section */}
//         <Grid item xs={12} md={4}>
//           <Card sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Detailed Data
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{fontWeight: "bold"}}>Month and Year</TableCell>
//                     <TableCell align="right" sx={{fontWeight: "bold"}}>Users Registered</TableCell>
//                     <TableCell align="right" sx={{fontWeight: "bold"}}>Courses Added</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {analyticsData.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{item.name}</TableCell>
//                       <TableCell align="right">{item.users || 0}</TableCell>
//                       <TableCell align="right">{item.courses || 0}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Analytics;

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  Grid,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material"; // MUI components
import { useCourses } from "../../store/CourseContext";
import { useUsers } from "../../store/UserContext";

const groupByMonthAndYear = (courses, users) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const grouped = {};

  // Group courses by month and year
  courses.forEach((course) => {
    const date = new Date(course.createdAt);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${monthIndex}`;

    if (!grouped[key]) {
      grouped[key] = {
        name: `${months[monthIndex]} ${year}`,
        users: 0,
        courses: 0,
      };
    }
    grouped[key].courses += 1;
  });

  // Group users by month and year
  users.forEach((user) => {
    const date = new Date(user.createdAt);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${monthIndex}`;

    if (!grouped[key]) {
      grouped[key] = {
        name: `${months[monthIndex]} ${year}`,
        users: 0,
        courses: 0,
      };
    }
    grouped[key].users += 1;
  });

  return Object.values(grouped).sort(
    (a, b) => new Date(a.name) - new Date(b.name)
  );
};

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const { courses, getCourses } = useCourses();
  const { users, getUsers } = useUsers();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      // Fetch courses and users in parallel with await
      await Promise.all([getCourses(), getUsers()]);

      // Process the data once both are fetched
      const groupedData = groupByMonthAndYear(courses, users);
      setAnalyticsData(groupedData);
      setLoading(false); // End loading
    };

    fetchData();
    // Empty dependency array ensures this effect runs once when the component mounts
  }, []);

  if (loading) {
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Analytics Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Line Chart Section */}
        <Grid item xs={12} sm={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Users and Courses Growth (Monthly)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
                <Line type="monotone" dataKey="courses" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Data Table Section */}
        <Grid item xs={12} sm={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Detailed Data
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Month and Year</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Users Registered
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Courses Added
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analyticsData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.users || 0}</TableCell>
                      <TableCell align="right">{item.courses || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;

