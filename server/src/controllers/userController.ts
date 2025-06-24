import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
             
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required." });
    }

    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
      });
    } else {
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials." });
      }
    }

    // Don't return password
    const { password: _, ...userData } = user.toObject();
    return res.status(200).json({ user: userData });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err });
  }
};
