

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained Decision Tree model
model_path = "decision_tree_model.pkl"  # Update this path if needed
with open(model_path, "rb") as f:
    model = pickle.load(f)

# Feature explanations for interpretation
feature_explanations = {
    "fixed_acidity": "Fixed acidity is important as it gives wine its tartness.",
    "volatile_acidity": "High volatile acidity can cause an unpleasant vinegar taste.",
    "citric_acid": "Citric acid adds freshness and flavor to the wine.",
    "residual_sugar": "Residual sugar is the sugar left after fermentation; it affects sweetness.",
    "chlorides": "Chlorides can indicate salinity; higher levels can be undesirable.",
    "free_sulfur_dioxide": "Free SO2 protects wine from spoilage during storage.",
    "total_sulfur_dioxide": "Total SO2 affects preservation and taste.",
    "density": "Density relates to the alcohol and sugar content.",
    "pH": "pH measures the acidity level; balanced pH improves stability.",
    "sulphates": "Sulphates enhance flavor and act as a preservative.",
    "alcohol": "Alcohol content significantly impacts the wine's body and quality."
}

@app.route('/')
def home():
    return "Welcome to the Wine Quality Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict wine quality based on input features and provide explanations.
    Input: JSON payload with features
    Example: {"features": [7.4, 0.7, 0.0, ...]}
    """
    try:
        # Parse input data
        data = request.json
        features = np.array(data['features']).reshape(1, -1)  # Reshape for prediction
        
        # Make prediction
        prediction = model.predict(features)[0]
        
        # Generate quality label
        quality_label = "good" if prediction > 5 else "not good"  # Updated threshold
        
        # Generate explanations based on feature values
        explanations = []
        for i, feature_value in enumerate(data['features']):
            feature_name = list(feature_explanations.keys())[i]
            explanation = f"{feature_name.replace('_', ' ').capitalize()} ({feature_value}): {feature_explanations[feature_name]}"
            explanations.append(explanation)
        
        # Return response
        return jsonify({
            "predicted_quality": int(prediction),
            "quality_label": quality_label,
            "explanations": explanations
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
