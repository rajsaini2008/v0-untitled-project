import mongoose from "mongoose"

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a subject name"],
  },
  code: {
    type: String,
    required: [true, "Please provide a subject code"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Subject || mongoose.model("Subject", SubjectSchema)
