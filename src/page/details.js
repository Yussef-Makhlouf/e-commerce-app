// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StarRatings from "react-star-ratings";
// import { useNavigate, useParams } from "react-router-dom";
// import "./css/details.css";

// const Details = () => {

//   const [product, setproduct] = useState([]);
//   const [rate, setRate] = useState();
//    const navigate = useNavigate();
   
// const params = useParams();
// console.log(params.id);

//  const handleAddToCart = (id) => {
//    navigate(`/cart/${id}`);
//  };
//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/v1/react/products/${params.id}`)
//       .then((res) => {
//            console.log("hhhh", res.data.data.product);
//         setproduct(res.data.data.product);
//         // setrate(res.data.rating.rate);
//         setRate(res.data.data.product.ratingsAvg);
//         ;
     
//         // console.log("dddd", rate);
//         // console.log("rrrrrrr", res.data.rating?.rate);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);
//   return (
//     <>
//       <div className="container py-5">
//         <div className="row py-5">
//           {/* small image */}
//           <div className="col-md-2 mt-2">
//             <img className="w-100 imagee" src={product.photo} />
//             <img className="w-100 imagee" src={product.photo} />
//             <img className="w-100 imagee" src={product.photo} />
//           </div>
//           <div className="col-md-3 mt-2">
//             <img className="w-100" src={product.photo} />
//           </div>
//           {/* product details */}
//           <div className="col-md-7">
//             <h2 className="fw-bolder">{product.productName}</h2>
//             {/* star */}
//             <div className="star-rating-component">
//               <StarRatings
//                 rating={rate}
//                 starRatedColor="#12805D"
//                 numberOfStars={5}
//                 name="rating"
//                 starDimension="24px"
//                 starSpacing="2px"
//               />
//               <span className="ms-2 mt-4  fs-6">{rate}</span>
//             </div>
//             {/* end star */}
//             <h3 className="fw-bolder mt-2">{product.price} $</h3>
//             <div className=" d-flex justify-content-end ">
//               <button
//                 className="btn btn-dark"
//                 onClick={() => handleAddToCart(product.id)}
//               >
//                 <i className="fa-solid fa-cart-shopping"></i> Add to Cart
//               </button>
//             </div>
//             <hr className="my-4 border-primary custom-hr" />
//             <h3 className="fw-bolder">{product.description}</h3>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Details;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap"; // Import Spinner for loading state
import "./css/details.css";

const Details = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/react/products/${id}`)
      .then((res) => {
        const productData = res.data.data.product;
        setProduct(productData);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product details.");
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  const handleAddToCart = () => {
    // Get existing cart from local storage or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product is already in the cart
    const productInCart = existingCart.find(item => item._id === product._id);
    
    if (productInCart) {
      // If the product is already in the cart, increase the quantity
      productInCart.quantity += 1;
    } else {
      // If not, add the product with a quantity of 1
      existingCart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Navigate to the cart page
    navigate(`/cart`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status" />
        <p>Loading product details...</p>
      </div>
    );
  }
  

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row py-5">
        {/* Thumbnail images */}
        <div className="col-md-2 mt-2 p-3 d-flex flex-column gap-3">
          {[...Array(3)].map((_, index) => (
            <img
              key={index}
              className="w-100 image"
              src={
                product.photo
                  ? `http://localhost:5000/${product.photo}`
                  : "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={`${product.productName || "Product"} thumbnail ${index + 1}`}
              loading="lazy"
            />
          ))}
        </div>
        {/* Main product image */}
        <div className="col-md-5 mt-2">
          <img
            className="w-100 main-image"
            src={product.photo || "/images/no-image.png"} // Fallback image
            alt={product.productName || "Product"}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; // Fallback image
            }}
          />
        </div>
        {/* Product details */}
        <div className="col-md-5">
          <h1 className="fw-bolder">{product.productName || "Product Name"}</h1>
          <h3 className="fw-bolder mt-3 text-success">
            {product.price ? `$${product.price}` : "Price not available"}
          </h3>
          <div className="d-flex justify-content-end mt-4">
            <button
              className="btn btn-dark"
              onClick={handleAddToCart}
              disabled={!product.id} // Disable if product is not loaded
              aria-label={`Add ${product.productName || "product"} to cart`}
            >
              <i className="fa-solid fa-cart-shopping me-2"></i>Add to Cart
            </button>
          </div>
          <hr className="my-4 border-primary custom-hr" />
          <p className="fw-normal">
            {product.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;