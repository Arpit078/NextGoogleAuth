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

  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <>
      {session?.user ? (
        <div className='flex gap-x-2 items-center'>
          <Link href="/dashboard" className='text-blue-500 hover:underline'>Dashboard</Link>
          <p>{session.user.name} {session.user.email}</p>
          <Image 
            src={session.user.image || '/default-avatar.png'} 
            alt="User Avatar" 
            width={40} 
            height={40} 
            className='rounded-full cursor-pointer' 
          />
          <button onClick={() => signOut()} className='bg-red-500 text-white px-4 py-2 rounded'>
            Log Out
          </button>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default Login;
