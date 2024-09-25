import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const MyCourses = () => {
  const [subscribedCourses, setSubscribedCourses] = useState([]);

  useEffect(() => {
    const fetchSubscribedCourses = async () => {
      try {
        const learnerId = "8c17c7f0eb32010045e1a5115206fe17"; 
        const url = import.meta.env.VITE_SN_API_URL_BASE;
        
        // Fetch the subscriptions for the learner
        const response = await axios.get(
          `${url}/x_quo_coursehub_course_subscription?sysparm_query=learner=${learnerId}`,
          {
            auth: {
              username: import.meta.env.VITE_SN_USERNAME,
              password: import.meta.env.VITE_SN_PASSWORD,
            },
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log("Fetched subscribed courses:", response.data.result);
        
        // If there are subscribed courses, fetch their details
        if (response.data.result.length > 0) {
          const subscribedCourseIds = response.data.result.map(sub => sub.course.value);
          const coursesResponse = await axios.get(
            `${url}/x_quo_coursehub_course?sysparm_query=sys_idIN${subscribedCourseIds.join(",")}`,
            {
              auth: {
                username: import.meta.env.VITE_SN_USERNAME,
                password: import.meta.env.VITE_SN_PASSWORD,
              },
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          // Update the state with the fetched course details
          setSubscribedCourses(coursesResponse.data.result);
        }
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };

    fetchSubscribedCourses();
  }, []); // No dependencies here to prevent infinite loop

  return (
    <Box style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        My Subscribed Courses
      </Typography>
      <Grid container spacing={3}>
        {subscribedCourses.length === 0 ? (
          <Typography>No subscribed courses available.</Typography>
        ) : (
          subscribedCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={course.sys_id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{course.title}</Typography>
                  <Typography variant="body2">{course.description}</Typography>
                  {/* Add other course details as needed */}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default MyCourses;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

// const MyCourses = () => {
//   const [subscribedCourses, setSubscribedCourses] = useState([]);

//   useEffect(() => {
//     const fetchSubscribedCourses = async () => {
//       try {
//         // const learnerId = "8c17c7f0eb32010045e1a5115206fe17"; 
//         const learnerId = "8c17c7f0eb32010045e1a5115206fe17"; 
//         const url = import.meta.env.VITE_SN_API_URL_BASE;

//         // Fetch the subscriptions for the learner
//         const response = await axios.get(
//           `${url}/x_quo_coursehub_course_subscription?sysparm_query=learner=${learnerId}`,
//           {
//             auth: {
//               username: import.meta.env.VITE_SN_USERNAME,
//               password: import.meta.env.VITE_SN_PASSWORD,
//             },
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//             },
//           }
//         );

//         console.log("Fetched subscribed course subscriptions:", response.data.result); // Log subscriptions

//         if (response.data.result.length > 0) {
//           const subscribedCourseIds = response.data.result.map(sub => sub.course.value);
//           console.log("Subscribed Course IDs:", subscribedCourseIds); // Log course IDs

//           const coursesResponse = await axios.get(
//             `${url}/x_quo_coursehub_course?sysparm_query=sys_idIN${subscribedCourseIds.join(",")}`,
//             {
//               auth: {
//                 username: import.meta.env.VITE_SN_USERNAME,
//                 password: import.meta.env.VITE_SN_PASSWORD,
//               },
//               headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//               },
//             }
//           );

//           console.log("Fetched course details:", coursesResponse.data.result); // Log course details
//           setSubscribedCourses(coursesResponse.data.result);
//         }
//       } catch (error) {
//         console.error("Error fetching subscribed courses:", error);
//       }
//     };

//     fetchSubscribedCourses();
//   }, []); 
  

//   return (
//     <Box style={{ padding: "20px" }}>
//       <Typography variant="h4" gutterBottom>
//         My Subscribed Courses
//       </Typography>
//       <Grid container spacing={3}>
//         {subscribedCourses.length === 0 ? (
//           <Typography>No subscribed courses available.</Typography>
//         ) : (
//           subscribedCourses.map((course) => (
//             <Grid item xs={12} sm={6} md={4} xl={3} key={course.sys_id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h5">{course.title}</Typography>
//                   <Typography variant="body2">{course.description}</Typography>
//                   {/* Add other course details as needed */}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default MyCourses;

