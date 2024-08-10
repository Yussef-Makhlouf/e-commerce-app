import "./App.css";
// import Bar from './components/bar';
import Cart from "./components/Cart";
import Home from "./components/Home";
import Shop from "./components/Shop";
import {  Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router , Routes } from "react-router-dom";
import AboutUs from "./components/Aboutus";
import { Footer } from "./components/Footer";
import NotFoundPage from "./components/NotFound";
function App() {
  return (
    <div className="App ">
     
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/aboutus"  element={<AboutUs />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
