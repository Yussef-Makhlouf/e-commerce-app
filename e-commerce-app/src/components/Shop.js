// import React from "react";
// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { InputGroup, FormControl, Card, ListGroup, Badge, Spinner, Container, Row, Col, Pagination, Button } from "react-bootstrap";
// import RangeSlider from 'react-bootstrap-range-slider';
// import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState([]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(10000);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/v1/react/products");
//         const productsArray = response.data[1]?.products || [];

//         const uniqueCategories = [...new Set(productsArray.map(product => product.category))];

//         setProducts(productsArray);
//         setCategories(uniqueCategories);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('cart'));
//     if (savedCart) setCart(savedCart);
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

//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const matchesSearch =
//         product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory =
//         selectedCategory.length === 0 || selectedCategory.includes(product.category);
//       const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
//       const matchesRating = product.ratingsAvg >= selectedRating;
//       const isAvailable = product.is_available;

//       return matchesSearch && matchesCategory && matchesPrice && matchesRating && isAvailable;
//     });
//   }, [searchTerm, selectedCategory, minPrice, maxPrice, selectedRating, products]);

//   const indexOfLastProduct = currentPage * itemsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

//   if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;
//   if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;
//   if (filteredProducts.length === 0 && !loading) return <p className="text-center mt-5">No products found.</p>;

