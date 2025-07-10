'use client'

import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const {isLoggedIn} = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center sticky top-0">
      <div className="flex font-medium text-[24px] px-3 py-1 my-1 rounded-lg w-full items-center justify-between">
        <Link href="/">
          <div className="flex cursor-pointer font-bold">Quizzer</div>
        </Link>
        <div className="flex gap-x-2 items-center">
          {/* <a href="https://github.com/Vinit1014/rtleaderboard">
            <Github />
          </a> */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-4 py-1 text-sm font-medium text-white bg-orange-600 rounded-lg shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="px-3 py-1 bg-white text-sm text-black rounded-lg hover:bg-gray-200">
                Log In
              </Link>
              <Link href="/signup" className="px-3 py-1 bg-gray-800 text-sm text-white hover:bg-gray-900 rounded-lg">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
