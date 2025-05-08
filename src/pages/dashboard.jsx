import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [unitInfo, setUnitInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUnitInfo() {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) setUnitInfo(snap.data());
      setLoading(false);
    }
    fetchUnitInfo();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={styles.centered}>
        <p>Loading your unit info…</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🏠 Your Rental Details</h2>

        {/* Basic Info */}
        <div style={styles.section}>
          <label style={styles.label}>📍 Address</label>
          <p>{unitInfo.address}</p>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>🏢 Building & Unit</label>
          <p>{unitInfo.building} – Unit {unitInfo.unit}</p>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>🌆 City</label>
          <p>{unitInfo.city}</p>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>🔐 Door Code</label>
          <p style={styles.code}>{unitInfo.doorCode}</p>
        </div>

        {/* New: Check‑In/Out */}
        <div style={styles.section}>
          <label style={styles.label}>⏰ Check‑In / Check‑Out</label>
          <p>Check‑In After 3:00 PM</p>
          <p>Check‑Out Before 11:00 AM</p>
        </div>

        {/* New: Wi‑Fi Info */}
        <div style={styles.section}>
          <label style={styles.label}>📶 Wi‑Fi</label>
          <p>Network: <strong>StayCozy_Guest</strong></p>
          <p>Password: <strong>welcome123</strong></p>
        </div>

        {/* New: Support */}
        <div style={styles.section}>
          <label style={styles.label}>🆘 Need Help?</label>
          <p>
            Email <a href="mailto:support@staycozydemo.com">support@staycozydemo.com</a> or call <strong>(555) 123‑4567</strong>
          </p>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} style={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '100%',
  },
  heading: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  section: {
    marginBottom: '1.25rem',
  },
  label: {
    fontWeight: '600',
    display: 'block',
    marginBottom: '0.25rem',
  },
  code: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    letterSpacing: '2px',
    color: '#1a1a1a',
  },
  logoutButton: {
    marginTop: '2rem',
    width: '100%',
    padding: '12px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  centered: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
  },
};
