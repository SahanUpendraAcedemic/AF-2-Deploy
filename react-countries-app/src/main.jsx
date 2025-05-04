import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryDetail from "./components/countryDetails";
import HomePage from "./pages/homePage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/country/:code" element={<CountryDetail />} />
    </Routes>
  </BrowserRouter>
);
