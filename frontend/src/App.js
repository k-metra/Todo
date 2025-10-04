import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

import LoadingRing from './components/loadingRing';

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

const PublicRoute = ({ children, authenticated }) => {

  return !authenticated ? children : <Home />;
}

const PrivateRoute = ({ children, authenticated }) => {
  return authenticated ? children : <Login />;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("session_token")

    if (!token) {
      setLoading(false);
      setAuthenticated(false);
      console.log("No session token found, user is not authenticated.");
    } else {
      verifyToken(token)
      .then((valid) => {
        console.log(`Value: ${valid}`);
        setAuthenticated(valid);
      });
    }

    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [])

  return (
    loading ? <LoadingRing /> : (
      <div className="App">
      <Router>
        <Routes>
          <Route path="/login/" element={
            <PublicRoute authenticated={authenticated}>
              <Login />
            </PublicRoute>
          } />

          <Route path="/register/" element={
            <PublicRoute authenticated={authenticated}>
              <Register />
            </PublicRoute>
          } />

          <Route path="/home/" element={
            <PrivateRoute authenticated={authenticated}>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </div>
    )
  );
}

export default App;
