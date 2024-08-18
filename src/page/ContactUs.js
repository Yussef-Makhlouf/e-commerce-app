import React, { useState } from "react";
const ContactUs = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div class="form-txt col-md-6 mt-5 ">
            <h1>Contact Us</h1>
            <span>
              As you might expect of a company that began as a high-end
              interiors contractor, we pay strict attention.
            </span>
            <h3>Egypt</h3>
            <p>
              195 E Parker Square Dr, Parker, CO 801
              <br />
              +43 982-314-0958
            </p>
            <h3>Palestine</h3>
            <p>
             Khan Younis, Salahuddin street
              <br />
              0599322300
            </p>
          </div>

          <div className="container col-md-6  ">
            <div className="row">
              <form className="row my-4 border-start border-black py-3">
                <div className="mb-3 col-md-6  fs-4">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control p-2"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3  col-md-6  fs-4">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    className="form-control p-2"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3 fs-4 ">
                  <label for="email">phone</label>
                  <input
                    type="number"
                    className="form-control p-2"
                    id="phone"
                    placeholder="Enter your phone"
                    required
                  />
                </div>
                <div className="mb-3 fs-4">
                  <label for="message">Message</label>
                  <textarea
                    className="form-control p-2"
                    placeholder="How can we assist you?"
                    id="message"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-dark pb-3">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
