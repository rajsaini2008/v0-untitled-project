import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a course name"],
    unique: true,
  },
  code: {
    type: String,
    required: [true, "Please provide a course code"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  duration: {
    type: String,
    required: [true, "Please provide a duration"],
  },
  fee: {
    type: Number,
    required: [true, "Please provide a fee"],
  },
  imageUrl: {
    type: String,
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
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

export default mongoose.models.Course || mongoose.model("Course", CourseSchema)
