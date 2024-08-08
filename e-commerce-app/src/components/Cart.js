
"use client";

import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Component() {
  const products = [
    {
      id: 1,
      image: "/placeholder.svg",
      title: "Cozy Blanket",
      description: "Warm and Soft for Chilly Nights",
      price: 29.99,
      quantity: 1,
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Autumn Mug",
      description: "Enjoy Your Hot Beverages in Style",
      price: 12.99,
      quantity: 1,
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "Fall Fragrance Candle",
      description: "Fill Your Space with a Cozy Scent",
      price: 16.99,
      quantity: 1,
    },
  ];

  const [cart, setCart] = useState(products);

  const handleQuantityChange = (id, value) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: value } : item
    ));
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Your Cart</h5>
          <p className="card-text">Review and checkout your items.</p>
        </div>
        <div className="card-body">
          <div className="list-group">
            {cart.map((item) => (
              <div key={item.id} className="list-group-item d-flex align-items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-thumbnail me-3"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <div className="flex-grow-1 me-3">
                  <h5 className="mb-1">{item.title}</h5>
                  <p className="mb-1 text-muted">{item.description}</p>
                </div>
                <div className="d-flex align-items-center me-3">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))}
                    disabled={item.quantity === 1}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary ms-2"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
                <div className="me-3 font-weight-bold">${item.price.toFixed(2)}</div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Total: ${totalPrice.toFixed(2)}</h4>
          <button className="btn btn-primary btn-lg">Checkout</button>
        </div>
      </div>
    </div>
  );
}
