// import React, { useEffect, useMemo, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchProducts } from "../redux/slices/productSlice.js";
// import { toggleFavorite } from "../redux/slices/favoriteSlice.js";
// import { setPage } from "../redux/slices/paginationSlice.js";
// import {
//   InputGroup,
//   FormControl,
//   Card,
//   ListGroup,

//   Spinner,
//   Container,
//   Row,
//   Col,
//   Pagination,
//   Button,
// } from "react-bootstrap";
// import RangeSlider from "react-bootstrap-range-slider";
// import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";

// export default function ProductList() {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.items);
//   const favorites = useSelector((state) => state.favorites);
//   const currentPage = useSelector((state) => state.pagination.currentPage);
//   const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);
//   const loading = useSelector((state) => state.products.status === "loading");
//   const error = useSelector((state) => state.products.error);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState([]);
//   const [minPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(10000);
//   const [selectedRating, setSelectedRating] = useState(0);

//   const navigate = useNavigate();

//   const handleDetails = (id) => {
//     navigate(`/details/${id}`);
//   };

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     const uniqueCategories = [
//       ...new Set(products.map((product) => product.category)),
//     ];
//     setCategories(uniqueCategories);
//   }, [products]);

//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const matchesSearch =
//         product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory =
//         selectedCategory.length === 0 ||
//         selectedCategory.includes(product.category);
//       const matchesPrice =
//         product.price >= minPrice && product.price <= maxPrice;
//       const matchesRating = product.ratingsAvg >= selectedRating;
//       const isAvailable = product.is_available;
//       return (
//         matchesSearch &&
//         matchesCategory &&
//         matchesPrice &&
//         matchesRating &&
//         isAvailable
//       );
//     });
//   }, [
//     searchTerm,
//     selectedCategory,
//     minPrice,
//     maxPrice,
//     selectedRating,
//     products,
//   ]);

//   const indexOfLastProduct = currentPage * itemsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
//   const currentProducts = filteredProducts.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => dispatch(setPage(pageNumber));

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

//   if (loading)
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   if (error)
//     return <p className="text-danger text-center mt-5">Error: {error}</p>;
//   if (filteredProducts.length === 0 && !loading)
//     return <p className="text-center mt-5">No products found.</p>;

//   return (
//     <Container className="mt-5">
//       <header className="mb-4">
//         <h1 className="text-center mb-4" style={{ color: "#4CAF50" }}>
//           Product Showcase
//         </h1>
//         <InputGroup className="mb-4">
//           <FormControl
//             type="search"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ borderColor: "#4CAF50" }}
//           />
//         </InputGroup>
//       </header>
//       <Row>
//         <Col md={3}>
//           <div className="mb-4">
//             <h5 style={{ color: "#333333" }}>Category</h5>
//             <ListGroup>
//               {categories.map((category, index) => (
//                 <ListGroup.Item
//                   key={index}
//                   className="d-flex align-items-center"
//                 >
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
//             <h5 style={{ color: "#333333" }}>Price Range</h5>
//             <RangeSlider
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(Number(e.target.value))}
//               min={0}
//               max={10000}
//               tooltip="auto"
//               tooltipPlacement="top"
//               style={{ borderColor: "#4CAF50" }}
//             />
//             <div className="d-flex justify-content-between mt-2">
//               <span style={{ color: "#333333" }}>0</span>
//               <span style={{ color: "#333333" }}>10000</span>
//             </div>
//           </div>
//           <div className="mb-4">
//             <h5 style={{ color: "#333333" }}>Rating</h5>
//             <div className="d-flex align-items-center">
//               {[...Array(5)].map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedRating(index + 1)}
//                   className="btn btn-link p-0 me-1"
//                   style={{
//                     color: index < selectedRating ? "#FFC107" : "#E4E5E9",
//                   }}
//                 >
//                   <BsStarFill size={20} />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </Col>
//         <Col md={9}>
//           <Row>
//             {currentProducts.map((product) => (
//               <Col key={product._id} md={6} lg={4} className="mb-4">
//                 <Card className="h-100 shadow-sm ">
//                   <Card.Img
//                     onClick={() => handleDetails(product._id)}
//                     className="p-3 cursor-pointer card-img-top d-block "
//                     variant="top"
//                     src={
//                       `http://localhost:5000/${product.photo}` ||
//                       "https://via.placeholder.com/300x200?text=No+Image"
//                     }
//                     alt={product.productName}
//                     style={{ height: "200px", objectFit: "contain"  }}


