import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const decode = await jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(decode.id).select("-password");
    console.log(user);
    if(!user || !user.isActive){
        return res.status(401).json({ message: "Invalid user" });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export default authMiddleware;