/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

function Navbar() {

  const { data: session } = useSession();

  console.log(session);

  return (
    <nav className='bg-slate-900 flex justify-between px-20 text-white'>
      <Link href="/">
        <h1>
          AuthGoogle
        </h1>
      </Link>
      
      {session?.user ? (
        <div className='flex gap-x-2 items-center'>
        <Link rel="stylesheet" href="/dashboard">Dashboard</Link>
          <p>{session.user.name} {session.user.email}</p>
          <img src={session.user.image} alt="" className='w-10 h-10 rounded-full cursor-pointer' />

          <button onClick={() => {
            signOut() }}>
            LogOut
          </button>
        </div>
      ): (
        <button onClick={() => signIn()} className='bg-sky-400 px-3 py-2 roundes items-center '>
          Sign In
        </button>
      )}
    </nav>

  )
}

export default Navbar