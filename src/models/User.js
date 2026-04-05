import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, "username must be atleast 3 characters"],
    },
    email: {
      type: String,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email must be in valid format"],
      required: true
    },

    password: {
      type: String,
      required: true,
      minlength: [8, "password must be atleast 8 characters"],
      select: false
    },

    role: {
      type: String,
      enum: ["viewer", "analyst", "admin"],
      default: "viewer",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
