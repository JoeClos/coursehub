import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchCourses, addCourse, deleteCourse } from "../utils/api";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

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

  // Add a new course
  const addNewCourse = async (courseData) => {
    try {
      const response = await addCourse(courseData);
      // setCourses((prevCourses) => [...prevCourses, response.data]);
      setCourses((prevCourses) => {
        // Ensure prevCourses is an array
        const updatedCourses = Array.isArray(prevCourses) ? prevCourses : [];
        return [...updatedCourses, response.data]; // Add new course to array
      });
      getCourses();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Delete course by Id
  const deleteCourseById = async (courseId) => {
    try {
      const response = await deleteCourse(courseId);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
      return response;
    } catch (error) {
      console.error("Error deleting course:", error);
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
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook to use the CourseContext
// eslint-disable-next-line react-refresh/only-export-components
export const useCourses = () => {
  return useContext(CourseContext);
};

CourseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
