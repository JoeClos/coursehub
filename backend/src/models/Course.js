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
        required: false,
      },
      hours: {
        type: Number,
        required: false,
      },
      minutes: {
        type: Number,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", CourseSchema);
