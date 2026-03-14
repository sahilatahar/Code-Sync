import jwt from "jsonwebtoken";
import User from "../Models/users";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req: any, res: any, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined");
      }
      const decoded = jwt.verify(token, jwtSecret) as { id: string };
      req.user = await User.findById(decoded.id).select("-password");
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});