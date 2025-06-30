
import './App.css';
import './component-styling/sell-form.css';
import './component-styling/login-form.css';
import './component-styling/signup-form.css';
import './component-styling/user-items.css';
import './component-styling/item-detail.css';
import './component-styling/user-minibox.css';
import './component-styling/user-profile.css';
import MainContent from './components/content-containter/MainContent';
import UserMenu from './components/UserProfile/UserMinibox';
import React, { useState, useEffect } from 'react';

function App() {
  const [userData, setUserData] = useState(undefined);

    useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUserData(JSON.parse(stored));
      } catch (e) {
        setUserData(null); // fallback
      }
    } else {
      setUserData(null);
    }
  }, []);


  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5069/user/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      setUserData(null);

    } catch (err) {

    }
    
  };
  return (
    <div className="App">
      <div className='header'>
       {userData === undefined ? null :
          !userData ? (
            <UserMenu setUserData={setUserData} />
          ) : (
            <section className="header-user">
              <h4>Welcome, {userData?.username || "User"}</h4>
              <button onClick={handleLogout}>Logout</button>
            </section>
          )
        }

      </div>
      <div className='content'>
        <MainContent />
      </div>
    </div>
  );
}

export default App;
