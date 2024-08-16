import axios from "axios";
import React, { useEffect, useState } from "react";

const Wishlist = () => {
  const [Products, setproducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/react/products")
      .then((res) => {
        setproducts(res.data[1]?.products);
        console.log('ddd',res.data[1]?.products)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <section id="Blog ">
        <div className="blog-head text-center mt-2">
          <h2>MY Products</h2>
          <p>
            Nullam Viverra nibh viate Neque condimentum
            <br />
            mattis phasellus fermentum puli
          </p>
        </div>
        <div className="container">
          <div className="row">
            {Products.map((product) => {
              return (
                <div className="col-md-4 mt-3 mb-5" key={product.id}>
                  <div class="card">
                    <img
                      src={product.image}
                      class="card-img-top"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                    <div class="card-body">
                      <h5 class="card-title">{product.productName}</h5>
                      <h6 class="card-text">{product.price} $</h6>
                      <a href="#" class="btn btn-dark">
                        <i className="fa-solid fa-cart-shopping"></i> Add to
                        cart
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
