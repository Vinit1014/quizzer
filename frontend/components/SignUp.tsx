'use client'
import React, { useState } from 'react';
import PasswordInput from './PasswordInput'; 
import { useRouter } from "next/navigation";
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';
import Link from 'next/link';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // New state for role

  const router = useRouter();
  
  const handleSignUp = async (e:any) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      toast.error("All fields (Name, Email, Password, and Role) are required.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      const response = await fetch("/api/authe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (response.ok) {
        toast.success("Registration done.");
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
        router.push('/dashboard')
        router.refresh();
      } else {
        toast.error("Registration failed in API.");
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e:any) => setPassword(e.target.value)}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-box"
            >
              <option value="" disabled>Select Role</option>
              <option value="TEACHER">Teacher</option>
              <option value="STUDENT">Student</option>
            </select>
            <button type="submit" className="btn-primary">Sign Up</button>
            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
