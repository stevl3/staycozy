import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import chosanData from '../data/chosan_lifestyle';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      const snapshot = await getDocs(collection(db, 'users'));
      const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    }
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.content}>
        <h2 style={styles.heading}>👩‍💼 Admin Dashboard</h2>
        <p>Total Tenants: {users.length}</p>

        {/* 🔐 Firestore Users Table */}
        <h3 style={styles.subheading}>📋 Tenant Records</h3>
        <div style={styles.scrollContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={th}>Unit</th>
                <th style={th}>Address</th>
                <th style={th}>City</th>
                <th style={th}>Door Code</th>
                <th style={th}>Admin?</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={td}>{user.unit}</td>
                  <td style={td}>{user.address}</td>
                  <td style={td}>{user.city}</td>
                  <td style={td}>{user.doorCode}</td>
                  <td style={td}>{user.isAdmin ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📊 Chosan Lifestyle Table */}
        <h3 style={{ ...styles.subheading, marginTop: '2.5rem' }}>📊 Chosan Lifestyle Data</h3>
        {Array.isArray(chosanData) && chosanData.length > 0 ? (
          <div style={styles.scrollContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {Object.keys(chosanData[0]).map((key) => (
                    <th key={key} style={th}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chosanData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((val, i) => (
                      <td key={i} style={td}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Excel data available.</p>
        )}

        {/* 🔘 Logout Button */}
        <button onClick={handleLogout} style={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  content: {
    maxWidth: '100%',
    margin: '0 auto',
  },
  heading: {
    fontSize: '1.75rem',
    marginBottom: '1rem',
  },
  subheading: {
    fontSize: '1.2rem',
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
  },
  scrollContainer: {
    overflowX: 'auto',
    maxWidth: '100%',
    paddingBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  logoutButton: {
    marginTop: '2rem',
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

const th = {
  borderBottom: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  backgroundColor: '#f4f4f4',
};

const td = {
  borderBottom: '1px solid #eee',
  padding: '8px',
  fontSize: '14px',
  whiteSpace: 'nowrap',
};
