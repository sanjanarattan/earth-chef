import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Authenticate() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = () => {
    // Retrieve user data from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      // Successful login, you can save user information in state or context for the rest of the app
      // Redirect to the next page (e.g., recipe.js)
      router.push('/recipe');
    } else {
      setMessage('Invalid username or password.');
    }
  };

  const handleSignUp = () => {
    // Redirect to the sign-up page
    router.push('/signup');
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
      <button onClick={handleSignUp}>Sign Up</button>
      <p>{message}</p>
    </div>
  );
}

