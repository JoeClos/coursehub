const mongoose = require("mongoose");
const Subscription = require("../models/Subscription");

// Subscribe to a course
const subscribeCourse = async (req, res) => {
  const { learnerId, courseId } = req.body;

  // Validate learnerId and courseId
  if (!mongoose.Types.ObjectId.isValid(learnerId)) {
    return res.status(400).json({ error: "Invalid learner ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  try {
    const newSubscription = new Subscription({
      learnerId: new mongoose.Types.ObjectId(learnerId),
      courseId: new mongoose.Types.ObjectId(courseId),
      subscriptionDate: new Date(),
    });

    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    console.error("Error subscribing to course:", error);
    res.status(500).json({ message: "Error subscribing to course" });
  }
};

const getSubscriptions = async (req, res) => {
  const { learnerId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(learnerId)) {
    return res.status(400).json({ error: "Invalid learner ID" });
  }
  try {
    const subscriptions = await Subscription.find({
      learnerId: new mongoose.Types.ObjectId(learnerId),
    }).populate({
      path: "courseId",
      select: "title", // Include only the course title
    });
    // console.log("Subscriptions with populated courseId:", subscriptions);
    // If no subscriptions found, return an empty array
    if (!subscriptions.length) {
      return res.status(200).json([]); // Return an empty array with 200 status
    }
    // Return the subscriptions
    res.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ message: "Error fetching subscriptions" });
  }
};


// Unsubscribe from a course
const unsubscribeCourse = async (req, res) => {
  const { subscriptionId } = req.params; // Accept subscription _id from the request parameters

  try {
    console.log(
      `Received request to unsubscribe subscription ID: ${subscriptionId}`
    );

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

module.exports = { subscribeCourse, unsubscribeCourse, getSubscriptions };
