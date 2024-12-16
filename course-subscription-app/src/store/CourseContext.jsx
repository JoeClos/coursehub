import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  fetchCourses,
  addCourse,
  deleteCourse,
  updateCourse,
  fetchCourse,
} from "../utils/api";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);

  // Fetch all courses when the provider is mounted
  useEffect(() => {
    getCourses();
  }, []);

  

  const getCourses = async () => {
    try {
      const response = await fetchCourses();
      setCourses(response);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Function to fetch course by ID and set it
  const getCourseById = async (courseId) => {
    try {
      const courseData = await fetchCourse(courseId);
      console.log("🚀 ~ getCourseById ~ courseData:", courseData)

      setCourse(courseData); // Store the course data for display or update

    } catch (err) {
      console.log("Failed to fetch course data.", err);
      setCourse(null);
    }
  };

  // Add a new course and update the state
  const addNewCourse = async (courseData) => {
    try {
      const response = await addCourse(courseData);
      // Directly update the state without refetching all courses
      setCourses((prevCourses) => [...prevCourses, response.data]);
      getCourses();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Delete course by ID and update the state
  const deleteCourseById = async (courseId) => {
    try {
      await deleteCourse(courseId);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Update a course by ID and update the state
  const updateCourseById = async (courseId, updatedData) => {
    try {
      const response = await updateCourse(courseId, updatedData);
      // Update the course in the list
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId ? { ...course, ...updatedData } : course
        )
      );
      return response;
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        addNewCourse,
        getCourses,
        setCourses,
        deleteCourseById,
        updateCourseById,
        getCourseById,
        course, // Expose the single course (optional)
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook to use the CourseContext
export const useCourses = () => {
  return useContext(CourseContext);
};

CourseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
