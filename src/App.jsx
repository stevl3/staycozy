import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f9f9f9', 
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🏠 Welcome to Property Portal</h1>
      <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '30px' }}>
        A demo platform for guests to access their rental unit information.
      </p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link 
          to="/login" 
          style={{ 
            padding: '10px 25px', 
            backgroundColor: '#007bff', 
            color: '#fff', 
            textDecoration: 'none', 
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          Login
        </Link>
        <Link 
          to="/signup" 
          style={{ 
            padding: '10px 25px', 
            backgroundColor: '#28a745', 
            color: '#fff', 
            textDecoration: 'none', 
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
