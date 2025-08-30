
import React, { useState } from 'react';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Storm from './pages/Storm';
import Bloom from './pages/Bloom';
import Assistant from './pages/Assistant';

export default function App(){
  const [page,setPage]=useState('home');
  return (
    <div style={{fontFamily:'system-ui', padding:16}}>
      <nav style={{display:'flex', gap:12, marginBottom:16}}>
        <button onClick={()=>setPage('signup')}>Sign Up / Login</button>
        <button onClick={()=>setPage('home')}>Home</button>
        <button onClick={()=>setPage('storm')}>Storm</button>
        <button onClick={()=>setPage('bloom')}>Bloom</button>
        <button onClick={()=>setPage('assistant')}>Assistant</button>
      </nav>
      {page==='signup' && <Signup/>}
      {page==='home' && <Home/>}
      {page==='storm' && <Storm/>}
      {page==='bloom' && <Bloom/>}
      {page==='assistant' && <Assistant/>}
    </div>
  )
}
