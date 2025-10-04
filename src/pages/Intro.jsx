import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Intro(){
  const [progress, setProgress] = useState(5);
  const navigate = useNavigate();

  useEffect(()=>{
    const id = setInterval(()=> setProgress(p => Math.min(100, p+5)), 120);
    return ()=> clearInterval(id);
  }, []);

  return (
    <div className="splash">
      <div className="splash-card">
        <div className="hippo-ring">
          <img src="/assets/loading-hippos.png" alt="Loading hippos"
               onError={(e)=>{e.currentTarget.outerHTML="<div class='ring-fallback'>🐗 🦛 🐗 🦛</div>";}}/>
        </div>
        <h1><span>HungryHungryHippos</span> <em>Hippos</em></h1>
        <p>Loading your inventory…</p>
        <div className="progress">
          <div className="bar ok" style={{width: `${Math.min(progress, 70)}%`}}/>
          <div className="bar rest" style={{width: `${100-Math.min(progress,100)}%`}}/>
        </div>
        <div className="cta">
          <button className="btn" onClick={()=> navigate("/signup")}>Get started</button>
          <Link className="btn ghost" to="/app">Continue as guest</Link>
        </div>
      </div>
    </div>
  );
}
