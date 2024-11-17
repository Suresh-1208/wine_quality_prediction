import React from 'react';
import './Details.css';

const Details = () => {
    return (
        <div className="container">
            <header>
                Wine Quality Prediction Project
            </header>
            <main>
                <h1>Wine Quality Prediction Project</h1>
                <p>
                    This project predicts the quality of wine based on various chemical properties 
                    such as acidity, alcohol content, residual sugar, and more. Using a trained 
                    Decision Tree model, it evaluates input features and assigns a quality label 
                    (e.g., "good" or "not good").
                </p>

                <h2>Features Used in Prediction</h2>
                <ul>
                    <li><strong>Fixed Acidity:</strong> Determines wine's tartness.</li>
                    <li><strong>Volatile Acidity:</strong> Higher levels can result in a vinegar taste.</li>
                    <li><strong>Citric Acid:</strong> Adds freshness to the wine.</li>
                    <li><strong>Residual Sugar:</strong> Affects sweetness after fermentation.</li>
                    <li><strong>Chlorides:</strong> Indicate salinity levels.</li>
                    <li><strong>Free Sulfur Dioxide:</strong> Prevents spoilage during storage.</li>
                    <li><strong>Total Sulfur Dioxide:</strong> Helps in wine preservation.</li>
                    <li><strong>Density:</strong> Related to alcohol and sugar content.</li>
                    <li><strong>pH:</strong> Measures acidity level for stability.</li>
                    <li><strong>Sulphates:</strong> Enhances flavor and acts as a preservative.</li>
                    <li><strong>Alcohol:</strong> Significantly impacts the wine's quality.</li>
                </ul>

                <h2>About the Model</h2>
                <p>
                    This code demonstrates the application of PySpark MLlib for machine learning tasks, focusing on classification and clustering models. It uses the wine quality dataset (winequality-red.csv) to train and evaluate both Decision Tree and Random Forest classifiers for binary classification. The dataset is loaded as a Spark DataFrame and transformed into RDDs of LabeledPoint objects, enabling compatibility with MLlib. The label is binary, where wines with a quality score of 7 or higher are classified as "good" (1) and others as "not good" (0). After splitting the data into training and test sets, a Decision Tree Classifier is trained with specified parameters such as gini impurity, a maximum depth of 5, and 32 bins. Predictions are made on the test set, and the model's accuracy and error rate are calculated. Similarly, a Random Forest Classifier is trained using an ensemble of three trees, evaluated for its test error, and the learned model structure is displayed.

                    For clustering, a separate dataset (wine-clustering1.csv) is loaded and parsed into dense vectors. A KMeans model is trained to cluster the data into two groups using random initialization and up to ten iterations. The clustering quality is evaluated using the Within Set Sum of Squared Error (WSSE), and the centers of the clusters are output for interpretation. Each model is saved locally and optionally to Google Drive for future use, leveraging Google Colab integration for cloud storage. The workflow effectively showcases end-to-end machine learning using PySpark, including preprocessing, model training, evaluation, and persistence, providing a scalable framework for various data-driven tasks.
                </p>

                <p>
                    <strong>Prediction Output:</strong> Based on the input features, the model predicts 
                    a wine quality score, and a label ("good" or "not good") is assigned if the score 
                    exceeds a certain threshold.
                </p>
            </main>
            
        </div>
    );
};

export default Details;
