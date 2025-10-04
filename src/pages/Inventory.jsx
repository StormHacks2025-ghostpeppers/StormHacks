import React, { useMemo, useState, useEffect } from "react";
import { loadItems, saveItems, nowISO, daysLeft, isAtRisk } from "../lib/items.js";
import AddItemModal from "../shared/AddItemModal.jsx";

export default function Inventory(){
  const [items, setItems] = useState(loadItems());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | atRisk
  const [showAdd, setShowAdd] = useState(false);

  useEffect(()=> saveItems(items), [items]);

  const list = useMemo(()=>{
    const q = search.trim().toLowerCase();
    return items
      .filter(it => (!q || it.name.toLowerCase().includes(q)) && (filter==="all" || (filter==="atRisk" && isAtRisk(it.expiryDate))))
      .sort((a,b)=>{
        const ea = a.expiryDate ? new Date(a.expiryDate).getTime() : Infinity;
        const eb = b.expiryDate ? new Date(b.expiryDate).getTime() : Infinity;
        return ea - eb;
      });
  }, [items, search, filter]);

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="left">
          <h2>Your Fridge Inventory</h2>
          <div className="search">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search items…" />
          </div>
          <div className="chips">
            <button className={`chip ${filter==="all"?"active":""}`} onClick={()=>setFilter("all")}>All</button>
            <button className={`chip ${filter==="atRisk"?"active":""}`} onClick={()=>setFilter("atRisk")}>Expiring Soon</button>
          </div>
        </div>
        <button className="btn" onClick={()=>setShowAdd(true)}>+ Add New Item</button>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Name</th><th>Qty</th><th>Unit</th><th>Expiry</th><th>Days left</th><th>Par</th><th></th></tr></thead>
          <tbody>
            {list.length===0 && <tr><td colSpan="7" className="empty">Nothing here yet — add your first item.</td></tr>}
            {list.map(it=> <Row key={it.id} it={it} onChange={(patch)=> setItems(prev=> prev.map(p=> p.id===it.id? {...p, ...patch}: p))} onDelete={()=> setItems(prev=> prev.filter(p=> p.id!==it.id))} />)}
          </tbody>
        </table>
      </div>

      {showAdd && <AddItemModal onClose={()=>setShowAdd(false)} onSave={(data)=>{
        const newItem = { id: crypto.randomUUID(), addedAt: nowISO(), ...data };
        setItems(prev=> [newItem, ...prev]);
        setShowAdd(false);
      }} existing={items}/>}
    </div>
  );
}

function Row({ it, onChange, onDelete }){
  const [edit, setEdit] = useState(false);
  const d = daysLeft(it.expiryDate);
  const badge = it.expiryDate==null ? "—" : `${d}d`;
  const color = it.expiryDate==null ? "" : d<=3? "danger" : d<=7? "warn" : "ok";

  if(!edit) return (
    <tr>
      <td className="name">{it.name}</td>
      <td>{it.qty}</td>
      <td>{it.unit}</td>
      <td>{it.expiryDate? it.expiryDate.slice(0,10) : "—"}</td>
      <td><span className={`pill ${color}`}>{badge}</span></td>
      <td>{it.parTarget ?? "—"}</td>
      <td className="actions">
        <button className="link" onClick={()=>setEdit(true)}>Edit</button>
        <button className="link danger" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );

  let name = it.name, qty = it.qty, unit = it.unit, expiry = it.expiryDate? it.expiryDate.slice(0,10):"", par = it.parTarget ?? "";
  return (
    <tr>
      <td><input className="input compact" defaultValue={name} onChange={e=>name=e.target.value}/></td>
      <td><input className="input compact" type="number" step="0.01" defaultValue={qty} onChange={e=>qty=Number(e.target.value)}/></td>
      <td>
        <select className="input compact" defaultValue={unit} onChange={e=>unit=e.target.value}>
          <option>pcs</option><option>g</option><option>ml</option><option>bunch</option><option>L</option>
        </select>
      </td>
      <td><input className="input compact" type="date" defaultValue={expiry} onChange={e=>expiry=e.target.value}/></td>
      <td></td>
      <td><input className="input compact" type="number" step="0.01" placeholder="Par" defaultValue={par} onChange={e=>par=e.target.value?Number(e.target.value):null}/></td>
      <td className="actions">
        <button className="btn xs" onClick={()=>{ onChange({name: name.trim(), qty, unit, parTarget: par??null, expiryDate: expiry? new Date(expiry).toISOString(): null}); setEdit(false); }}>Save</button>
        <button className="btn ghost xs" onClick={()=>setEdit(false)}>Cancel</button>
      </td>
    </tr>
  );
}