//                   />
//                   <Card.Body>
//                     <Card.Title>{product.productName}</Card.Title>
//                     {/* <Card.Text>{product.description}</Card.Text> */}
//                     <ListGroup
//                       variant="flush"
//                       className="mb-2 mt-2 text-center"
//                     >
//                       <ListGroup.Item>
//                         Price:{" "}
//                         <span style={{ color: "#4CAF50" }} className="fw-bold">
//                           {product.price}$
//                         </span>
//                       </ListGroup.Item>
//                       <ListGroup.Item>
//                         Rating: {renderStars(product.ratingsAvg)}
//                       </ListGroup.Item>
//                       <ListGroup.Item>
//                         <button
//                           onClick={() => dispatch(toggleFavorite(product))}
//                           className="btn btn-link p-0 me-1 text-decoration-none text-dark text-center "
//                         >
//                           {favorites.some(
//                             (item) => item._id === product._id
//                           ) ? (
//                             <AiFillHeart size={24} color="red" />
//                           ) : (
//                             <AiOutlineHeart size={24} />
//                           )}
//                         </button>
//                       </ListGroup.Item>
//                     </ListGroup>
//                     <Button
//                       variant="dark"
//                       className="w-100"
//                       onClick={() => {
//                         let cart =
//                           JSON.parse(localStorage.getItem("cart")) || [];
//                         cart.push(product);
//                         localStorage.setItem("cart", JSON.stringify(cart));
//                         alert("Product added to cart!");
//                       }}
//                     >
//                       Add to Cart
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//           <Pagination className="mt-4 justify-content-center">
//             {[...Array(totalPages)].map((_, index) => (
//               <Pagination.Item
//                 key={index}
//                 active={index + 1 === currentPage}
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </Pagination.Item>
//             ))}
//           </Pagination>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice.js";
import { toggleFavorite } from "../redux/slices/favoriteSlice.js";
import { setPage } from "../redux/slices/paginationSlice.js";
import {
  InputGroup,
  FormControl,
  Card,
  ListGroup,
  Spinner,
  Container,
  Row,
  Col,
  Pagination,
  Button,
  OverlayTrigger,
  Tooltip,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { AiOutlineHeart, AiFillHeart, AiOutlineCloseCircle } from "react-icons/ai";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const favorites = useSelector((state) => state.favorites);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);
  const loading = useSelector((state) => state.products.status === "loading");
  const error = useSelector((state) => state.products.error);

  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [minPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedRating, setSelectedRating] = useState(0);

  const navigate = useNavigate();

  const handleDetails = useCallback((id) => {
    navigate(`/details/${id}`);
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    setCategories(uniqueCategories);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory.length === 0 ||
        selectedCategory.includes(product.category);
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;
      const matchesRating = product.ratingsAvg >= selectedRating;
      const isAvailable = product.is_available;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating &&
        isAvailable
      );
    });
  }, [
    searchTerm,
    selectedCategory,
    minPrice,
    maxPrice,
    selectedRating,
    products,
  ]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => dispatch(setPage(pageNumber));

  const renderStars = useCallback((rating) => {
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
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  if (error)
    return <p className="text-danger text-center mt-5">Error: {error}</p>;
  if (filteredProducts.length === 0 && !loading)
    return <p className="text-center mt-5">No products found.</p>;

  return (
    <Container className="mt-5">
      <header className="mb-4">
        <h1 className="text-center mb-4" style={{ color: "#4CAF50" }}>
          Product Showcase
        </h1>
        <InputGroup className="mb-4">
          <FormControl
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderColor: "#4CAF50",
              borderRadius: "30px",
              padding: "10px 20px",
            }}
            aria-label="Search products"
          />
          {searchTerm && (
            <Button
              variant="outline-secondary"
              className="position-absolute end-0 top-0 mt-2 me-2"
              onClick={() => setSearchTerm("")}
              style={{
                borderRadius: "50%",
                padding: "0.25rem",
                background: "transparent",
                border: "none",
              }}
            >
              <AiOutlineCloseCircle size={20} />
            </Button>
          )}
        </InputGroup>
      </header>
      <Row>
        <Col md={3}>
          <div className="mb-4">
            <h5 style={{ color: "#333333" }}>Category</h5>
            <DropdownButton
              id="category-dropdown"
              title={
                selectedCategory.length > 0
                  ? `Selected: ${selectedCategory.join(", ")}`
                  : "Select Category"
              }
              variant="outline-success"
              className="w-100"
            >
              {categories.map((category, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() =>
                    setSelectedCategory((prev) =>
                      prev.includes(category)
                        ? prev.filter((c) => c !== category)
                        : [...prev, category]
                    )
                  }
                  active={selectedCategory.includes(category)}
                >
                  {category}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          <div className="mb-4">
            <h5 style={{ color: "#333333" }}>Price Range</h5>
            <RangeSlider
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              min={0}
              max={10000}
              tooltip="auto"
              tooltipPlacement="top"
              style={{ borderColor: "#4CAF50" }}
              aria-label="Select price range"
            />
            <div className="d-flex justify-content-between mt-2">
              <span style={{ color: "#333333" }}>0</span>
              <span style={{ color: "#333333" }}>10000</span>
            </div>
          </div>
          <div className="mb-4">
            <h5 style={{ color: "#333333" }}>Rating</h5>
            <div className="d-flex align-items-center">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedRating(index + 1)}
                  className="btn btn-link p-0 me-1"
                  style={{
                    color: index < selectedRating ? "#FFC107" : "#E4E5E9",
                  }}
                  aria-label={`Select ${index + 1} star rating`}
                >
                  <BsStarFill size={20} />
                </button>
              ))}
            </div>
          </div>
        </Col>
        <Col md={9}>
          {/* <Row>
            {currentProducts.map((product) => (
              <Col key={product._id} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <div className="card-img-container position-relative overflow-hidden ">
                    <Card.Img
                      onClick={() => handleDetails(product._id)}
                      className=" cursor-pointer"
                      variant="top"
                      src={
                        //  "https://placehold.co/600x400/orange/white"
                        product.photo
                           ? `http://localhost:5000/${product.photo}`
                           : "https://placehold.co/600x400/orange/white"
                      }
                      alt={product.productName}
                      style={{ height: "200px" }}
                      aria-label={`View details for ${product.productName}`}
                    />
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Add to Favorites</Tooltip>}


                    >
                      <button
                        onClick={() => dispatch(toggleFavorite(product))}
                        className="position-absolute top-0 end-0 m-2 p-1 border-0 bg-transparent cursor-pointer text-danger"
                        aria-label="Toggle favorite"
                      >
                        {favorites.some(
                          (item) => item._id === product._id
                        ) ? (
                          <AiFillHeart size={28} color="red" />
                        ) : (
                          <AiOutlineHeart size={28} color="white" />
                        )}
                      </button>
                    </OverlayTrigger>
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="text-truncate">
                      {product.productName}
                    </Card.Title>
                    <ListGroup variant="flush" className="mb-3">
                      <ListGroup.Item className="border-0 p-0">
                        <span
                          bg={
                            product.price < 50
                              ? "success"
                              : product.price < 200
                              ? "warning"
                              : "danger"
                          }

                          className="me-2 fs-4 fw-bold bg-light p-2 rounded-3 d-inline-block text-success"
                        >
                          ${product.price}
                        </span>
                        <span className="text-muted">Rating:</span>{" "}
                        {renderStars(product.ratingsAvg)}
                      </ListGroup.Item>
                    </ListGroup>
                    <Button
                      variant="outline-success"
                      className="w-100 mt-auto"
                      onClick={() => {
                        let cart =
                          JSON.parse(localStorage.getItem("cart")) || [];
                        cart.push(product);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        alert("Product added to cart!");
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row> */}
            <Row>
      {currentProducts.map((product) => (
        <Col key={product._id} md={6} lg={4} className="mb-4">
          <Card className="h-100 shadow-sm border-0">
            <div className="card-img-container position-relative overflow-hidden">
              <Card.Img
                onClick={() => handleDetails(product._id)}
                className="cursor-pointer"
                variant="top"
                src={
                  product.photo
                    ? `http://localhost:5000/${product.photo}`
                    : "https://placehold.co/600x400/orange/white"
                }
                alt={product.productName}
                style={{ height: "200px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = "https://placehold.co/600x400/orange/white"; // Fallback image
                }}
                aria-label={`View details for ${product.productName}`}
              />
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Add to Favorites</Tooltip>}
              >
                <button
                  onClick={() => dispatch(toggleFavorite(product))}
                  className="position-absolute top-0 end-0 m-2 p-1 border-0 bg-transparent cursor-pointer text-danger"
                  aria-label="Toggle favorite"
                >
                  {favorites.some((item) => item._id === product._id) ? (
                    <AiFillHeart size={28} color="red" />
                  ) : (
                    <AiOutlineHeart size={28} color="white" />
                  )}
                </button>
              </OverlayTrigger>
            </div>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="text-truncate">{product.productName}</Card.Title>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item className="border-0 p-0">
                  <span
                    className={`me-2 fs-4 fw-bold ${
                      product.price < 50
                        ? "text-success"
                        : product.price < 200
                        ? "text-warning"
                        : "text-danger"
                    }`}
                  >
                    ${product.price}
                  </span>
                  <span className="text-muted">Rating:</span>{" "}
                  {renderStars(product.ratingsAvg)}
                </ListGroup.Item>
              </ListGroup>
              <Button
                variant="outline-success"
                className="w-100 mt-auto"
                onClick={() => {
                  let cart = JSON.parse(localStorage.getItem("cart")) || [];
                  cart.push(product);
                  localStorage.setItem("cart", JSON.stringify(cart));
                  alert("Product added to cart!");
                }}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
          <Pagination className="mt-4 justify-content-center">
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}
