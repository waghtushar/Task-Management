
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "User"], // Role validation
    default: "User",
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

// Compare password for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Generate OTP Token
UserSchema.methods.generateOTP = function () {
  try {
    const otpToken = jwt.sign(
      { email: this.email }, // Payload (you can add other data if needed)
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "10m" } // Valid for 10 minutes
    );
    return otpToken;
  } catch (error) {
    throw new Error("OTP generation failed");
  }
};

// Generate JWT for Authentication (if needed for login directly)
UserSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign(
      { id: this._id, role: this.role }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1d" } // Valid for 1 day
    );
    return token;
  } catch (error) {
    throw new Error("Auth token generation failed");
  }
};

module.exports = mongoose.model("User", UserSchema);
