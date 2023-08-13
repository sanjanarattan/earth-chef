import { signIn } from 'next-auth/next';
import { useRouter } from 'next/router';

export default function SignInPage() {
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signIn('google'); // Use the appropriate provider name
    if (result?.error) {
      console.error('Sign-in failed:', result.error);
    } else {
      router.push('/main'); // Redirect to the main page
    }
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}
