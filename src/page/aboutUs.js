import React, { useState } from "react";
import "./css/aboutUs.css";
import CategoryCard from "../component/CategoryCard .js";

const AboutUs = () => {
  return (
    <>
      <div className="layer">
        <div className="bg-image">
          <div className="overlay">
            <div
              className="container d-flex justify-content-center align-items-center text-center text-light lh-lg"
              style={{ height: "100%" }}
            >
              <div className="row justify-content-center align-items-center ">
                <h1 className="fs-1">
                  About Our E-commerce
                  <br /> Company
                </h1>
                <h3 className="lh-base fs-4">
                  We are a leading e-commerce platform dedicated to providing
                  <br />
                  high-quality products and exceptional customer service. Our
                  <br />
                  mission is to empower our customers with a seamless shopping
                  experience.
                </h3>
                <button className="btn btn-dark col-md-2">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section tow */}
      <div className="container mt-4 style lh-lg ">
        <div className="row ">
          <div className="col-md-4 my-4 ">
            <h2>Our Story</h2>
            <p>
              Our e-commerce company was founded in 2015 with a vision to
              revolutionize the online shopping experience. Since then, we have
              grown to become a trusted brand, serving customers across the
              globe
            </p>
          </div>
          <div className="col-md-4 my-4 ">
            <h2>Our Founders</h2>
            <p>
              Our company was founded by a team of passionate entrepreneurs who
              believed in the power of e-commerce to transform the retail
              landscape. Meet our founders and learn about their journey.
            </p>

            <div className="d-flex align-items-center lh-base">
              <div className="avatar">
                <i class="fa-regular fa-user"></i>
              </div>
              <div className="ml-2">
                <div className="name">John Doe</div>
                <div className="title">Co-founder</div>
              </div>
            </div>
            <div className="d-flex align-items-center lh-base">
              <div className="avatar">
                <i class="fa-regular fa-user"></i>
              </div>
              <div className="ml-2">
                <div className="name">John Doe</div>
                <div className="title">Co-founder</div>
              </div>
            </div>
          </div>
          <div className="col-md-4 my-4 ">
            <h2>Key Milestones</h2>
            <p>
              Over the years, we have achieved several key milestones that have
              solidified our position as a leading e-commerce company. Take a
              look at our journey.
            </p>
            <div className=" lh-base">
              <p>
                <i class="fa-solid fa-check"></i> Launched our e-commerce
                platform in 2015
              </p>
              <p>
                <i class="fa-solid fa-check"></i> Expanded to international
                markets in 2018
              </p>
              <p>
                <i class="fa-solid fa-check"></i> Reached 1 million active
                customers in 2020
              </p>
              <p>
                <i class="fa-solid fa-check"></i> Awarded 'Best E-commerce
                Platform' in 2022
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* section three */}
      <section className="three style lh-lg">
        <div className="container">
          <div className="row">
            <div className="col-md-4 my-3">
              <h2>Our Products</h2>
              <p>
                We offer a wide range of high-quality products across various
                categories, catering to the diverse needs of our customers.
              </p>
              <div className="App d-flex justify-content-around my-2">
                <CategoryCard icon="fa-tshirt" category="Clothing" />
                <CategoryCard icon="fa-laptop" category="Electronics" />
              </div>
              <div className="App d-flex justify-content-around">
                <CategoryCard icon="fa-house" category="Home &amp; Garden" />
                <CategoryCard icon="fa-gem" category="Beauty" />
              </div>
            </div>
            <div className="col-md-4 my-4">
              <h2>Certifications & Awards</h2>
              <p>
                Our commitment to quality and customer satisfaction has been
                recognized through various certifications and awards.
              </p>
            </div>
            <div className="col-md-4 my-4">
              <h2>Key Milestones</h2>
              <p>
                Over the years, we have achieved several key milestones that
                have solidified our position as a leading e-commerce company.
                Take a look at our journey.
              </p>
              <div className="lh-lg">
                <p>
                  <i class="fa-solid fa-check"></i> Launched our e-commerce
                  platform in 2015
                </p>
                <p>
                  <i class="fa-solid fa-check"></i> Expanded to international
                  markets in 2018
                </p>
                <p>
                  <i class="fa-solid fa-check"></i> Reached 1 million active
                  customers in 2020
                </p>
                <p>
                  <i class="fa-solid fa-check"></i> Awarded 'Best E-commerce
                  Platform' in 2022
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
