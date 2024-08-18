import "./App.css";
// import Bar from './components/bar';
import { useEffect,useState } from "react";
import CartPage from "./page/Cart.js";
import Home from "./page/Home.js";
import Shop from "./page/Shop.js";
import { Footer } from "./components/Footer";
import AboutUs from "./page/aboutUs.js";
import Details from "./page/details.js";
import ContactUs from "./page/ContactUs.js";
import Wishlist from "./page/Wishlist.js";
import Favorite from "./page/favorite.js";
import { Navigate } from "react-router-dom";

// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import Logout from "./components/Logout.js";

import Dashboard from "./components/Dashboard.js";



import Navbar from "./components/Navbar.js";
import { BrowserRouter as Router , Routes } from "react-router-dom";
// import AboutUs from "./components/Aboutus";
import { Route } from "react-router-dom";

import NotFoundPage from "./components/NotFound";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) setIsAuthenticated(true);
  }, []);
  const handleLogin = () => {
    localStorage.setItem('user', JSON.stringify({ isAuthenticated: true }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  
  };
  return (
    <>
      
      <Router>
        {/* <Navbar /> */}
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      
        {/* <Route path="/logout" element={<Logout onLogout={handleLogout} />} /> */}
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/aboutus" element={<AboutUs />}></Route>
         
          <Route
          path="/cart"
          element={isAuthenticated ? <CartPage/>: <Navigate to="/login" /> }
        />
         <Route 
           path="/dashboard" 
           element={isAuthenticated ? <Dashboard/> : <Navigate to="/login" />  }///
           />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="*" element={<NotFoundPage />}></Route>
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        </Routes>
      </Router>
      <Footer />
   
    </>

  );
}

export default App;
