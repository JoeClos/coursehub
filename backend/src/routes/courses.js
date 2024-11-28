const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
} = require("../controllers/courseController");

// Route to get all courses
router.get("/courses", getAllCourses);

// Get a course by ID
router.get("/courses/:id", getCourseById);

// Route to create a new course
router.post("/courses", createCourse);

module.exports = router;
