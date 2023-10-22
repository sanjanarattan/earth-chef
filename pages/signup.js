import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from "./index.module.css";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, username, password });
    localStorage.setItem('users', JSON.stringify(users));

    router.push('/authenticate');
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.gradientText}>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.Button}>Sign Up</button>
      </form>
    </div>
  );
}
