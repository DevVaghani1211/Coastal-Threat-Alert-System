
import React, { useState } from 'react';
const API = import.meta?.env?.VITE_API || 'http://localhost:8000/api';

export default function Bloom(){
  const [file,setFile]=useState(null); const [res,setRes]=useState(null); const [err,setErr]=useState('');
  const predict = async ()=>{
    setErr(''); setRes(null);
    try{
      const fd = new FormData(); fd.append('file', file);
      const r = await fetch(`${API}/predict_bloom`, {method:'POST', body: fd});
      const j = await r.json(); if(!r.ok) throw new Error(j.detail||'error'); setRes(j);
    }catch(e){ setErr(e.message); }
  };
  return (
    <div>
      <h2>Algal Bloom Detection</h2>
      <input type="file" onChange={e=>setFile(e.target.files[0])}/>
      <button disabled={!file} onClick={predict}>Check Image</button>
      {res && <pre>{JSON.stringify(res, null, 2)}</pre>}
      {err && <p>{err}</p>}
    </div>
  )
}
