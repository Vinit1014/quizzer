'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Function to check and update login status
  const updateLoginStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsLoggedIn(!!user);
  };

  useEffect(() => {
    updateLoginStatus();

    // Subscribe to authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
      if (event === 'SIGNED_OUT') {
        router.push('/');  // Redirect to homepage after logout
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      setIsLoggedIn(false);  // Update state immediately
      router.push('/');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex border font-medium text-[24px] px-3 py-1 m-2 rounded-lg w-full items-center justify-between">
        <Link href="/">
          <div className="flex cursor-pointer">Quizzer</div>
        </Link>
        <div className="flex gap-x-2 items-center">
          {/* <a href="https://github.com/Vinit1014/rtleaderboard">
            <Github />
          </a> */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="px-3 py-1 text-base bg-red-500 text-white rounded-lg">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="px-3 py-1 bg-white text-base text-black underline rounded-lg">
                Login
              </Link>
              <Link href="/signup" className="px-3 py-1 bg-green-700 text-base text-white rounded-lg">
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
