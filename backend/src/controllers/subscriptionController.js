const mongoose = require('mongoose');
const Subscription = require("../models/Subscription");

// Subscribe to a course
const subscribeCourse = async (req, res) => {
  const { learnerId, courseId } = req.body;

  try {
    if (!learnerId || !courseId) {
      return res
        .status(400)
        .json({ message: "Learner ID and Course ID are required" });
    }

    const learnerObjectId = new mongoose.Types.ObjectId(learnerId);
    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    if (!mongoose.Types.ObjectId.isValid(learnerId) || !mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: "Invalid learner or course ID" });
      }
      

    // Check if the subscription already exists
    const existingSubscription = await Subscription.findOne({
      learnerId: learnerObjectId,
      courseId: courseObjectId,
    });

    if (existingSubscription) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const newSubscription = await Subscription.create({
      learnerId: learnerObjectId,
      courseId: courseObjectId,
    });

    // Add the new subscription
    res.status(201).json({
      message: "Subscribed successfully",
      subscription: newSubscription,
    });
  } catch (error) {
    console.error("Error subscribing to course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch subscriptions for a specific learner
// app.get('/api/subscriptions/:learnerId', async (req, res) => {
//     try {
//       const subscriptions = await Subscription.find({ learnerId: req.params.learnerId });
//       res.json(subscriptions);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching subscriptions' });
//     }
//   });

// Unsubscribe from a course
const unsubscribeCourse = async (req, res) => {
    const { subscriptionId } = req.body; // Accept subscription _id from the frontend
  
    try {
      if (!subscriptionId) {
        return res.status(400).json({ message: "Subscription ID is required" });
      }
  
      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(subscriptionId)) {
        return res.status(400).json({ message: "Invalid subscription ID" });
      }
  
      // Attempt to delete the subscription by its ObjectId
      const subscription = await Subscription.findByIdAndDelete(subscriptionId);
  
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
  
      // Return success message
      res.status(200).json({ message: "Unsubscribed successfully" });
    } catch (error) {
      console.error("Error unsubscribing from course:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
module.exports = { subscribeCourse, unsubscribeCourse };
