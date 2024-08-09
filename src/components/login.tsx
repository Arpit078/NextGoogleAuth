"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to dashboard if session exists
  React.useEffect(() => {
    if (session?.user) {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleSignIn = async () => {
    // Start the Google sign-in process
    try {
      // Initiate Google sign-in
      const result = await signIn('google', { redirect: false });

      // if (result?.ok) {
      //   const response = await fetch('http://localhost:5000/api/auth');
      //   const data = await response.json();

      //   if (response.ok && data.token) { 
      //     localStorage.setItem('jwtToken', data.token);

      //     router.push('/dashboard');
      //   } else {
      //     // Handle errors from the API call
      //     console.error('Failed to fetch token:', data.message || 'Unknown error');
      //   }
      // } else {
      //   // Handle unsuccessful sign-in
      //   console.error('Sign-in failed:', result?.error || 'Unknown error');
      // }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <>
      
        <button 
          onClick={handleSignIn} 
          className='bg-black text-white px-4 py-2 rounded flex items-center hover:bg-gray-800'
        >
          <Image 
            src="/google.png" 
            alt="Google Icon" 
            width={20} 
            height={20} 
            className='w-5 h-5 mr-2'
          />
          <span>Sign in with Google</span>
        </button>
    </>
  );
}

export default Login;
