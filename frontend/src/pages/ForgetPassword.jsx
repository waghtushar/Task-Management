import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/password-reset/send-otp",
        { email }
      );
      toast.success("OTP sent to your email!");
      localStorage.setItem("otpToken", response.data.otpToken);
      localStorage.setItem("email", email);
      navigate("/otp"); // Navigate to OTP verification page
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP!");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h2 className="text-primary">Forget Password</h2>
                <p className="text-muted">
                  Enter your email address to receive an OTP for password reset.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="abcd@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send OTP
                  </button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <p className="text-muted">
                  Remembered your password?{" "}
                  <a
                    href="/login"
                    className="text-decoration-none text-primary"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
