
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import RoomPageTrial from '@/components/RoomPageTrial';

const Dashboard = () => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(()=>{
    console.log("Inside dashboard "+user);
  },[user])

  useEffect(() => {
    const checkAuthAndFetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      // console.log(user);
      
      // Redirect to login if user is not logged in
      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch user role from the API
      try {
        const response = await fetch('/api/getUserRole', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userMail: user.email }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user role');
        }

        const data = await response.json();
        console.log(data.user);
        
        setRole(data.user.role || null);
        setUser(data.user);

      } catch (error:any) {
        console.error('Error fetching role:', error.message);
      }
    };

    checkAuthAndFetchRole();
  }, [router]);

  return (
    <div>
      {/* <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p> */}
      
      {/* Display content based on the user's role */}
        {role ? (
          <RoomPageTrial user={user}/>
        ):
        <p className='text-center justify-center text-lg'>Loading...</p>
        }
    </div>
  );
};

export default Dashboard;
