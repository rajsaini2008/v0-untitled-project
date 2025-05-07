import mongoose from "mongoose"

const BackgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  type: {
    type: String,
    enum: ["certificate", "marksheet"],
    required: [true, "Please provide a type"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
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

export default mongoose.models.Background || mongoose.model("Background", BackgroundSchema)
