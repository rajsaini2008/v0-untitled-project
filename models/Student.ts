import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, "Please provide a student ID"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  fatherName: {
    type: String,
    required: [true, "Please provide father's name"],
  },
  motherName: {
    type: String,
    required: [true, "Please provide mother's name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  address: {
    type: String,
    required: [true, "Please provide an address"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please provide a date of birth"],
  },
  gender: {
    type: String,
    required: [true, "Please provide a gender"],
    enum: ["Male", "Female", "Other"],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Please provide a course"],
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  photoUrl: {
    type: String,
  },
  idCardUrl: {
    type: String,
  },
  signatureUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Completed", "Dropped"],
    default: "Active",
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

export default mongoose.models.Student || mongoose.model("Student", StudentSchema)
