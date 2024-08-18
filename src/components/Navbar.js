import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { useState } from 'react';



export default function NavigationBar({ isAuthenticated}) {


  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (onSearch) {
  //     onSearch(searchTerm);
  //   }
  // };

  return (
    <header className="bg-light sticky-top border-bottom shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light container py-2">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <MountainIcon className="me-2" />
          <span className="d-none d-md-inline fs-4 fw-bold">E-commerce</span>
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
        <div className="collapse navbar-collapse" id="navbarNav">
        
          <ul className="navbar-nav ms-auto d-none d-lg-flex align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/shop">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/aboutus">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/Wishlist">
                Wishlist
              </Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link text-dark" to="/favorite">
                favorite
              </Link>
            </li> 
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/dashboard">
                dashboard
              </Link>
            </li> 
          </ul>
          <div className="d-flex align-items-center gap-3 ms-3">
            <Link to="/cart" className="position-relative text-dark">
              <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                ${}
              </span>
            </Link>
            {isAuthenticated ? (
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle rounded-circle p-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  <img
                    src="/assets/user.jpg"
                    width="32"
                    height="32"
                    className="rounded-circle"
                    alt="Avatar"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                  <li><h6 className="dropdown-header">My Account</h6></li>
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><Link className="dropdown-item" to="/orders">Orders</Link></li>
                  <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link className="btn btn-outline-secondary rounded-pill" to="/login">Login</Link>
                <Link className="btn btn-primary rounded-pill" to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
