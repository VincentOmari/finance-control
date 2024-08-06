const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

// Define the schema (blueprint)
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"],
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    // Check if password is being modified
    if (!this.isModified('password')) {
        return next(); // Skip hashing if password is not modified
    }

    try {
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); // Proceed with saving the document
    } catch (error) {
        next(error); // Pass error to the next middleware if hashing fails
    }
});

// Compile schema into model
const User = mongoose.model('User', userSchema);

module.exports = User;
