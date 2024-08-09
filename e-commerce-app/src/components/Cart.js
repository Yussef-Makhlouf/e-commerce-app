// import { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// export default function CartPage() {
//   const [cart, setCart] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('cart'));
//     if (savedCart) {
//       setCart(savedCart);
//     }
//   }, []);
  

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const handleQuantityChange = (id, value) => {
//     setCart(cart.map((item) =>
//       item.id === id ? { ...item, quantity: value, animate: true } : item
//     ));
//   };

//   const handleRemoveFromCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   const handleClearCart = () => {
//     setCart([]);
//     setShowModal(false);
//   };

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="container mt-5">
//       <h3 className="mb-4">Your Cart</h3>
//       <div className="card shadow-sm">
//         <div className="card-header bg-primary text-white d-flex justify-content-between">
//           <h5 className="card-title mb-0">Cart Items</h5>
//           {cart.length > 0 && (
//             <button
//               className="btn btn-outline-light btn-sm"
//               onClick={() => setShowModal(true)}
//             >
//               Clear Cart
//             </button>
//           )}
//         </div>
//         <div className="card-body">
//           {cart.length === 0 ? (
//             <p className="text-muted">Your cart is empty.</p>
//           ) : (
//             <div className="list-group">
//               {cart.map((item) => (
//                 <div
//                   key={item._id}
//                   className={`list-group-item d-flex align-items-center py-2 ${item.animate ? 'animate' : ''}`}
//                   onAnimationEnd={() => setCart(cart.map((i) =>
//                     i._id === item._id ? { ...i, animate: false } : i
//                   ))}
//                 >
//                   <img
//                     src={item.photo || "https://via.placeholder.com/150"}
//                     alt={item.productName}
//                     className="img-thumbnail me-2"
//                     style={{ width: '60px', height: '60px', objectFit: 'cover' }}
//                   />
//                   <div className="flex-grow-1">
//                     <h6 className="mb-0">{item.productName}</h6>
//                     <small className="text-muted">{item.description}</small>
//                   </div>
//                   <div className="d-flex align-items-center me-3">
//                     <button
//                       className="btn btn-outline-secondary btn-sm"
//                       onClick={() => handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))}
//                       disabled={item.quantity === 1}
//                     >
//                       <i className="bi bi-dash"></i>
//                     </button>
//                     <span className="mx-2">{item.quantity}</span>
//                     <button
//                       className="btn btn-outline-secondary btn-sm"
//                       onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
//                     >
//                       <i className="bi bi-plus"></i>
//                     </button>
//                   </div>
//                   <div className="me-3 font-weight-bold text-nowrap">${item.price.toFixed(2)}</div>
//                   <button
//                     className="btn btn-outline-danger btn-sm"
//                     onClick={() => handleRemoveFromCart(item.id)}
//                   >
//                     <i className="bi bi-x"></i>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="card-footer d-flex justify-content-between align-items-center">
//           <h5 className="mb-0">Total: ${totalPrice.toFixed(2)}</h5>
//           <button className="btn btn-primary btn-sm">Checkout</button>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="modal d-block" tabIndex="-1" role="dialog">
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Clear Cart</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setShowModal(false)}
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to clear all items from your cart?</p>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={handleClearCart}
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .animate {
//           animation: fadeIn 0.3s ease-out;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         .modal-content {
//           box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
//         }
//       `}</style>
//     </div>
//   );
// }
// CartPage.js
// import { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

// export default function CartPage() {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('cart'));
//     if (savedCart) setCart(savedCart);
//   }, []);

//   const handleRemoveFromCart = (productId) => {
//     const updatedCart = cart.filter(item => item._id !== productId);
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <Container className="mt-5">
//       <header className="mb-4">
//         <h1 className="text-center">Shopping Cart</h1>
//       </header>
//       {cart.length === 0 ? (
//         <p className="text-center">Your cart is empty.</p>
//       ) : (
//         <>
//           <Row>
//             {cart.map((item) => (
//               <Col md={6} lg={4} className="mb-4" key={item._id}>
//                 <Card className="h-100 shadow-sm">
//                   <Card.Img
//                     variant="top"
//                     src={item.image || "https://via.placeholder.com/300x200?text=No+Image"}
//                     alt={item.title}
//                     className="p-3"
//                     style={{ height: "200px", objectFit: "contain" }}
//                   />
//                   <Card.Body className="d-flex flex-column">
//                     <Card.Title className="text-truncate">{item.title}</Card.Title>
//                     <Card.Text className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
//                       {item.description.length > 100
//                         ? item.description.substring(0, 100) + "..."
//                         : item.description}
//                     </Card.Text>
//                     <div className="d-flex justify-content-between align-items-center mt-auto">
//                       <Badge bg="primary">{item.quantity} x {item.price.toFixed(2)}</Badge>
//                       <div className="text-lg font-weight-bold">${(item.price * item.quantity).toFixed(2)}</div>
//                     </div>
//                     <Button 
//                       variant="danger" 
//                       className="mt-2 w-100"
//                       onClick={() => handleRemoveFromCart(item._id)}
//                     >
//                       Remove
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//           <div className="d-flex justify-content-between align-items-center mt-4">
//             <h4>Total Amount:</h4>
//             <h4>${totalAmount.toFixed(2)}</h4>
//           </div>
//         </>
//       )}
//     </Container>
//   );
// }

// CartPage.js
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Form } from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) setCart(savedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (productId, increment) => {
    const updatedCart = cart.map(item => {
      if (item._id === productId) {
        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(newQuantity, 1) };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i}>
          {rating >= i + 1 ? (
            <FaStar color="#ffc107" />
          ) : rating >= i + 0.5 ? (
            <FaStarHalfAlt color="#ffc107" />
          ) : (
            <FaRegStar color="#ffc107" />
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <Container className="mt-5">
      <header className="mb-4">
        <h1 className="text-center">Shopping Cart</h1>
      </header>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {cart.map((item) => {
              const price = item.price || 0;
              const quantity = item.quantity || 1;
              const rating = item.rating || 0;

              return (
                <Col md={6} lg={4} className="mb-4" key={item._id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={item.image || "https://via.placeholder.com/300x200?text=No+Image"}
                      alt={item.title}
                      className="p-3"
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-truncate">{item.title}</Card.Title>
                      <div className="d-flex align-items-center mb-2">
                        <div className="me-2">{renderRatingStars(rating)}</div>
                        <Badge bg="primary">{rating.toFixed(1)} / 5</Badge>
                      </div>
                      <Card.Text className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
                        {item.description.length > 100
                          ? item.description.substring(0, 100) + "..."
                          : item.description}
                      </Card.Text>
                      <div className="d-flex align-items-center mb-2">
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleQuantityChange(item._id, false)}
                          disabled={quantity <= 1}
                          className="me-2"
                        >
                          -
                        </Button>
                        <Form.Control
                          type="text"
                          value={quantity}
                          readOnly
                          className="text-center"
                          style={{ width: "60px" }}
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleQuantityChange(item._id, true)}
                          className="ms-2"
                        >
                          +
                        </Button>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div className="text-lg font-weight-bold">
                          ${(price * quantity).toFixed(2)}
                        </div>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total Amount:</h4>
            <h4>${totalAmount.toFixed(2)}</h4>
          </div>
        </>
      )}
    </Container>
  );
}
