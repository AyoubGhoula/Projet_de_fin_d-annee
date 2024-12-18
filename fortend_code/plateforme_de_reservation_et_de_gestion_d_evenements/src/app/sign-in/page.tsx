"use client";
import Link from 'next/link';
import React, { useState,useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";

export default function Example() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(false); 
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      console.log(response.data);// is for testing
      alert('You have been logged in successfully');
      localStorage.setItem('token', response.data.access_token);
      if(response.data.role === "participant") {
        window.location.href = '/participant';
      } else if (response.data.role === "admin") {
        window.location.href = '/admin';
      } else if (response.data.role === "organizer") {
        window.location.href = '/events';
      }
    } catch (err) {
      alert("Invalid email or password");
    }
  };
  const handleEmailKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      passwordRef.current?.focus(); // Move focus to password input
    }
  };
  const handlePasswordKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event); // Submit the form when pressing enter on password input
    }
  };


  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="flex justify-center mx-auto">
            <div className='flex items-center font-bold bg-gradient-to-r  from-cyan-500 to-blue-500 bg-clip-text text-transparent text-2xl'>EventMaster</div>
            </div>
            
            <div className="flex items-center justify-center mt-6">
              <Link href="/sign-in" className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-blue-400 dark:text-blue-300">
                  sign in
              </Link>

              <Link href="/sign-up" className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-gray-500 dark:border-gray-400 dark:text-white">
                  sign up
              </Link>
            </div>
            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef}
          onKeyDown={handleEmailKeyDown} />
            </div>
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  ref={passwordRef}
          onKeyDown={handlePasswordKeyDown} />
            </div>
            <div className="mt-6">
              <div className="flex space-x-4 justify-center">
                <Link href="/">
                    <button className="w-full px-8 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50">
                      Cancel
                    </button>
                </Link>
                <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" type="submit">
                  Sign In
                </button>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                forget password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
