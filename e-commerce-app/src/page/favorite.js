// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Card, ListGroup, Badge, Button } from "react-bootstrap";
// import { removeFavorite } from "../redux/slices/favoriteSlice.js";
// import { useNavigate } from "react-router-dom";
// import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

// export default function Favorite() {
//   const favorites = useSelector((state) => state.favorites);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleDetails = (id) => {
//     navigate(`/details/${id}`);
//   };

//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 !== 0;
//     return (
//       <>
//         {[...Array(fullStars)].map((_, index) => (
//           <BsStarFill key={index} style={{ color: "#FFC107" }} />
//         ))}
//         {halfStar && <BsStarHalf style={{ color: "#FFC107" }} />}
//         {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
//           <BsStar key={index} style={{ color: "#FFC107" }} />
//         ))}
//       </>
//     );
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4" style={{ color: "#4CAF50" }}>
//         Favorite Products
//       </h1>
//       <div className="row">
//         {favorites.length === 0 ? (
//           <p className="text-center">No favorite products.</p>
//         ) : (
//           favorites.map((product) => (
//             <div key={product._id} className="col-md-6 col-lg-4 mb-4">
//               <Card>
//                 <Card.Img
//                   variant="top"
//                   src={`http://localhost:5000/${product.image}`}
//                   alt={product.productName}
//                   style={{ cursor: "pointer" }}
//                   onClick={() => handleDetails(product._id)}
//                 />
//                 <Card.Body>
//                   <Card.Title>{product.productName}</Card.Title>
//                   <Card.Text>{product.description}</Card.Text>
//                   <ListGroup variant="flush" className="mb-2">
//                     <ListGroup.Item>
//                       Price:{" "}
//                       <Badge bg="success" className="ms-2">
//                         {product.price}$
//                       </Badge>
//                     </ListGroup.Item>
//                     <ListGroup.Item>
//                       Rating: {renderStars(product.ratingsAvg)}
//                     </ListGroup.Item>
//                   </ListGroup>
//                   <Button
//                     variant="danger"
//                     onClick={() => dispatch(removeFavorite(product._id))}
//                   >
//                     Remove from Favorites
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </div>
//           ))
//         )}
//       </div>
      
//     </div>
//   );
// }
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, ListGroup, Badge, Button } from "react-bootstrap";
import { removeFavorite } from "../redux/slices/favoriteSlice.js";
import { useNavigate } from "react-router-dom";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export default function Favorite() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <BsStarFill key={index} style={{ color: "#FFC107" }} />
        ))}
        {halfStar && <BsStarHalf style={{ color: "#FFC107" }} />}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
          <BsStar key={index} style={{ color: "#FFC107" }} />
        ))}
      </>
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: "#4CAF50" }}>
        Favorite Products
      </h1>
      <div className="row">
        {favorites.length === 0 ? (
          <p className="text-center">No favorite products.</p>
        ) : (
          favorites.map((product) => (
            <div key={product._id} className="col-md-6 col-lg-4 mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.productName}
                  style={{ cursor: "pointer", height: "200px", objectFit: "cover" }}
                  onClick={() => handleDetails(product._id)}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "https://placehold.co/600x400/orange/white"; // Fallback image
                  }}
                />
                <Card.Body>
                  <Card.Title className="text-truncate">{product.productName}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <ListGroup variant="flush" className="mb-2">
                    <ListGroup.Item>
                      Price:{" "}
                      <Badge bg="success" className="ms-2">
                        {product.price}$
                      </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Rating: {renderStars(product.ratingsAvg)}
                    </ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch(removeFavorite(product._id));
                      alert(`${product.productName} removed from favorites!`);
                    }}
                  >
                    Remove from Favorites
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
