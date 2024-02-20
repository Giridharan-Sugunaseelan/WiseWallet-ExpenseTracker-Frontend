import { useState } from "react";
import { isUserLoggedIn } from "../../service/authservice";
import { Link, useLocation } from "react-router-dom";
import DropDownComponent from "../DropDownComponent/DropDownComponent";

function Header() {
  const isAuth = isUserLoggedIn();
  const [openProfile, setOpenProfile] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav
        className="navbar navbar-expand-sm bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div>
            <Link
              to="/wisewallet/"
              className="navbar-brand d-flex align-items-center"
            >
              <img
                width="40"
                height="40"
                src="https://img.icons8.com/ios-glyphs/30/FFFFFF/wallet.png"
                alt="wallet"
              />
              <div
                style={{
                  fontFamily: "Rubik, sans-serif",
                  fontSize: "30px",
                  marginLeft: "10px",
                  marginBottom: "0px",
                }}
              >
                WiseWallet
              </div>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li
                className={`nav-item ${
                  location.pathname === "/wisewallet" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/wisewallet">
                  Home
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/wisewallet/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/wisewallet/about">
                  About
                </Link>
              </li>
              {!isAuth && (
                <li
                  className={`nav-item ${
                    location.pathname === "/wisewallet/login" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/wisewallet/login">
                    Login
                  </Link>
                </li>
              )}
              {isAuth && (
                <li
                  className={`nav-item ${
                    location.pathname === "/wisewallet/dashboard"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link className="nav-link" to="/wisewallet/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}
              {isAuth && (
                <li
                  className={`nav-item ${
                    location.pathname === "/wisewallet/transactions"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link className="nav-link" to="/wisewallet/transactions">
                    Transactions
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <div className="profile-icon">
              {isAuth && (
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/user-male-circle.png"
                  alt="user-male-circle"
                  onClick={() => {
                    setOpenProfile((prev) => !prev);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
      {openProfile && <DropDownComponent />}
    </>
  );
}

export default Header;
