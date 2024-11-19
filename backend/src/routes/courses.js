const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  createCourse,
} = require("../controllers/courseController");

// Route to get all courses
router.get("/courses", getAllCourses);

// Route to create a new course
router.post("/courses", createCourse);

module.exports = router;
