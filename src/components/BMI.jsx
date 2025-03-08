import React, { useState } from "react";
import "./BMI.css";

const BMI = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    // Convert height from cm to meters if needed
    const heightInMeters = heightNum >= 100 ? heightNum / 100 : heightNum;

    if (weightNum > 0 && heightInMeters > 0) {
      const bmiValue = (weightNum / heightInMeters ** 2).toFixed(2);
      setBmi(bmiValue);

      // Determine BMI Category
      if (bmiValue < 18.5) {
        setStatus("Underweight");
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setStatus("Normal weight");
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setStatus("Overweight");
      } else {
        setStatus("Obese");
      }
    } else {
      setBmi(null);
      setStatus("Please enter valid values!");
    }
  };

  return (
    <div className="bmi" id="bmi">
      <h2>BMI Calculator</h2>
      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Height (cm or m)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi && (
        <p>
          Your BMI: <strong>{bmi}</strong> ({status})
        </p>
      )}
    </div>
  );
};

export default BMI;
