const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    task_detail: {
      type: String,
      required: true,
    },
    end_date: {
      type: Date,
      required: false,
    },
    task_status: {
      type: String,
      enum: ["Not Started", "In-Progress", "Completed", "Suspended"],
      default: "Not Started",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Task", taskSchema);
