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
  // number: {
  //   type: String,
  //   unique: true
  // },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"

  }],
  delivered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "products"
  }],

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

const User =  mongoose.model("User", userSchema);
export default User;