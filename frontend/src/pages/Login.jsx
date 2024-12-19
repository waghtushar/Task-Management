import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaSignInAlt } from "react-icons/fa"; // For icons

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        loginData
      );
      setMessage("Login successful!");
      localStorage.setItem("token", response.data.token); // Save JWT token
      navigate("/view-task"); // Redirect after login
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed!");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", signupData);
      setMessage("Signup successful! You can now log in.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed!");
    }
  };

  const handleInputChange = (e, isSignup = false) => {
    const { name, value } = e.target;
    if (isSignup) {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <ul
                className="nav nav-tabs"
                id="login-signup-tabs"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="login-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#login"
                    type="button"
                    role="tab"
                    aria-controls="login"
                    aria-selected="true"
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="signup-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#signup"
                    type="button"
                    role="tab"
                    aria-controls="signup"
                    aria-selected="false"
                  >
                    Sign Up
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-4">
                {/* Login Form */}
                <div
                  className="tab-pane fade show active"
                  id="login"
                  role="tabpanel"
                  aria-labelledby="login-tab"
                >
                  <div className="text-center mb-3">
                    <h4 className="text-primary">Welcome Back!</h4>
                  </div>
                  {message && (
                    <div className="alert alert-danger">{message}</div>
                  )}
                  <form onSubmit={handleLoginSubmit}>
                    <div className="mb-3 position-relative">
                      <label htmlFor="email" className="form-label">
                        Email*
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={loginData.email}
                          onChange={(e) => handleInputChange(e)}
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3 position-relative">
                      <label htmlFor="password" className="form-label">
                        Password*
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={loginData.password}
                          onChange={(e) => handleInputChange(e)}
                          placeholder="Enter password"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 shadow-lg"
                      >
                        Login <FaSignInAlt />
                      </button>
                    </div>
                    <p className="text-muted">
                      Forgot Password?{" "}
                      <Link
                        to="/forget-password"
                        className="text-decoration-none"
                      >
                        Click Here
                      </Link>
                    </p>
                  </form>
                </div>

                {/* Signup Form */}
                <div
                  className="tab-pane fade"
                  id="signup"
                  role="tabpanel"
                  aria-labelledby="signup-tab"
                >
                  <div className="text-center mb-3">
                    <h4 className="text-primary">Create an Account</h4>
                  </div>
                  {message && (
                    <div className="alert alert-success">{message}</div>
                  )}
                  <form onSubmit={handleSignupSubmit}>
                    <div className="mb-3 position-relative">
                      <label htmlFor="name" className="form-label">
                        Full Name*
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={signupData.name}
                          onChange={(e) => handleInputChange(e, true)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3 position-relative">
                      <label htmlFor="signup-email" className="form-label">
                        Email*
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          id="signup-email"
                          name="email"
                          value={signupData.email}
                          onChange={(e) => handleInputChange(e, true)}
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">
                        Role*
                      </label>
                      <select
                        className="form-select"
                        id="role"
                        name="role"
                        value={signupData.role}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div className="mb-3 position-relative">
                      <label htmlFor="signup-password" className="form-label">
                        Password*
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="signup-password"
                          name="password"
                          value={signupData.password}
                          onChange={(e) => handleInputChange(e, true)}
                          placeholder="Enter password"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 shadow-lg"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
