import { useState, useEffect } from 'react';
import './App.css';
import { login } from './api.js';
import { DataConsentPopup } from './App';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = await login(username, password);
      console.log('Login successful:', loginData);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <DataConsentPopup />
      <form onSubmit={handleLogin}>
        <label>Username: 
            <input value={username} onChange={handleUsernameChange}/>
        </label>
        <label>Password: 
          <input value={password} onChange={handlePasswordChange}/>
        </label>
        <button type="submit">Login</button>
      </form>
      
    </>
  );
}

export { App };

// luis-feature: Added code to display player stats
import { useEffect, useState } from 'react';

function PlayerStats({ playerId }) {
  const [playerStats, setPlayerStats] = useState(null);

  useEffect(() => {
    async function fetchPlayerStats() {
      try {
        const response = await fetch(`/api/player-stats?player_id=${playerId}`);
        const stats = await response.json();
        setPlayerStats(stats);
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    }

    fetchPlayerStats();
  }, [playerId]);

  if (!playerStats) {
    return <p>Loading player stats...</p>;
  }

  return (
    <div>
      <h2>Player Stats</h2>
      <p>Total Playtime: {playerStats.total_playtime} hours</p>
      <p>Location: {playerStats.location}</p>
    </div>
  );
}

export default PlayerStats;
// luis-feature: End of added code

// luis-feature: Added popup for data consent on even days after the 15th
import { useEffect, useState } from 'react';

function DataConsentPopup() {
  const [showConsentPopup, setShowConsentPopup] = useState(false);

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();

    if (day > 15 && day % 2 === 0) {
      setShowConsentPopup(true);
    }
  }, []);

  const handleConsent = (consent) => {
    setShowConsentPopup(false);
    if (consent) {
      console.log('Player consented to data storage.');
    } else {
      console.log('Player did not consent to data storage.');
    }
  };

  if (!showConsentPopup) return null;

  return (
    <div className="popup">
      <p>Do you still consent to your data being stored for analytics?</p>
      <button onClick={() => handleConsent(true)}>Yes</button>
      <button onClick={() => handleConsent(false)}>No</button>
    </div>
  );
}

export { DataConsentPopup };
// luis-feature: End of added popup
