import React, { useState } from "react";
import "./MedicineGuide.css";

const MedicineGuide = () => {
  const [query, setQuery] = useState("");
  const [medicine, setMedicine] = useState(null);
  const [error, setError] = useState("");

  const searchMedicine = async () => {
    try {
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?search=active_ingredient:${query}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMedicine(data.results[0]);
        setError("");
      } else {
        setMedicine(null);
        setError("Medicine not found.");
      }
    } catch (err) {
      setError("Error fetching data.");
      setMedicine(null);
    }
  };

  return (
    <div className="medicine-guide">
      <h2 className="medicine-guide-title">Medicine Guide</h2>

      {/* Search Box */}
      <div className="medicine-search">
        <input
          type="text"
          className="medicine-search-input"
          placeholder="Enter medicine name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="medicine-search-button" onClick={searchMedicine}>
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="medicine-error">{error}</p>}

      {/* Medicine Details */}
      {medicine && (
        <div className="medicine-card">
          <h3 className="medicine-name">{medicine.brand_name?.[0]}</h3>
          <p className="medicine-purpose">
            <strong>Purpose:</strong> {medicine.purpose?.[0] || "N/A"}
          </p>
          <p className="medicine-warning">
            <strong>Warnings:</strong> {medicine.warnings?.[0] || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default MedicineGuide;
