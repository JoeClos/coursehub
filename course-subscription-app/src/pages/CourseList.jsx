import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  fetchCourses,
  fetchSubscribedCourses,
  subscribeToCourse,
  unsubscribeFromCourse,
} from "../utils/api";
import { useCart } from "../store/CartContext";
import CardList from "../components/courses/CardList";
import PropTypes from "prop-types";

const CourseList = ({ searchQuery }) => {
  const [courses, setCourses] = useState([]);
  const { subscribedCourses, updateSubscribedCourses, clearSubscribedCourses } =
    useCart();
  const learnerId = localStorage.getItem("learnerId");

  useEffect(() => {
    const getSubscriptions = async () => {
      if (!learnerId) {
        clearSubscribedCourses();
        return;
      }
      const subscriptions = await fetchSubscribedCourses(learnerId);
      updateSubscribedCourses(subscriptions);
    };

    getSubscriptions();
  }, [learnerId]);

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCourses();
      setCourses(data);
    };

    getCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightText = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSubscribe = async (course) => {
    const newSubscription = await subscribeToCourse(learnerId, course._id);
    updateSubscribedCourses((prev) => [
      ...prev,
      {
        ...newSubscription,
        courseId: {
          _id: course._id,
          title: course.title,
        },
      },
    ]);
  };

  const handleUnsubscribe = async (subscriptionId) => {
    await unsubscribeFromCourse(subscriptionId);
    updateSubscribedCourses((prev) =>
      prev.filter((sub) => sub._id !== subscriptionId)
    );
  };

  const getSubscriptionForCourse = (courseId) =>
    subscribedCourses.find((sub) => sub.courseId._id === courseId)?._id || null;

  return (
    <Box style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      <CardList
        courses={filteredCourses}
        highlightText={highlightText}
        getSubscriptionForCourse={getSubscriptionForCourse}
        handleSubscribe={handleSubscribe}
        handleUnsubscribe={handleUnsubscribe}
      />
    </Box>
  );
};

CourseList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default CourseList;
