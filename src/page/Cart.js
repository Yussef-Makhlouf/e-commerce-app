import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
  Modal,
} from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const handleRemoveFromCart = (productId) => {
    setProductIdToRemove(productId);
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    const updatedCart = cart.filter((item) => item._id !== productIdToRemove);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setShowConfirm(false);
    setProductIdToRemove(null);
  };

  const handleQuantityChange = (productId, increment) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(newQuantity, 1) };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

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
              const rating = item.ratingsAvg || 0;

              return (
                <Col md={6} lg={4} className="mb-4" key={item._id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={
                        item.image
                          ? `http://localhost:5000/${item.image}`
                          : "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={item.productName}
                      className="p-3"
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="text-truncate">
                        {item.productName}
                      </Card.Title>
                      <div className="d-flex align-items-center mb-2">
                        <div className="me-2">{renderRatingStars(rating)}</div>
                        <Badge bg="primary">{rating.toFixed(1)} / 5</Badge>
                      </div>
                      <Card.Text
                        className="text-muted mb-2"
                        style={{ fontSize: "0.9rem" }}
                      >
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

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this item from the cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
