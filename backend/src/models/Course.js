const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courseType: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      days: {
        type: Number,
        required: true,
      },
      hours: {
        type: Number,
        required: true,
      },
      minutes: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", CourseSchema);
