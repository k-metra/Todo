import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

async function verifyToken(token) {
  let verified = false;

      try {
        const response = await fetch('http://localhost:8000/auth/verify-session/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ session_token: token }),
        })

        if (!response.ok) {
          verified = false;
          console.warn('Session token is invalid or expired');
          console.warn(`Token: ${token}`);
        } else {
          verified = true;
          console.log('Session token is valid');
          console.log(`Token: ${token}`);
        }

      } catch (Exception) {
        console.error('Error:', Exception);
      }
      return verified;
    }

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("session_token")

    if (!token) {
      setIsAuthenticated(false);
    } else {
      verifyToken(token)
      .then(isValid => setIsAuthenticated(isValid));
    }

  }, [])

  return !isAuthenticated ? children : <Home />;
}

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("session_token")

    if (!token) {
      setIsAuthenticated(false);
    } else {
      verifyToken(token)
      .then(isValid => setIsAuthenticated(isValid));
    }

  }, [])

  return isAuthenticated ? children : <Login />;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login/" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

          <Route path="/register/" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          <Route path="/home/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
