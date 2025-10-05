// src/pages/Inventory.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Inventory.css";
import { Header } from "./Header";

/** Demo items */
const items = [
  {
    name: "Bananas",
    emoji: "🍌",
    location: "Fridge",
    quantity: "6 pieces",
    expiry: "Expires in 2 days",
    expiryClass: "expiry-badge",
  },
  {
    name: "Bell Peppers",
    emoji: "🌶️",
    location: "Fridge",
    quantity: "3 pieces",
    expiry: "Expires in 4 days",
    expiryClass: "expiry-badge green",
  },
  // ...add other items here
];

export default function Inventory() {
  const navigate = useNavigate();

  // Header navigation handler
  const onNavigate = (page) => {
    const map = {
      main: "/mainpage",          // or "/" if that's your home
      kitchen: "/inventory",  // this page
      recipes: "/recipes",
      account: "/account",
    };
    navigate(map[page]);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header at the top of the page */}
      <Header currentPage="kitchen" onNavigate={onNavigate} />

      {/* Existing Inventory UI */}
      <div className="inventory-container">
        <div className="inventory-header">
          <h1 className="inventory-title">Kitchen Inventory</h1>
          <button className="inventory-btn-green">+ Add Ingredients Now</button>
        </div>

        <div className="inventory-subtitle">
          Manage your fridge, pantry, and all storage areas
        </div>

        <input
          className="inventory-search"
          type="text"
          placeholder="Search by item name or keywords"
        />

        <div className="inventory-cards">
          {items.map((item, idx) => (
            <div className="inventory-card" key={idx}>
              <div className="inventory-card-title">
                {item.name} <span>{item.emoji}</span>
              </div>
              <div className="inventory-card-location">{item.location}</div>
              <div className="inventory-card-quantity">
                Quantity: {item.quantity}
              </div>
              <div className="inventory-card-expiry">
                Expiry: <span className={item.expiryClass}>{item.expiry}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
