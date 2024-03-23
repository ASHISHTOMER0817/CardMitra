import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
   required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user",
  },

  isApprove: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

export const User = mongoose.models.users || mongoose.model("User", userSchema);
