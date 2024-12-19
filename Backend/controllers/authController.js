const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body; // Extract role from the request body

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Validate the role and ensure it's either "user" or "admin"
    const userRole = role === "Admin" ? "Admin" : "User";

    // Create the user
    const user = await User.create({ name, email, password, role: userRole });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// Send OTP for Password Reset
const sendPasswordResetOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Example: "123456"

    // Generate a JWT that contains the OTP and email
    const otpToken = jwt.sign(
      { email: user.email, otp }, // Payload includes OTP
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "10m" } // OTP valid for 10 minutes
    );

    // Send the 6-digit OTP to the user via email
    const message = `Your password reset OTP is: ${otp}. It is valid for 10 minutes.`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset OTP",
      message,
    });

    // Send the OTP Token to the client (typically stored in the frontend for later verification)
    res.status(200).json({ message: "OTP sent to your email.", otpToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Reset Password Using OTP
const resetPasswordWithOTP = async (req, res) => {
  const { otp, password, otpToken } = req.body;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(otpToken, process.env.JWT_SECRET);

    // Check if the provided OTP matches the one in the JWT
    if (decoded.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // Find the user by email
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the password
    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(400).json({ message: "OTP has expired." });
    } else {
      res.status(400).json({ message: "Invalid OTP or Token." });
    } 
  }
};



module.exports = { registerUser, loginUser, sendPasswordResetOTP ,resetPasswordWithOTP };
