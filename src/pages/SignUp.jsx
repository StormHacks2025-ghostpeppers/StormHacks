import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp(){
  const [form, setForm] = useState({name:"", email:"", password:""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (e)=>{
    e.preventDefault();
    setError("");
    if(!form.name.trim()) return setError("Enter your name.");
    if(!form.email.includes("@")) return setError("Enter a valid email.");
    if(form.password.length < 6) return setError("Password must be 6+ chars.");
    setLoading(true);
    localStorage.setItem("hhh.user", JSON.stringify({name: form.name, email: form.email}));
    navigate("/app");
  };

  return (
    <div className="signup">
      <div className="signup-card">
        <div className="logo">
          <img src="/assets/logo-hippo.png" onError={(e)=>e.currentTarget.style.display='none'} alt="" />
          <h2>HungryHungryHippos</h2>
        </div>
        <p className="muted">Create your fridge profile — we’ll help you use what you have and stop over-buying.</p>

        <form onSubmit={submit} className="form">
          <label> Name <input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Sam Hippo" /></label>
          <label> Email <input className="input" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="you@example.com" /></label>
          <label> Password <input className="input" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="••••••••" /></label>

          {error && <div className="alert">{error}</div>}
          <button className="btn w-full" disabled={loading}>{loading? "Setting up…":"Create account"}</button>
          <div className="row">
            <Link to="/app" className="ghost small">Continue as guest</Link>
            <a className="ghost small" target="_blank" rel="noreferrer" href="https://github.com/StormHacks2025-ghostpeppers/StormHacks.git">Repo</a>
          </div>
        </form>
      </div>

      <div className="signup-illustration">
        <img src="/assets/open-fridge.png" alt="Open fridge"
             onError={(e)=>{e.currentTarget.outerHTML="<div class='img-fallback'>Add /assets/open-fridge.png</div>";}}/>
      </div>
    </div>
  );
}
