import React, { useState } from 'react';
import './Assistant.module.css'; // We'll create this CSS file

const API = import.meta?.env?.VITE_API || 'http://localhost:8000/api';

export default function Assistant() {
  const [q, setQ] = useState('What should I do in cyclone?');
  const [lang, setLang] = useState('en');
  const [ans, setAns] = useState('');
  const [loading, setLoading] = useState(false);
  
  const ask = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/ask`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ question: q, lang })
      });
      const j = await r.json(); 
      setAns(j.answer || '');
    } catch (error) {
      setAns('Error: Could not connect to the server');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      ask();
    }
  };

  return (
    <div className="assistant-container">
      <div className="assistant-card">
        <h2 className="assistant-title">AI Safety Assistant</h2>
        
        <div className="input-group">
          <select 
            value={lang} 
            onChange={e => setLang(e.target.value)}
            className="language-select"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="gu">Gujarati</option>
          </select>
          
          <div className="input-button-group">
            <input 
              value={q} 
              onChange={e => setQ(e.target.value)}
              onKeyPress={handleKeyPress}
              className="question-input"
              placeholder="Ask about safety measures..."
            />
            <button 
              onClick={ask} 
              disabled={loading}
              className="ask-button"
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </div>
        </div>

        {ans && (
          <div className="answer-container">
            <h3 className="answer-title">Answer:</h3>
            <p className="answer-text">{ans}</p>
          </div>
        )}
      </div>
    </div>
  );
}