import { generateToken } from "../config/GenerateToken";
import { hashPassword } from "../config/HashedPassword";
import User from "../Models/users";
import bcrypt from "bcryptjs";

export const RegisterUser = async (req: any, res: any) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken" });
        }


        const hashedPassword = await hashPassword(password);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

export const LoginUser = async (req: any, res: any) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ message: "Please provide username and password" });
        }

        const user = await User.findOne({ username }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials",  });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const email = user.email;

        const token = generateToken(user._id.toString());

        res.status(201).json({ message: "Login successful", token, email });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}