import "./App.css";
// import Bar from './components/bar';
import CartPage from "./page/Cart.js";
import Home from "./page/Home.js";
import Shop from "./page/Shop.js";
import { Footer } from "./components/Footer";
import AboutUs from "./page/aboutUs.js";
import Details from "./page/details.js";
import ContactUs from "./page/ContactUs.js";
import Wishlist from "./page/Wishlist.js";
import Favorite from "./page/favorite.js";



import Navbar from "./components/Navbar";
import { BrowserRouter as Router , Routes } from "react-router-dom";
// import AboutUs from "./components/Aboutus";
import { Route } from "react-router-dom";

import NotFoundPage from "./components/NotFound";
function App() {
  return (
    <div className="App ">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/aboutus" element={<AboutUs />}></Route>
          <Route path="/Cart" element={<CartPage/>}></Route>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
