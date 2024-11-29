
'use client';

import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password cannot be empty.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // Handle successful login
      toast.success('Login successful!');
      setEmail('');
      setPassword('');

      // Redirect to a protected route (e.g., dashboard)
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Login failed.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            {/* Email Input */}
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <PasswordInput
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
        
            {/* Submit Button */}
            <button type="submit" className="btn-primary">
              Login
            </button>

            {/* Sign Up Link */}
            <p className="text-sm text-center mt-4">
              Not registered yet?{' '}
              <Link href="/signup" className="font-medium text-primary underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
