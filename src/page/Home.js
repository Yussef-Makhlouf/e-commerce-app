import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom"; // Use this if you are using React Router for internal links

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-5 py-md-12 py-lg-24 h-100" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="row align-items-center gx-5">
            <div className="col-12 col-lg-6 d-flex justify-content-center">
              <img
                src="./assets/ho3.jpg"
                alt="Hero Product"
                className="img-fluid rounded-3 shadow-lg"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div className="col-12 col-lg-6">
              <h1 className="display-4 fw-bold mb-4" style={{ color: "#343a40" }}>Yussef Makhlouf Ali</h1>
              <p className="text-muted fs-5 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link to="/shop">
                <button className="btn btn-dark btn-lg me-2">Shop Now</button>
              </Link>
              <Link to="/contact">
                <button className="btn btn-outline-dark btn-lg">Contact Us</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-5 py-md-12 py-lg-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-4" style={{ color: "#343a40" }}>Featured Products</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {/* Product Card 1 */}
            <div className="col">
              <div className="card shadow-sm border-0">
                <img src="/assets/home1.jpg" className="card-img-top" alt="Product 1" style={{ aspectRatio: "4/3" }} />
                <div className="card-body">
                  <h5 className="card-title">Cozy Throw Blanket</h5>
                  <p className="card-text">$49.99</p>
                  <Link to="#" className="btn btn-dark">View Details</Link>
                </div>
              </div>
            </div>
            {/* Product Card 2 */}
            <div className="col">
              <div className="card shadow-sm border-0">
                <img src="/assets/home1.jpg" className="card-img-top" alt="Product 2" style={{ aspectRatio: "4/3" }} />
                <div className="card-body">
                  <h5 className="card-title">Modern Desk Lamp</h5>
                  <p className="card-text">$79.99</p>
                  <Link to="#" className="btn btn-dark">View Details</Link>
                </div>
              </div>
            </div>
            {/* Product Card 3 */}
            <div className="col">
              <div className="card shadow-sm border-0">
                <img src="/assets/home1.jpg" className="card-img-top" alt="Product 3" style={{ aspectRatio: "4/3" }} />
                <div className="card-body">
                  <h5 className="card-title">Minimalist Vase</h5>
                  <p className="card-text">$29.99</p>
                  <Link to="#" className="btn btn-dark">View Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 py-md-12 py-lg-24" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-4" style={{ color: "#343a40" }}>What Our Customers Say</h2>
          <div className="row">
            {/* Testimonial 1 */}
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img src="/assets/ho3.jpg" className="rounded-circle me-3" alt="Customer 1" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                    <div>
                      <h5 className="card-title mb-0">John Doe</h5>
                      <small className="text-muted">Verified Buyer</small>
                    </div>
                  </div>
                  <p className="card-text">“Excellent products and fantastic customer service. Highly recommend!”</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img src="/assets/home1.jpg" className="rounded-circle me-3" alt="Customer 2" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                    <div>
                      <h5 className="card-title mb-0">Jane Smith</h5>
                      <small className="text-muted">Verified Buyer</small>
                    </div>
                  </div>
                  <p className="card-text">“Great quality products at amazing prices. Will definitely shop again!”</p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img src="/assets/user.jpg" className="rounded-circle me-3" alt="Customer 3" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                    <div>
                      <h5 className="card-title mb-0">Alex Johnson</h5>
                      <small className="text-muted">Verified Buyer</small>
                    </div>
                  </div>
                  <p className="card-text">“Love the selection and the shopping experience. Highly satisfied!”</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 py-md-12 py-lg-24 text-center" style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
        <div className="container">
          <h2 className="display-5 fw-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="fs-4 mb-4">Discover our exclusive collection and enjoy premium home products at unbeatable prices.</p>
          <Link to="/shop">
            <button className="btn btn-success btn-lg me-2">Shop Now</button>
          </Link>
          <Link to="/contact">
            <button className="btn btn-outline-light btn-lg">Contact Us</button>
          </Link>
        </div>
      </section>
    </div>
  );
}



