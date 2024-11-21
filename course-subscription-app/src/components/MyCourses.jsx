import { useEffect, useState } from "react";
import axios from "axios";
import { Box} from "@mui/material";
import Subscription from "./Subscription";

const MyCourses = () => {
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  // const { updateSubscribedCourses } = useCart();

  useEffect(() => {
    const fetchSubscribedCourses = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const learnerId = localStorage.getItem("learnerId");

      try {
        const response = await axios.get(`${baseUrl}/subscriptions/${learnerId}`);
        setSubscribedCourses(response.data);
      } catch (error) {
        console.error("Error fetching subscribed courses:", error);
      }
    };

    fetchSubscribedCourses();
  }, []);


  return (
    <Box>
      {/* <Typography>My Subscribed Courses</Typography> */}
      <Subscription subscribedCourses={subscribedCourses} />
    </Box>
  );
};

export default MyCourses; 