//   return (
//     <Container className="mt-5">
//       <header className="mb-4">
//         <h1 className="text-center mb-4">Product Showcase</h1>
//         <InputGroup className="mb-4">
//           <FormControl
//             type="search"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </InputGroup>
//       </header>
//       <Row>
//         <Col md={3}>
//           <div className="mb-4">
//             <h5>Category</h5>
//             <ListGroup>
//               {categories.map((category, index) => (
//                 <ListGroup.Item key={index} className="d-flex align-items-center">
//                   <input
//                     type="checkbox"
//                     checked={selectedCategory.includes(category)}
//                     onChange={() => {
//                       setSelectedCategory((prev) =>
//                         prev.includes(category)
//                           ? prev.filter((c) => c !== category)
//                           : [...prev, category]
//                       );
//                     }}
//                     className="me-2"
//                   />
//                   {category}
//                 </ListGroup.Item>
//               ))}
//             </ListGroup>
//           </div>
//           <div className="mb-4">
//             <h5>Price Range</h5>
//             <RangeSlider
//               value={minPrice}
//               onChange={(e) => setMinPrice(parseFloat(e.target.value))}
//               min={0}
//               max={10000}
//               step={1}
//               tooltipLabel={(value) => `$${value}`}
//             />
//             <RangeSlider
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
//               min={0}
//               max={10000}
//               step={1}
//               tooltipLabel={(value) => `$${value}`}
//               className="mt-2"
//             />
//             <div className="d-flex justify-content-between mt-2">
//               <span>${minPrice}</span>
//               <span>${maxPrice}</span>
//             </div>
//           </div>
//           <div className="mb-4">
//             <h5>Rating</h5>
//             {[4, 3, 2].map((rating) => (
//               <ListGroup.Item key={rating} className="d-flex align-items-center">
//                 <input
//                   type="radio"
//                   checked={selectedRating === rating}
//                   onChange={() => setSelectedRating(rating)}
//                   className="me-2"
//                 />
//                 {rating} stars and above
//               </ListGroup.Item>
//             ))}
//             <ListGroup.Item key="any-rating" className="d-flex align-items-center">
//               <input
//                 type="radio"
//                 checked={selectedRating === 0}
//                 onChange={() => setSelectedRating(0)}
//                 className="me-2"
//               />
//               Any
//             </ListGroup.Item>
//           </div>
//         </Col>
//         <Col md={9}>
//           <Row>
//             {currentProducts.map((product) => (
//               <Col md={6} lg={4} className="mb-4" key={product._id}>
//                 <Card className="h-100 shadow-sm">
//                   <Card.Img
//                     variant="top"
//                     src={product.photo || "https://via.placeholder.com/300x200?text=No+Image"}
//                     alt={product.productName}
//                     className="p-3"
//                     style={{ height: "200px", objectFit: "contain" }}
//                   />
//                   <Card.Body className="d-flex flex-column">
//                     <Card.Title className="text-truncate">{product.productName}</Card.Title>
//                     <Card.Text className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
//                       {product.description.length > 100
//                         ? product.description.substring(0, 100) + "..."
//                         : product.description}
//                     </Card.Text>
//                     <div className="d-flex justify-content-between align-items-center mt-auto">
//                       <Badge bg="primary">{product.ratingsAvg.toFixed(1)} Stars</Badge>
//                       <div className="text-lg font-weight-bold">${product.price.toFixed(2)}</div>
//                     </div>
//                     <Button 
//                       variant="primary" 
//                       className="mt-2 w-100"
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       <i className="bi bi-cart-fill me-2"></i>Add to Cart
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//           {totalPages > 1 && (
//             <Pagination className="justify-content-center mt-4">
//               <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
//               <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
//               {[...Array(totalPages).keys()].map(page => (
//                 <Pagination.Item
//                   key={page + 1}
//                   active={page + 1 === currentPage}
//                   onClick={() => handlePageChange(page + 1)}
//                 >
//                   {page + 1}
//                 </Pagination.Item>
//               ))}
//               <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
//               <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
//             </Pagination>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// }
// ProductList.js
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { InputGroup, FormControl, Card, ListGroup, Badge, Spinner, Container, Row, Col, Pagination, Button } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/react/products");
        const productsArray = response.data[1]?.products || [];
        const uniqueCategories = [...new Set(productsArray.map(product => product.category))];
        setProducts(productsArray);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      setCart(cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1, animate: true } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, animate: true }]);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(product.category);
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesRating = product.ratingsAvg >= selectedRating;
      const isAvailable = product.is_available;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && isAvailable;
    });
  }, [searchTerm, selectedCategory, minPrice, maxPrice, selectedRating, products]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;
  if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;
  if (filteredProducts.length === 0 && !loading) return <p className="text-center mt-5">No products found.</p>;

  return (
    <Container className="mt-5">
      <header className="mb-4">
        <h1 className="text-center mb-4">Product Showcase</h1>
        <InputGroup className="mb-4">
          <FormControl
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </header>
      <Row>
        <Col md={3}>
          <div className="mb-4">
            <h5>Category</h5>
            <ListGroup>
              {categories.map((category, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes(category)}
                    onChange={() => {
                      setSelectedCategory((prev) =>
                        prev.includes(category)
                          ? prev.filter((c) => c !== category)
                          : [...prev, category]
                      );
                    }}
                    className="me-2"
                  />
                  {category}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="mb-4">
            <h5>Price Range</h5>
            <RangeSlider
              value={minPrice}
              onChange={(e) => setMinPrice(parseFloat(e.target.value))}
              min={0}
              max={10000}
              step={1}
              tooltipLabel={(value) => `$${value}`}
            />
            <RangeSlider
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
              min={0}
              max={10000}
              step={1}
              tooltipLabel={(value) => `$${value}`}
              className="mt-2"
            />
            <div className="d-flex justify-content-between mt-2">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>
          <div className="mb-4">
            <h5>Rating</h5>
            {[4, 3, 2].map((rating) => (
              <ListGroup.Item key={rating} className="d-flex align-items-center">
                <input
                  type="radio"
                  checked={selectedRating === rating}
                  onChange={() => setSelectedRating(rating)}
                  className="me-2"
                />
                {rating} stars and above
              </ListGroup.Item>
            ))}
            <ListGroup.Item key="any-rating" className="d-flex align-items-center">
              <input
                type="radio"
                checked={selectedRating === 0}
                onChange={() => setSelectedRating(0)}
                className="me-2"
              />
              Any
            </ListGroup.Item>
          </div>
        </Col>
        <Col md={9}>
          <Row>
            {currentProducts.map((product) => (
              <Col md={6} lg={4} className="mb-4" key={product._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={product.photo || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={product.productName}
                    className="p-3"
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-truncate">{product.productName}</Card.Title>
                    <Card.Text className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
                      {product.description.length > 100
                        ? product.description.substring(0, 100) + "..."
                        : product.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <Badge bg="primary">{product.ratingsAvg.toFixed(1)} Stars</Badge>
                      <div className="text-lg font-weight-bold">${product.price.toFixed(2)}</div>
                    </div>
                    <Button 
                      variant="primary" 
                      className="mt-2 w-100"
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className="bi bi-cart-fill me-2"></i>Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
              {[...Array(totalPages).keys()].map(page => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
          )}
        </Col>
      </Row>
    </Container>
  );
}
