import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    // Initialize user from sessionStorage if available
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [userid, setUserId] = useState(() => {
    // Initialize userid from sessionStorage if available
    const storedUserId = sessionStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId) : 0;
  });

  const login = (currentUser, userid) => {
    // Logic for user login
    setUser(currentUser);
    setUserId(userid);
    // Store user data in sessionStorage
    sessionStorage.setItem('user', JSON.stringify(currentUser));
    sessionStorage.setItem('userId', userid.toString());
  };

  const logout = () => {
    // Logic for user logout
    setUser(null);
    setUserId(0);
    // Clear user data from sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userId');
    navigate('/');
  };
  
  const resetSessionTimeout = () => {
    // Clear previous session timeout timer
    clearTimeout(sessionTimeoutId);
    // Set a new session timeout timer
    sessionTimeoutId = setTimeout(logout,  30*60* 1000); // 30 minutes in milliseconds
    
  };

  let sessionTimeoutId;

  useEffect(() => {
    // Set initial session timeout timer
    resetSessionTimeout();

    // Reset session timeout on user activity
    const handleUserActivity = () => {
      resetSessionTimeout();
    };

    // Add event listeners for user activity
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keypress', handleUserActivity);

    // Clean up event listeners when component unmounts
    return () => {
      clearTimeout(sessionTimeoutId);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keypress', handleUserActivity);
      
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user, userid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


