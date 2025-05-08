import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [unitId, setUnitId] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // build the synthetic email
    const email = `${unitId}@demo.staycozy.com`.toLowerCase();
    try {
      await signInWithEmailAndPassword(auth, email, accessCode);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid Unit ID or Access Code');
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '5rem auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #eee',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Tenant Login</h2>
      <form onSubmit={handleLogin}>
        <label>Unit ID</label>
        <input
          type="text"
          placeholder="e.g. 101"
          value={unitId}
          onChange={e => setUnitId(e.target.value)}
          required
          style={{ width:'100%', padding:'10px', margin:'8px 0', borderRadius:'4px', border:'1px solid #ccc' }}
        />

        <label>Access Code</label>
        <input
          type="password"
          placeholder="e.g. 13579"
          value={accessCode}
          onChange={e => setAccessCode(e.target.value)}
          required
          style={{ width:'100%', padding:'10px', margin:'8px 0 20px', borderRadius:'4px', border:'1px solid #ccc' }}
        />

        <button type="submit" style={{
          width:'100%',
          padding:'12px',
          backgroundColor:'#007bff',
          color:'#fff',
          border:'none',
          borderRadius:'4px',
          fontSize:'16px',
          cursor:'pointer'
        }}>
          Log In
        </button>
      </form>
    </div>
  );
}
