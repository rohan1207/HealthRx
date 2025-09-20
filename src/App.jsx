import React from "react";
import Home from "./pages/Home";
import { motion } from "framer-motion"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export default function App() {
	return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
      <Footer/>
    </Router>
		
	);
}

