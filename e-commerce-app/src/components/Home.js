// import React from 'react';
// import { Link } from 'react-router-dom'; // Use this if you are using React Router for internal links

// export default function Home() {
//   return (
//     <section className="w-100 h-80vh bg-cover bg-center position-relative" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
//       <div className="position-absolute inset-0 bg-dark opacity-50"></div>
//       <div className="container h-100 d-flex flex-column align-items-center justify-content-center text-center text-dark px-4 px-md-6 position-relative z-index-10">
//         <h1 className="display-4 fw-bold mb-4">Discover the Latest Fashion Trends</h1>
//         <p className="lead mb-8 max-w-3xl">
//           Explore our curated collection of the hottest styles and must-have pieces for every occasion.
//         </p>
//         <Link
//           to="#"
//           className="btn btn-primary px-4 py-2 text-white fw-medium shadow-sm transition-all hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
//         >
//           Shop Now
//         </Link>
//       </div>
//     </section>
//   );
// }
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom"; // Use this if you are using React Router for internal links

export default function Home() {
  return (
    <section className="py-5 py-md-12 py-lg-24 h-100">
      <div className="container">
        <div className="row align-items-center gx-5">
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <img
              src="/placeholder.svg"
              alt="Product Image"
              className="img-fluid rounded-3"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="col-12 col-lg-6">
            <h1 className="display-4 fw-bold mb-4">Yussef Makhlouf ali</h1>
            <p className="text-muted fs-5 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <Link to="/shop">
              <button className="btn btn-primary btn-lg">Shop Now</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
