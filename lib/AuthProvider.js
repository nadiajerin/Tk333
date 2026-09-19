
"use client"

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import auth from './FirebaseConfig';


export const authContext = createContext('');
const AuthProvider = ({ children }) => {

    // Manage State
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Handle Register User from Firebase
    const handleRegister = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Handle Login User form Firebase
    const handleLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Handle LogOut User 
    const handleLogOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    // Get SingIn Current User & Observerd
    useEffect(() => {
        const unSubscrive = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            const userInfo = { email: currentUser?.email }
            // console.log(userInfo)
            if (currentUser) {
                // const fetchBalance = async () => {
                //     try {
                //         // ১. এখানে নিশ্চিত করুন ইউজারনেমটি সঠিক কিনা (যেমন: @ ছাড়া ট্রাই করুন)
                //         const username = "ahiyatest1";

                //         const response = await fetch(`https://api.httpsgamexaglobal.net/api/auth/login`, {
                //             method: "POST",
                //             "headers": {
                //                 "Content-Type": "application/json"
                //             },
                //             "body": {
                //                 "agent_code": "AG1756047904571CVP8",
                //                 "password": "123456"
                //             }
                //         });

                //         const result = await response.json();

                //         if (response.ok) {
                //              // সফল হলে ডাটা সেট হবে
                //             console.log("Agent Login:", result);
                //         } else {
                //             console.error("API Error:", result.message || result.error || "Unknown Server Error");
                //         }
                //     } catch (error) {
                //         console.error("Fetch error:", error);
                //     } finally {
                        
                //     }
                // };
                // fetchBalance();
            }
        })
        return () => {
            return unSubscrive();
        }
    }, [])

    // Auth value
    const authValue = {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogOut,
    };

    return (
        <authContext.Provider value={authValue}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider
