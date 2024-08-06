const User = require("../../model/user");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// Register User
const registerUser = expressAsyncHandler(async (req, res) => {
    const { email, firstname, lastname, password } = req.body;

    // Check for missing fields
    if (!email || !firstname || !lastname || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = await User.create({
            email,
            firstname,
            lastname,
            password: hashedPassword
        });

        // Send a success response
        res.status(201).json({
            id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
        });
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// Fetch all users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

module.exports = { registerUser, fetchUsersCtrl };
