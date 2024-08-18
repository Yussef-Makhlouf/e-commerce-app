import React, { useState, useEffect,createRef } from "react";
import axios from "axios";
import {
      Table,
      Button,
      Spinner,
      Container,
      Modal,
      Form,
      Row,
      Col,
    } from "react-bootstrap";
import ProductPhoto from "./productPhoto"
import { useSelector} from "react-redux";

// const allProducts = useSelector((state) => state.products.items);
    function Dashboard(props) {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [show, setShow] = useState(false);
      const [file,setFile]=useState(null)

      const [newProduct, setNewProduct] = useState({
        productName: "",
        price: "",
        description: "",
      
        category: "",
      
      });
    
  
      useEffect(() => {
        fetchProducts();
      }, []);
    
      const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/v1/react/products");
          setProducts(response.data);
        
          setLoading(false);
        } catch (error) {
          console.error("Error fetching products:", error);
          setLoading(false);
        }
      };
      
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
    
      const handleUpdate=()=>{
            
      }
      const handleDelete=()=>{
        
      }
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
        
          // formData.append("photo", fileInput.current.files[0]);
          const response = await axios.post("http://localhost:5000/api/v1/react/products",formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response.data)
          setProducts([...products, response.data]); // Update state with the new product
        
          handleClose(); // Close the modal after submission
        } catch (error) {
          console.error("Error adding new product:", error);
        }
      };
    
      if (loading) {
        return <Spinner animation="border" />;
      }
    
      return (
        <Container>
          <Button variant="primary" onClick={handleShow}>
            Add Product
          </Button>
    
          <Table striped bordered hover>
            <thead>
              <tr>
              
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Product Photo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>  <img src={product.photo} alt={product.name} style={{ width: '100%', height: 'auto' }} /></td>
                  <td><button className="btn btn-info" onClick={handleUpdate}>Edite</button><button className="btn btn-danger" onClick={handleDelete}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </Table>
    
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
    
            
               
              
    
                <Button variant="primary" type="submit">
                  Add Product
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      );
    };
    
    // return (
    //     <div>

            
    //     </div>
    // );
// }

export default Dashboard;