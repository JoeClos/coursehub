const Course = require("../models/Course");

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// Get a course by ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the course ID from the URL parameters
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ message: "Failed to fetch course" });
  }
};

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { title, courseType, description, duration } = req.body;

    if (!title || !courseType || !description || !duration) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const { days, hours, minutes } = duration;
    if (days == null || hours == null || minutes == null) {
      return res.status(400).json({ message: "Duration fields are required" });
    }

    const newCourse = new Course({
      title,
      courseType,
      description,
      duration: { days, hours, minutes },
    });
    console.log("🚀 ~ createCourse ~ newCourse:", newCourse);

    const savedCourse = await newCourse.save();
    console.log("🚀 ~ createCourse ~ savedCourse:", savedCourse);

    res.status(201).json({
      message: "Course created successfully!",
      course: savedCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params; // Extract the course ID from the URL parameters

    // Check if the course exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Delete the course
    await Course.findByIdAndDelete(id);

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Failed to delete course" });
  }
};

// Update course 
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params; 
    const courseData = req.body;

    // Check if the course exists
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update the course
    const updatedCourse = await Course.findByIdAndUpdate(id, courseData, {new: true});

    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Failed to update course" });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse
};
