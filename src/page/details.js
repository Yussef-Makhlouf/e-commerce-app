import React, { useEffect, useState } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { useNavigate, useParams } from "react-router-dom";
import "./css/details.css";

const Details = () => {

  const [product, setproduct] = useState([]);
  const [rate, setRate] = useState();
   const navigate = useNavigate();
   
const params = useParams();
console.log(params.id);

 const handleAddToCart = (id) => {
   navigate(`/cart/${id}`);
 };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/react/products/${params.id}`)
      .then((res) => {
           console.log("hhhh", res.data.data.product);
        setproduct(res.data.data.product);
        // setrate(res.data.rating.rate);
        setRate(res.data.data.product.ratingsAvg);
        ;
     
        // console.log("dddd", rate);
        // console.log("rrrrrrr", res.data.rating?.rate);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="container py-5">
        <div className="row py-5">
          {/* small image */}
          <div className="col-md-2 mt-2">
            <img className="w-100 imagee" src={product.photo} />
            <img className="w-100 imagee" src={product.photo} />
            <img className="w-100 imagee" src={product.photo} />
          </div>
          <div className="col-md-3 mt-2">
            <img className="w-100" src={product.photo} />
          </div>
          {/* product details */}
          <div className="col-md-7">
            <h2 className="fw-bolder">{product.productName}</h2>
            {/* star */}
            <div className="star-rating-component">
              <StarRatings
                rating={rate}
                starRatedColor="#12805D"
                numberOfStars={5}
                name="rating"
                starDimension="24px"
                starSpacing="2px"
              />
              <span className="ms-2 mt-4  fs-6">{rate}</span>
            </div>
            {/* end star */}
            <h3 className="fw-bolder mt-2">{product.price} $</h3>
            <div className=" d-flex justify-content-end ">
              <button
                className="btn btn-dark"
                onClick={() => handleAddToCart(product.id)}
              >
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
            </div>
            <hr className="my-4 border-primary custom-hr" />
            <h3 className="fw-bolder">{product.description}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
