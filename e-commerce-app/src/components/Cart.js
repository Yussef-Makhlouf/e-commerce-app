
// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// export default function Component() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://fakestoreapi.com/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();

//     const savedCart = JSON.parse(localStorage.getItem('cart'));
//     if (savedCart) {
//       setCart(savedCart);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const handleAddToCart = (product) => {
//     const existingProduct = cart.find((item) => item.id === product.id);
//     if (existingProduct) {
//       setCart(cart.map((item) =>
//         item.id === product.id ? { ...item, quantity: item.quantity + 1, animate: true } : item
//       ));
//     } else {
//       setCart([...cart, { ...product, quantity: 1, animate: true }]);
//     }
//   };

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
//       <div className="row">
//         {/* Product List */}
//         <div className="col-md-8">
//           <h3 className="mb-4">Products</h3>
//           <div className="row">
//             {products.map((product) => (
//               <div key={product.id} className="col-md-4 mb-4">
//                 <div className="card h-100 shadow-sm">
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     className="card-img-top"
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                   <div className="card-body d-flex flex-column">
//                     <h5 className="card-title">{product.title}</h5>
//                     <p className="card-text text-muted flex-grow-1">{product.description}</p>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <h6 className="mb-0">${product.price.toFixed(2)}</h6>
//                       <button
//                         className="btn btn-primary btn-sm"
//                         onClick={() => handleAddToCart(product)}
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Cart */}
//         <div className="col-md-4">
//           <div className="card shadow-sm">
//             <div className="card-header bg-primary text-white d-flex justify-content-between">
//               <h5 className="card-title mb-0">Your Cart</h5>
//               {cart.length > 0 && (
//                 <button
//                   className="btn btn-outline-light btn-sm"
//                   onClick={() => setShowModal(true)}
//                 >
//                   Clear Cart
//                 </button>
//               )}
//             </div>
//             <div className="card-body">
//               {cart.length === 0 ? (
//                 <p className="text-muted">Your cart is empty.</p>
//               ) : (
//                 <div className="list-group">
//                   {cart.map((item) => (
//                     <div
//                       key={item.id}
//                       className={`list-group-item d-flex align-items-center py-2 ${item.animate ? 'animate' : ''}`}
//                       onAnimationEnd={() => setCart(cart.map((i) =>
//                         i.id === item.id ? { ...i, animate: false } : i
//                       ))}
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="img-thumbnail me-2"
//                         style={{ width: '60px', height: '60px', objectFit: 'cover' }}
//                       />
//                       <div className="flex-grow-1">
//                         <h6 className="mb-0">{item.title}</h6>
//                         <small className="text-muted">{item.description}</small>
//                       </div>
//                       <div className="d-flex align-items-center me-3">
//                         <button
//                           className="btn btn-outline-secondary btn-sm"
//                           onClick={() => handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))}
//                           disabled={item.quantity === 1}
//                         >
//                           <i className="bi bi-dash"></i>
//                         </button>
//                         <span className="mx-2">{item.quantity}</span>
//                         <button
//                           className="btn btn-outline-secondary btn-sm"
//                           onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                         >
//                           <i className="bi bi-plus"></i>
//                         </button>
//                       </div>
//                       <div className="me-3 font-weight-bold text-nowrap">${item.price.toFixed(2)}</div>
//                       <button
//                         className="btn btn-outline-danger btn-sm"
//                         onClick={() => handleRemoveFromCart(item.id)}
//                       >
//                         <i className="bi bi-x"></i>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="card-footer d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Total: ${totalPrice.toFixed(2)}</h5>
//               <button className="btn btn-primary btn-sm">Checkout</button>
//             </div>
//           </div>
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
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Component() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1, animate: true } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, animate: true }]);
    }
  };

  const handleQuantityChange = (id, value) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: value, animate: true } : item
    ));
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
    setShowModal(false);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Product List */}
        <div className="col-md-8">
          <h3 className="mb-4">Products</h3>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-muted flex-grow-1">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">${product.price.toFixed(2)}</h6>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between">
              <h5 className="card-title mb-0">Your Cart</h5>
              {cart.length > 0 && (
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => setShowModal(true)}
                >
                  Clear Cart
                </button>
              )}
            </div>
            <div className="card-body">
              {cart.length === 0 ? (
                <p className="text-muted">Your cart is empty.</p>
              ) : (
                <div className="list-group">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className={`list-group-item d-flex align-items-center py-2 ${item.animate ? 'animate' : ''}`}
                      onAnimationEnd={() => setCart(cart.map((i) =>
                        i.id === item.id ? { ...i, animate: false } : i
                      ))}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-thumbnail me-2"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">{item.title}</h6>
                        <small className="text-muted">{item.description}</small>
                      </div>
                      <div className="d-flex align-items-center me-3">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))}
                          disabled={item.quantity === 1}
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                      <div className="me-3 font-weight-bold text-nowrap">${item.price.toFixed(2)}</div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Total: ${totalPrice.toFixed(2)}</h5>
              <button className="btn btn-primary btn-sm">Checkout</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Clear Cart</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to clear all items from your cart?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
