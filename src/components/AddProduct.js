import { createRef, useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import Input from "./InputComponent";
import { InputGroup, FormControl, Button, Card, ListGroup, Badge, Spinner, Container, Row, Col, Pagination } from "react-bootstrap";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import Dashboard from "./Dashboard";
function AddProduct() {
 
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description:"",
    photo: "",
    category:""

  });
//  const[fill,setFill]=useState(null)
  const [errors, setErrors] = useState({
    productNameError: "",
    priceError: "",
    descriptionError:"",
    photoError: "",
    categoryError:""
  });
// const upload=async (file)=>{
//     const data=new FormData();
//     data.append("file",file);
//     data.append("upload_preset","uplouds")
//     try{
//        const res=await axios.post("http://localhost:5000/api/v1/react/products",data)
//     }catch(err){
//         console.log(err)
//     }
// }
 const handleForm = (e) => {
        if (e.target.name==="productName" ) {
            setProduct({ ...product, productName:
            e.target.value, }); 
            setErrors({
            ...errors, 
            productNameError: e.target.value.length===0 
            ? "Please, this field is required"
             : ""  });
            } 
        else if (e.target.name==="price" ) {
                setProduct({ ...product, price: e.target.value, });
                setErrors({ ...errors, priceError: e.target.value.length===0
                ? "Please, this field is required" 
                :e.target.value<1
                ?"invalid price"
                :"" }); 
            } 
            else if (e.target.name==="category" ) {
                setProduct({ ...product, category: e.target.value, });
                setErrors({ ...errors, categoryError:
                    e.target.value.length===0
                    ? "Please, this field is required" 
                    : "" ,}); 
            } 
            else if (e.target.name==="description" ) {
                setProduct({ ...product, description: e.target.value, });
                setErrors({ ...errors, descriptionError:
                    e.target.value.length===0
                    ? "Please, this field is required" 
                    : "" ,}); 
            } 
            
            // else if (e.target.name==="photo" ) {
            //     setProduct({ ...product, photo: e.target.value, });
            //     setErrors({ ...errors, photoError:
            //         e.target.value.length===0
            //         ? "Please, this field is required" 
            //         : "" ,}); 
            // } 
  };
const navigate=useNavigate()
const fileInput=createRef()


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!errors.productNameError && !errors.priceError && !errors.categoryError && !errors.descriptionError && !errors.photoError) {
      const formData = new FormData();
      formData.append("photo", fileInput.current.files[0]);
      
      formData.append("productName", product.productName);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("category", product.category);
      try {
          const response = await fetch('/products', {
              method: "POST",
              body: formData
          });

          const parsedResponse = await response.json();
          if (response.ok) {
              alert("Product uploaded successfully");
          } else {
              console.error("Error uploading product");
          }
      } catch (err) {
          console.error(err.message);
      }
  } else {
      setErrors({ ...errors });
  }
};


 /* const handleSubmit= async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.set("photo",fileInput.current.value)
    if (!errors.productNameError && !errors.priceError&& !errors.categoryError && !errors.descriptionError&& !errors.photoError ) {
        console.log(product)
        try{
          const response=await fetch('/products',{
            method:"POST",
            body:formData

        })
  //const res=await myAxios.post("products",product)

  const parsedResponse=await response.json()
  if(response.ok){
    alert("uploaded")
  }else{
    console.error("error can' t upload")
  }
 
    }
    catch(err){
      console.error(err.message)
    }
  }else{
    setErrors({...errors})
  }*/
    const bg={ background: 'linear-gradient(to right, #1f8f8f, rgb(72, 105, 109))'
    ,height: "100vh"
    };
  return (
 <>
    <div className="container-fluid bg" style={bg}>
        <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 bg-white divform" style={{ borderRadius: "10px"}}>
                <form onSubmit={(e)=>handleSubmit(e)} >
                    <Input id="productName" handleForm={(e)=>handleForm(e)} value={product.productName} label="Product Name"  inputErrors={errors.productNameError}/>
                    <Input id="price" type="number"handleForm={(e)=>handleForm(e)} value={product.price} label="price"  inputErrors={errors.priceError}/>

                    <Input id="category" type="dropdown" handleForm={(e)=>handleForm(e)} value={product.category} label="Category"  inputErrors={errors.categoryError}/>
                    <Input 
                    id="photo"
                     type="file" 
                     //handleForm={(e)=>setFill(e.target.fill[0])}
                     value={product.photo} 
                     label="Photo"
                      ref={fileInput}
                       inputErrors={errors.photoError}/>
                    <Input id="description"type="textarea" handleForm={(e)=>handleForm(e)} value={product.description} label="Description"  inputErrors={errors.descriptionError}/>

                     
                 
                    {/* <div id="Div" className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input type="text" name="productName" id="productName" className={`form-control ${errors.productNameError
                            && "border-danger" }`} value={product.productName} placeholder="Enter product name please"
                            onChange={(e)=> handleForm(e)}/>
                        {errors.productNameError && <p className="text-danger">{errors.productNameError}</p>}
                    </div> */}
                    <button id="registerBtn" style={{
                    width: "100%",  
                    backgroundColor:"#1f8f8f" , 
                    border: "none", 
                    borderRadius:"10px" }}  disabled={errors.productNameError || errors.priceError||errors.categoryError||errors.descriptionError||errors.photoError}
                        type="submit" className="btn btn-primary btn-block"> Add Product </button>
                        
                        <div><br/></div>
                </form>
                
            </div>
        </div>
    </div>
    <br/>
    <hr/>
    <Dashboard/>
    </>
    ) 
   }
  
   export default AddProduct;
{/* 
<Row>
{currentProducts.map((product) => (
  <Col md={6} lg={4} className="mb-4" key={product._id}>
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.photo || "https://via.placeholder.com/300x200?text=No+Image"} // Placeholder image
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
        <Button variant="primary" className="mt-2 w-100">Buy Now</Button>
      </Card.Body>
    </Card>
  </Col>
))}
</Row> */}
// </>
  // )

// /**
// <div id="adminProduct">
//   <img src={product.photo} alt="image" id="imgItem" />
//   <h3 id="nameItem">
//     product.productName
//   </h3>
//   <p id="priceItem">
//     product.price
//   </p>
//   <div className="crudBtnsDiv">
//     <button
//       id="update"
//       className="crudBtn"
//       onclick="updateProduct('${list[i].id}')"
//     >
//       update
//     </button>
//     <button
//       id="delete"
//       className="crudBtn"
//       onclick="deleteProduct('${list[i].id}')"
//     >
//       delete
//     </button>
//   </div>
// </div>

//  */
// import React from 'react';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App(){
//   const notify = () => toast("Wow so easy!");

//   return (
//     <div>
//       <button onClick={notify}>Notify!</button>
//       <ToastContainer />
//     </div>
//   );
