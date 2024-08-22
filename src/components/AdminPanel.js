import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Form, ListGroup, Modal, Row, Badge } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/react/products");
        if (response.data && response.data[1]?.products) {
          setProducts(response.data[1]?.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    })();
  }, []);

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", selectedProduct.productName);
    formData.append("price", selectedProduct.price);
    formData.append("description", selectedProduct.description);
    formData.append("category", selectedProduct.category);

    if (file) {
      formData.append("photo", file);
    }

    try {
      await axios.patch(`http://localhost:5000/api/v1/react/products/${selectedProduct.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product updated successfully!");
      setShowUpdateModal(false);
      // Refresh products after update
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id ? { ...product, ...selectedProduct } : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  const handleUpdate = (id) => {
    const product = products.find((product) => product.id === id);
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handleDelete = async (id) => {
    try {
      toast((t) => (
        <span>
          Are you sure you want to delete this product?
          <Button variant="danger" onClick={async () => {
            try {
              await axios.delete(`http://localhost:5000/api/v1/react/products/${id}`);
              setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
              toast.dismiss(t.id);
              toast.success("Product deleted successfully!");
            } catch (error) {
              console.error("Error deleting product:", error);
              toast.dismiss(t.id);
              toast.error("Failed to delete product.");
            }
          }}>
            Confirm
          </Button>
        </span>
      ));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Toaster />
      <Row>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <Col key={`${product.id}-${index}`} md={6} lg={4} className="mb-3">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.photo}
                  alt={product.productName}
                  style={{ cursor: "pointer", width: "100%", height: "200px", objectFit: "contain" }}
                />
                <Card.Body className="d-flex flex-column">
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
                      Rating:{" "}
                      <span className="ms-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} color={i < product.ratingsAvg ? "gold" : "lightgray"} />
                        ))}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                  <div className="mt-auto d-flex justify-content-between">
                    <Button variant="primary" onClick={() => handleUpdate(product.id)}>
                      <FaEdit className="me-2" /> Update
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(product.id)}>
                      <FaTrash className="me-2" /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </Row>

      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={selectedProduct?.productName || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    productName: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={selectedProduct?.price || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={selectedProduct?.description || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={selectedProduct?.category || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="photo">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
