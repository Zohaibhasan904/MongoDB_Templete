const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

/**
 * @desc    Register new user
 * @route   POST /api/users/register
 * @access  Public
 */
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Public (for now)
 */
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        });
    }
};
