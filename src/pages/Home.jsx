import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrandMission from "../components/BrandMission";
import Products from "../components/Products";
import CollectionShowcase from "../components/CollectionShowcase";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      
      <main>
        <Hero />
        <BrandMission />
       
        <Products />
         <CollectionShowcase />
      </main>
    
    </div>
  );
}
