import React, { useState } from "react";
import axios from "axios";
import './WineQualityPredictor.css'; // Import the CSS file for styling

const WineQualityPredictor = () => {
  const [features, setFeatures] = useState({
    fixed_acidity: "",
    volatile_acidity: "",
    citric_acid: "",
    residual_sugar: "",
    chlorides: "",
    free_sulfur_dioxide: "",
    total_sulfur_dioxide: "",
    density: "",
    pH: "",
    sulphates: "",
    alcohol: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeatures((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null); // Clear any previous errors

      // Convert features to an array of numeric values
      const featureValues = Object.values(features).map((value) =>
        parseFloat(value)
      );

      // Send POST request to Flask backend
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        features: featureValues,
      });

      setResponse(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred while making the request."
      );
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFeatures({
      fixed_acidity: "",
      volatile_acidity: "",
      citric_acid: "",
      residual_sugar: "",
      chlorides: "",
      free_sulfur_dioxide: "",
      total_sulfur_dioxide: "",
      density: "",
      pH: "",
      sulphates: "",
      alcohol: "",
    });
    setResponse(null);
    setError(null);
  };

  return (
    <div className="container">
      <header className="header">
        Wine Quality Predictor
      </header>
      <main>
        <h1>Wine Quality Predictor</h1>
        <form onSubmit={handleSubmit} className="form">
          {Object.keys(features).map((key) => (
            <div key={key} className="form-group">
              <label className="label">
                {key.replace("_", " ").toUpperCase()}:
              </label>
              <input
                type="number"
                name={key}
                value={features[key]}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="button"
          >
            Predict
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="reset-button"
          >
            Reset
          </button>
        </form>

        {response && (
          <div className="result">
            <h2>Prediction Result:</h2>
            <p><strong>Predicted Quality:</strong> {response.predicted_quality}</p>
            <p><strong>Quality Label:</strong> {response.quality_label}</p>
            <h3>Explanations:</h3>
            <ul>
              {response.explanations.map((explanation, index) => (
                <li key={index}>{explanation}</li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default WineQualityPredictor;
