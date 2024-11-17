import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WineQualityPredictor from "./components/WineQualityPredictor";
import Details from "./components/details";
import './App.css'; // Import the external CSS file for styles

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-container">
                <h1 className="header-title">Wine Quality Prediction</h1>
                <div className="button-container">
                  <Link to="/predict" className="link-style">
                    <button className="button">Predict</button>
                  </Link>
                  <Link to="/details" className="link-style">
                    <button className="button">Details</button>
                  </Link>
                </div>
              </div>
            }
          />
          <Route path="/predict" element={<WineQualityPredictor />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
