const express = require("express");
const { loginLimiter } = require("../middlewares/rateLimiter");
const { registerUser, loginUser,sendPasswordResetOTP,resetPasswordWithOTP, } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginLimiter, loginUser);

router.post("/password-reset/send-otp", sendPasswordResetOTP);
router.post("/password-reset/verify-otp", resetPasswordWithOTP);

module.exports = router;
