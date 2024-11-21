const express = require("express");
const router = express.Router();
const {
  subscribeCourse,
  unsubscribeCourse,
  getSubscriptions,
} = require("../controllers/subscriptionController");

// Subscribe to a course
router.post("/subscribe", subscribeCourse);

// Unsubscribe from a course
router.delete("/unsubscribe", unsubscribeCourse);

// Fetch subscritpions for a specific user
router.get("/subscriptions/:learnerId", getSubscriptions);

module.exports = router;
