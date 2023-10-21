import { useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook

export default function Authenticate() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Initialize the router

  const handleSignIn = async () => {
    if (username.length >= 4 && password.length >= 4) {
      // Redirect to the index.js page upon successful validation
      router.push('/'); // This will take you to the index.js page
    } else {
      setMessage('Username and password must be at least 4 characters long.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      <p>{message}</p>
    </div>
  );
}

