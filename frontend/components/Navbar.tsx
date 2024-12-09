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
            <button onClick={handleLogout} className="px-3 py-1 text-base bg-orange-100 text-orange-700 hover:bg-orange-200 hover:text-orange-800 border-orange-300 rounded-lg">
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
