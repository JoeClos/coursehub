const express = require("express");
const router = express.Router();
const {
  subscribeCourse,
  unsubscribeCourse,
  getSubscriptionsForLearner,
  getAllSubscriptions,
} = require("../controllers/subscriptionController");
const {authenticate} = require( "../middleware/authMiddleware");

// Subscribe to a course
router.post("/subscribe", subscribeCourse);

// Unsubscribe from a course
router.delete("/unsubscribe/:subscriptionId", unsubscribeCourse);

// Fetch subscritpions for a specific user
router.get("/subscriptions/:learnerId", getSubscriptionsForLearner);

// Route to fetch all subscriptions (accessible only to the admin)
router.get("/subscriptions", getAllSubscriptions);

module.exports = router;
