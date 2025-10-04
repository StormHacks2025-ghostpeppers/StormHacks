import React from "react";
import { Link, NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Inventory from "./pages/Inventory.jsx";
import GroceryGuard from "./pages/GroceryGuard.jsx";
import Recipes from "./pages/Recipes.jsx";

export default function AppShell() {
  return (
    <div className="app">
      <TopBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/guard" element={<GroceryGuard />} />
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
      </div>
    </div>
  );
}

function TopBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("hhh.user") || "null");

  return (
    <header className="topbar">
      <div className="brand" onClick={() => navigate("/app")}>
        <img src="/assets/logo-hippo.png" onError={(e)=>e.currentTarget.style.display='none'} />
        <span>HungryHungryHippos</span>
      </div>
      <nav className="tabs">
        <NavLink to="/app/inventory" className={({isActive})=> isActive?"tab active":"tab"}>Inventory</NavLink>
        <NavLink to="/app/guard" className={({isActive})=> isActive?"tab active":"tab"}>Grocery Guard</NavLink>
        <NavLink to="/app/recipes" className={({isActive})=> isActive?"tab active":"tab"}>Recipes</NavLink>
      </nav>
      <div className="user">
        {user ? <span className="hello">Hi, {user.name.split(" ")[0]}</span> : <Link to="/signup" className="btn ghost">Sign up</Link>}
      </div>
    </header>
  );
}

