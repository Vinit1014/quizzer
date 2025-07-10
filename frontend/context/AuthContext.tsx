"use client"
import React, {createContext, useState, useEffect, useContext} from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

interface AuthContextType {
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [user, setUser] = useState(null);
    const router = useRouter();

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setIsLoggedIn(!!user);
        // setUser(user);
    }

    useEffect(() => {
        checkUser();

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
    }, [])

    return (
        <AuthContext.Provider value={{isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}