import mongoose, { Schema, type Document } from "mongoose"

export interface IContact extends Document {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: Date
}

const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Check if the model is already defined to prevent overwriting during hot reloads
export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema)
