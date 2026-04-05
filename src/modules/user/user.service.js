import User from "../../models/User.js";
import mongoose from "mongoose";

export const getAllUsers = async () => {
  return await User.find().select("-password");
};

export const updateUserRole = async (id, userId, role) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }
  if (id === userId) {
    throw new Error("Cannot change your own role");
  }
  if (!["viewer", "analyst", "admin"].includes(role)) {
    throw new Error("Invalid role");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.role = role;
  await user.save();
  return user;
};

export const toggleUserStatus = async (userId, isActive) => {
  const user = await User.findById(userId);
  if(!isActive){
    throw new Error("set a valid status");
  }
  if (!user) {
    throw new Error("User not found");
  }
  user.isActive = isActive;
  await user.save();
  console.log(user.toObject());
  return user;
};
