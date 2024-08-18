import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="#">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/about_us">
                  about_us
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/conect_us">
                  Contact Us
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/Wishlist">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
