
import './App.css';
import MainContent from './components/content-containter/MainContent';
import UserMenu from './components/UserProfile/UserMinibox';
import React, { useState, useEffect } from 'react';

function App() {
  const [userData, setUserData] = useState(null);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5007/user/logout", {
        method: "POST",
        credentials: "include",
      });
      setUserData(null);
    } catch (err) {

    }
    
  };
  return (
    <div className="App">
      <div className='header'>
        {!userData && (
          <UserMenu /> 
          )}
          {userData && (
            <h4>Welcome, {userData.username}</h4>
          )}
      </div>
      <div className='content'>
        <MainContent />
      </div>
    </div>
  );
}

export default App;
