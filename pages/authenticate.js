import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "./index.module.css";

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
      router.push('/recipe');
    } else {
      setMessage('Invalid username or password.');
    }
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <div className={styles.main}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSignIn} className={styles.button}>Sign In</button>
      <button onClick={handleSignUp} className={styles.button}>Sign Up</button>
      <p>{message}</p>
    </div>
  );
}
