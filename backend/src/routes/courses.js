const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers/courseController");

// Route to get all courses
router.get("/courses", getAllCourses);

// Get a course by ID
router.get("/courses/:id", getCourseById);

// Route to create a new course
router.post("/courses", createCourse);

// Delete a course by Id
router.delete("/courses/:id", deleteCourse);

// Update course
router.put("/courses/:id", updateCourse);

module.exports = router;
