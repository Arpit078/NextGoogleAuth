// src/app/dashboard/page.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css"; // Import your CSS module

function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/api/auth/signin'); // Redirect to sign-in page if not authenticated
  }, [session, status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>; // Optionally, return a loading spinner or message
  }

  if (!session) {
    return null; // Optionally, return null or a fallback UI
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Redirect to home after signing out
  };

  return (
    <div className={styles.dashboard}>
      <h1>Welcome to your Dashboard</h1>
      <div className={styles.userInfo}>
        <Image
          src={session.user?.image || '/default-avatar.png'}
          alt="User Avatar"
          width={100} // Set the desired width
          height={100} // Set the desired height
          className={styles.userAvatar}
        />
        <p className={styles.userName}>{session.user?.name || 'User'}</p>
        <p className={styles.userEmail}>{session.user?.email || 'user@example.com'}</p>
      </div>
      <button onClick={handleSignOut} className={styles.signOutButton}>
        Sign Out
      </button>
    </div>
  );
}

export default Dashboard;
