import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Gallery from "./pages/Gallery";
import Detail from "./pages/Detail";

export default function App(){
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="topbar">
          <Link to="/" className="logo">NFT Gallery</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Gallery/>} />
          <Route path="/nft/:id" element={<Detail/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
