// // src/components/ProductList.js
// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { InputGroup, FormControl, Button, Card, ListGroup, Badge } from "react-bootstrap";
// import RangeSlider from 'react-bootstrap-range-slider';
// import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState([]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://fakestoreapi.com/products");
//         console.log("Fetched Products:", response.data); // Debugging: log the fetched data
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err.message); // Debugging: log the error
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const matchesSearch =
//         product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory =
//         selectedCategory.length === 0 || selectedCategory.includes(product.category);
//       const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
//       const matchesRating = product.rating >= selectedRating;
//       return matchesSearch && matchesCategory && matchesPrice && matchesRating;
//     });
//   }, [searchTerm, selectedCategory, minPrice, maxPrice, selectedRating, products]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="container mt-5">
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
//       <div className="row">
//         <div className="col-md-3">
//           <div className="mb-4">
//             <h5>Category</h5>
//             <ListGroup>
//               {["Electronics", "Bags", "Home & Kitchen", "Sports & Outdoors", "Accessories"].map((category) => (
//                 <ListGroup.Item key={category}>
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
//               max={1000}
//               step={1}
//               tooltipLabel={(value) => `$${value}`}
//             />
//             <RangeSlider
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
//               min={0}
//               max={1000}
//               step={1}
//               tooltipLabel={(value) => `$${value}`}
//             />
//             <div className="d-flex justify-content-between">
//               <span>${minPrice}</span>
//               <span>${maxPrice}</span>
//             </div>
//           </div>
//           <div className="mb-4">
//             <h5>Rating</h5>
//             {[4, 3, 2].map((rating) => (
//               <ListGroup.Item key={rating}>
//                 <input
//                   type="radio"
//                   checked={selectedRating === rating}
//                   onChange={() => setSelectedRating(rating)}
//                 />
//                 {rating} stars and above
//               </ListGroup.Item>
//             ))}
//             <ListGroup.Item>
//               <input
//                 type="radio"
//                 checked={selectedRating === 0}
//                 onChange={() => setSelectedRating(0)}
//               />
//               Any
//             </ListGroup.Item>
//           </div>
//         </div>
//         <div className="col-md-9">
//           <div className="row">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <div key={product.id} className="col-md-4 mb-4">
//                   <Card>
//                     <Card.Img variant="top" src={product.image} alt={product.title} />
//                     <Card.Body>
//                       <Card.Title>{product.title}</Card.Title>
//                       <Card.Text>
//                         {product.description}
//                       </Card.Text>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                           <Badge bg="primary">{product.rating.toFixed(1)} Stars</Badge>
//                         </div>
//                         <div className="text-lg font-weight-bold">${product.price.toFixed(2)}</div>
//                       </div>
//                       <Button variant="primary" className="mt-2 w-100">Buy Now</Button>
//                     </Card.Body>
//                   </Card>
//                 </div>
//               ))
//             ) : (
//               <p>No products found</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// src/components/ProductList.js
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { InputGroup, FormControl, Button, Card, ListGroup, Badge } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log("API Response:", response.data); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err.message); 
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory.length === 0 || selectedCategory.includes(product.category);
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesRating = product.rating >= selectedRating;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [searchTerm, selectedCategory, minPrice, maxPrice, selectedRating, products]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
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
      <div className="row">
        <div className="col-md-3">
          <div className="mb-4">
            <h5>Category</h5>
            <ListGroup>
              {["Electronics", "Bags", "Home & Kitchen", "Sports & Outdoors", "Accessories"].map((category) => (
                <ListGroup.Item key={category}>
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
              max={1000}
              step={1}
              tooltipLabel={(value) => `$${value}`}
            />
            <RangeSlider
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
              min={0}
              max={1000}
              step={1}
              tooltipLabel={(value) => `$${value}`}
            />
            <div className="d-flex justify-content-between">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>
          <div className="mb-4">
            <h5>Rating</h5>
            {[4, 3, 2].map((rating) => (
              <ListGroup.Item key={rating}>
                <input
                  type="radio"
                  checked={selectedRating === rating}
                  onChange={() => setSelectedRating(rating)}
                />
                {rating} stars and above
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <input
                type="radio"
                checked={selectedRating === 0}
                onChange={() => setSelectedRating(0)}
              />
              Any
            </ListGroup.Item>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <Card>
                  <Card.Img variant="top" src={product.image} alt={product.title} />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Badge bg="primary">{product.rating.toFixed(1)} Stars</Badge>
                      </div>
                      <div className="text-lg font-weight-bold">${product.price.toFixed(2)}</div>
                    </div>
                    <Button variant="primary" className="mt-2 w-100">Buy Now</Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// // src/components/ProductList.js
// import { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import { InputGroup, FormControl, Button, Card, ListGroup, Badge } from "react-bootstrap";
// import RangeSlider from 'react-bootstrap-range-slider';
// import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState([]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [selectedRating, setSelectedRating] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://fakestoreapi.com/products");
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const matchesSearch =
//         product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory =
//         selectedCategory.length === 0 || selectedCategory.includes(product.category);
//       const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
//       const matchesRating = product.rating >= selectedRating;
//       return matchesSearch && matchesCategory && matchesPrice && matchesRating;
//     });
//   }, [searchTerm, selectedCategory, minPrice, maxPrice, selectedRating, products]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="container mt-5">
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
//       <div className="row">
//         <div className="col-md-3">
//           <div className="mb-4">
//             <h5>Category</h5>
//             <ListGroup>
//               {["Electronics", "Bags", "Home & Kitchen", "Sports & Outdoors", "Accessories"].map((category) => (
//                 <ListGroup.Item key={category}>
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
//               max={1000}
//               step={1}
//               tooltipLabel={(value) => `$${value}`}
//             />
//             <RangeSlider
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
//               min={0}
//               max={1000}
//               step={1}
//               tooltipLabel={(value) => `$${value}`}
//             />
//             <div className="d-flex justify-content-between">
//               <span>${minPrice}</span>
//               <span>${maxPrice}</span>
//             </div>
//           </div>
//           <div className="mb-4">
//             <h5>Rating</h5>
//             {[4, 3, 2].map((rating) => (
//               <ListGroup.Item key={rating}>
//                 <input
//                   type="radio"
//                   checked={selectedRating === rating}
//                   onChange={() => setSelectedRating(rating)}
//                 />
//                 {rating} stars and above
//               </ListGroup.Item>
//             ))}
//             <ListGroup.Item>
//               <input
//                 type="radio"
//                 checked={selectedRating === 0}
//                 onChange={() => setSelectedRating(0)}
//               />
//               Any
//             </ListGroup.Item>
//           </div>
//         </div>
//         <div className="col-md-9">
//           <div className="row">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <div key={product.id} className="col-md-4 mb-4">
//                   <Card>
//                     <Card.Img variant="top" src={product.image} alt={product.title} />
//                     <Card.Body>
//                       <Card.Title>{product.title}</Card.Title>
//                       <Card.Text>
//                         {product.description}
//                       </Card.Text>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                           <Badge bg="primary">{product.rating.toFixed(1)} Stars</Badge>
//                         </div>
//                         <div className="text-lg font-weight-bold">${product.price.toFixed(2)}</div>
//                       </div>
//                       <Button variant="primary" className="mt-2 w-100">Buy Now</Button>
//                     </Card.Body>
//                   </Card>
//                 </div>
//               ))
//             ) : (
//               <p>No products found</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
