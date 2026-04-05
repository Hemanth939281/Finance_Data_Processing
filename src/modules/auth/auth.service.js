import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";

export const registerUser = async (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new Error("Invalid email format");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  if (name.length < 3) {
    throw new Error("name must be atleast 3 characters");
  }

   const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("user already exists !!!");
  }


  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  return {
    user,
    token: generateToken(user),
  };
};

export const loginUser = async (data) => {
  const { email, password } = data;

  if(!email || !password){
    throw new Error("email and password are required");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  if (!user.isActive) {
    throw new Error("user is inactive");
  }

  user.lastLogin = new Date();
  await user.save();

  const userObj = user.toObject();
  delete userObj.password; 

  return {
    user: userObj,
    token: generateToken(user),
  };
};
