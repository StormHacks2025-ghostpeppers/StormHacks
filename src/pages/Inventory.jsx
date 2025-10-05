import React from "react";
import "./Inventory.css";

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
  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <img src="/hippo.png" alt="Hippo" style={{ width: 64, height: 64 }} />
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
  );
}

