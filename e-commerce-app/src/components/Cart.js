// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// export default function Component() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);

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
//   }, []);

//   const handleAddToCart = (product) => {
//     const existingProduct = cart.find((item) => item.id === product.id);
//     if (existingProduct) {
//       setCart(cart.map((item) =>
//         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//       ));
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   const handleQuantityChange = (id, value) => {
//     setCart(cart.map((item) =>
//       item.id === id ? { ...item, quantity: value } : item
//     ));
//   };

//   const handleRemoveFromCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
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
//           <h3>Products</h3>
//           <div className="row">
//             {products.map((product) => (
//               <div key={product.id} className="col-md-4 mb-4">
//                 <div className="card">
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     className="card-img-top"
//                     style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{product.title}</h5>
//                     <p className="card-text">${product.price.toFixed(2)}</p>
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Cart */}
//         <div className="col-md-4">
//           <div className="card">
//             <div className="card-header">
//               <h5 className="card-title">Your Cart</h5>
//               <p className="card-text">Review and checkout your items.</p>
//             </div>
//             <div className="card-body">
//               {cart.length === 0 ? (
//                 <p>Your cart is empty.</p>
//               ) : (
//                 <div className="list-group">
//                   {cart.map((item) => (
//                     <div key={item.id} className="list-group-item d-flex align-items-center">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="img-thumbnail me-3"
//                         style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                       />
//                       <div className="flex-grow-1 me-3">
//                         <h5 className="mb-1">{item.title}</h5>
//                         <p className="mb-1 text-muted">{item.description}</p>
//                       </div>
//                       <div className="d-flex align-items-center me-3">
//                         <button
//                           className="btn btn-outline-secondary me-2"
//                           onClick={() => handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))}
//                           disabled={item.quantity === 1}
//                         >
//                           <i className="bi bi-dash"></i>
//                         </button>
//                         <span className="mx-2">{item.quantity}</span>
//                         <button
//                           className="btn btn-outline-secondary ms-2"
//                           onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                         >
//                           <i className="bi bi-plus"></i>
//                         </button>
//                       </div>
//                       <div className="me-3 font-weight-bold">${item.price.toFixed(2)}</div>
//                       <button
//                         className="btn btn-outline-danger"
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
//               <h4 className="mb-0">Total: ${totalPrice.toFixed(2)}</h4>
//               <button className="btn btn-primary btn-lg">Checkout</button>
//             </div>
//           </div>
//         </div>
//       </div>
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Fetch products from API
    fetchProducts();

    // Load cart from local storage
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

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
      <div className="row">
        {/* Product List */}
        <div className="col-md-8">
          <h3>Products</h3>
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top"
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price.toFixed(2)}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Your Cart</h5>
              <p className="card-text">Review and checkout your items.</p>
            </div>
            <div className="card-body">
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
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
              )}
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Total: ${totalPrice.toFixed(2)}</h4>
              <button className="btn btn-primary btn-lg">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
