import rateLimit from "express-rate-limit";

// General limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
});

// Strict limiter for auth
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many login attempts, try again later"
  }
});