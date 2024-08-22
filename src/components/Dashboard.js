

import React, { useState} from "react";
import axios from "axios";
import {

  Button,

  Container,
  Modal,
  Form,

} from "react-bootstrap";
import AdminPanel from "./AdminPanel";
// import { useSelector} from "react-redux";

// const allProducts = useSelector((state) => state.products.items);
function Dashboard(props) {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);

  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: "",
    description: "",

    category: "",
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFile(e.target.files[0]);
    } else {
      setNewProduct({
        ...newProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  //create one product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", newProduct.productName);
    formData.append("price", newProduct.price);
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category);

    if (file) {
      formData.append("photo", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/react/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setProducts([...products, response.data]); // Update state with the new product

      handleClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  // if (loading) {
  //   return <Spinner animation="border" />;
  // }

  return (
    <>
      <Container >
      <div className="d-flex justify-content-center ">
      <Button variant="primary " onClick={handleShow} className=" my-5 w-50">
          Add Product
        </Button>
      </div>
      {/* Admin Panel  body*/}
        <AdminPanel />
      {/* Pop up Form body*/}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={newProduct.productName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="photo">
                <Form.Label>Photo </Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  value={newProduct.photo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3 w-100 ">
                Add Product
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Dashboard;
