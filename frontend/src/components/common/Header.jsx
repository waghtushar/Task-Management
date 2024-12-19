import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {

  return (
 <header className="theme-main-menu menu-overlay menu-style-one sticky-menu">
  <div className="inner-content gap-one">
    <div className="top-header position-relative">
      <div className="d-flex align-items-center justify-content-between">
        <div className="logo order-lg-0">
          <a href="index.html" className="d-flex align-items-center">
            <img src="images/logo/logo_01.svg" alt />
          </a>
        </div>
        {/* logo */}
        <div className="right-widget ms-auto ms-lg-0 me-3 me-lg-0 order-lg-3">
          <ul className="d-flex align-items-center style-none">
            <li>
              <Link to={'/login'} className="btn-one"><span>Login</span></Link>
            </li>
          </ul>
        </div>
        <nav className="navbar navbar-expand-lg p0 order-lg-2">
          <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav align-items-lg-center">
              <li className="d-block d-lg-none"><div className="logo"><a href="index.html" className="d-block active"><img src="images/logo/logo_01.svg" alt /></a></div></li>
              <li className="nav-item dashboard-menu">
                <a className="nav-link" href="/dashboard" >Dashboard</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div> {/*/.top-header*/}
  </div> {/* /.inner-content */}
</header>

  );
};

export default Header;
