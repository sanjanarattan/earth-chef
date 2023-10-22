import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  // Redirect to the authenticate page when the component mounts (initial page load).
  useEffect(() => {
    router.push('/authenticate');
  }, []);

  return null; // Return null or any content you want for the landing page.
}
