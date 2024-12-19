import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Aside = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <aside className="dash-aside-navbar  vh-100 shadow ">
      <div className="position-relative">
        {/* Logo Section */}
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom ">
          <Link to="" aria-label="Homepage">
            <img
              src="/images/logo/logo_01.png"
              alt="Logo"
              className="img-fluid border border-5 border-success rounded rounded-5"
            />
          </Link>
          <button
            className="btn d-md-none"
            aria-label="Close Sidebar"
            onClick={() => {
              // Implement sidebar toggle logic
            }}
          >
            <i className="fa fa-times-circle" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="dasboard-main-nav py-3">
          <ul className="list-unstyled">
            <li className="px-3">
              <span className="text-muted text-uppercase small">MENU</span>
            </li>
            <li>
              <Link
                to="/view-task"
                className={`d-flex align-items-center text-decoration-none mx-4 px-3 py-2 rounded ${
                  location.pathname === "/view-task"
                    ? "bg-dark bg-opacity-75 mx-4 border border-2 border-danger text-white"
                    : "text-dark"
                }`}
              >
                <i class="bi bi-list-task fs-5"></i>
                <span>My Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                to="/create-task"
                className={`d-flex align-items-center text-decoration-none mx-4  px-3 py-2 rounded ${
                  location.pathname === "/create-task"
                    ? "bg-dark bg-opacity-75 mx-4 border border-2 border-danger text-white"
                    : "text-dark "
                }`}
              >
                <i class="bi bi-cloud-plus-fill fs-5 "></i>
                <span>Add New Tasks</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="px-3 mt-4">
          <button
            onClick={handleLogout}
            className="btn btn-danger w-100 d-flex align-items-center py-2"
          >
            <i class="bi bi-box-arrow-left mx-2 fs-5"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
