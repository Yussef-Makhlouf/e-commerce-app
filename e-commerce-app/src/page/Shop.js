import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice.js";
import { toggleFavorite } from "../redux/slices/favoriteSlice.js";
import { setPage } from "../redux/slices/paginationSlice.js";
import {
  InputGroup,
  FormControl,
  Card,
  ListGroup,
  Badge,
  Spinner,
  Container,
  Row,
  Col,
  Pagination,
  Button,
} from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedRating, setSelectedRating] = useState(0);

  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

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
            style={{ borderColor: "#4CAF50" }}
          />
        </InputGroup>
      </header>
      <Row>
        <Col md={3}>
          <div className="mb-4">
            <h5 style={{ color: "#333333" }}>Category</h5>
            <ListGroup>
              {categories.map((category, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex align-items-center"
                >
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
            <h5 style={{ color: "#333333" }}>Price Range</h5>
            <RangeSlider
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              min={0}
              max={10000}
              tooltip="auto"
              tooltipPlacement="top"
              style={{ borderColor: "#4CAF50" }}
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
                >
                  <BsStarFill size={20} />
                </button>
              ))}
            </div>
          </div>
        </Col>
        <Col md={9}>
          <Row>
            {currentProducts.map((product) => (
              <Col key={product._id} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.productName}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDetails(product._id)}
                  />
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
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
                      <ListGroup.Item>
                        <button
                          onClick={() => dispatch(toggleFavorite(product))}
                          className="btn btn-link p-0"
                        >
                          {favorites.some(
                            (item) => item._id === product._id
                          ) ? (
                            <AiFillHeart size={24} color="red" />
                          ) : (
                            <AiOutlineHeart size={24} />
                          )}
                        </button>
                      </ListGroup.Item>
                    </ListGroup>
                    <Button
                      variant="primary"
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
