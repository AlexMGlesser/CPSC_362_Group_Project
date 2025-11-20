import { useState } from 'react'
import './App.css'
import { login } from './api.js'

function App() {
  // Javascript can be written here for functions.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const loginData = await login(username, password);
      
      console.log('Login successful:', loginData);
      // We need to add token to localStorage still
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  // Write any HTML inside the return function. Syntax differs slightly, just refer to JSX documentation for reference.
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
  )
}

export default App