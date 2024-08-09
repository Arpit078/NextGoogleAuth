"use client";

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from "../page.module.css"; // Import your CSS module
import dashboardStyles from "./dashboard.module.css"; // Import your CSS module

function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [loading, setLoading] = useState(false); // New state for loading
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  React.useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/'); // Redirect to sign-in page if not authenticated
  }, [session, status, router]);

  React.useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (status === 'loading') {
    return <p>Loading...</p>; // Optionally, return a loading spinner or message
  }

  if (!session) {
    return null; // Optionally, return null or a fallback UI
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Redirect to home after signing out
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          screenWidth,
          screenHeight,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      // Handle successful submission (e.g., show a success message)
      alert('Data submitted successfully!');
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev); // Toggle password visibility
  };

  return (
    <>
      <button onClick={handleSignOut} className={dashboardStyles.signOutButton}>
        Sign Out
      </button>
      <div className={dashboardStyles.bg}>
        <div className={dashboardStyles.center}>
          <h1 className={dashboardStyles.title}>Welcome {session.user?.name || 'User'}</h1>
          <form onSubmit={handleSubmit} className={dashboardStyles.form}>
            <label htmlFor="password" className={dashboardStyles.label}>
              <h2 className={dashboardStyles.sub_text}>
                Create a temporary password for accessing the browser:
              </h2>
            </label>
            <div className={dashboardStyles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={dashboardStyles.input}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={dashboardStyles.toggleButton}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button type="submit" className={dashboardStyles.submitButton} disabled={loading}>
              {loading ? 'Starting...' : 'Start Browser'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
