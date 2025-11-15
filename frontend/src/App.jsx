import { useState, useEffect } from 'react';
import './App.css';
import { login } from './api.js';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();

    if (day > 10 && day % 2 === 0) {
      console.log('Day is even and greater than 15');
    }
  }, []);

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
//import { useState, useEffect } from 'react';

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
