import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-light shadow py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
              <img alt="logo" src="logo" width="30px" />
              <span className="ms-3 h5 fw-bold">E-commerce</span>
            </a>
            <p className="my-3" style={{ width: '250px' }}>
              We are creating High Quality Resources and tools to Aid developers during the
              development of their projects.
            </p>
            <div className="mt-4">
              <a href="#" className="btn btn-dark btn-sm me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="btn btn-dark btn-sm me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="btn btn-dark btn-sm">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="col-md-2">
            <h5 className="mb-4 fw-bold">Devwares</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark text-decoration-none">Resources</a></li>
              <li><a href="/" className="text-dark text-decoration-none">About Us</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Contact</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Blog</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h5 className="mb-4 fw-bold">Help</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark text-decoration-none">Support</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Sign Up</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Sign In</a></li>
            </ul>
          </div>
          <div className="col-md-2">
            <h5 className="mb-4 fw-bold">Products</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark text-decoration-none">Windframe</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Loop</a></li>
              <li><a href="/" className="text-dark text-decoration-none">Contrast</a></li>
            </ul>
          </div>
        </div>
        <small className="text-center d-block mt-5">&copy; Yussef, 2024. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
