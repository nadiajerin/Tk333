"use client"

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { MdAddCard } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import { authContext } from "@/lib/AuthProvider";

const Navbar = () => {
  // Find Login user
  const value = useContext(authContext)
  const { user } = value;
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/get-player?email=${user.email}`);
        const result = await response.json();

        if (response.ok) {
          setCurrentUserInfo(result);
        } else {
          setError(result.message || "User not found");
        }
      } catch (err) {
        setError("Failed to load user info");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.email]);

  return (
    <nav className="bg-[#1a1d23] px-3 py-3 flex items-center justify-between lg:hidden">
      {/* Left Section: Menu & Logo */}
      <div className="flex items-center gap-3">
        {/* Hamburger Menu Icon (Custom Styled) */}
        <div className="flex flex-col gap-[4px] cursor-pointer">
          <span className="w-6 h-[3px] bg-gradient-to-r from-[#fcd34d] to-[#b45309] rounded-full"></span>
          <span className="w-6 h-[3px] bg-gradient-to-r from-[#fcd34d] to-[#b45309] rounded-full"></span>
          <span className="w-6 h-[3px] bg-gradient-to-r from-[#fcd34d] to-[#b45309] rounded-full"></span>
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center leading-tight">
          <Link href="/">
            <h1 className="text-3xl font-black italic tracking-tighter flex">
              <span className="text-[#ff00ff]">Tk</span>
              <span className="text-[#ffcc00]">333</span>
            </h1>
            <div className="flex items-center gap-1">
               <span className="h-[1px] w-4 bg-gray-400"></span>
               <span className="text-[10px] text-white font-medium uppercase tracking-widest">Tk333.com</span>
               <span className="h-[1px] w-4 bg-gray-400"></span>
            </div>
          </Link>
        </div>
      </div>

      {user ? (
        /* Logged In View */
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="relative">
            <img
              src="https://images.5949390294.com//TCG_PROD_IMAGES/B2C/01_PROFILE/PROFILE/0.png"
              alt="avatar"
              className="w-9 h-9 rounded-full border-2 border-yellow-400 shadow-lg"
            />
          </div>

          {/* Balance Box */}
          <div className="flex items-center gap-1.5 bg-[#0a0c0f] border border-[#00ffd5]/30 rounded-full px-3 py-1.5">
            <div className="w-4 h-4 flex items-center justify-center bg-[#00ffd5] rounded-full text-black text-[10px] font-bold">
              ৳
            </div>
            <span className="text-[#00ffd5] text-xs font-bold">
              {currentUserInfo?.balance ? currentUserInfo?.balance : "0.00"}
            </span>
          </div>
          
          {/* Action Buttons for Logged In User */}
          {/* <Link href="/deposit" className="p-2 bg-gradient-to-b from-[#ffd84d] to-[#f0b400] text-[#e43216] rounded-md">
             <MdAddCard className="text-xl" />
          </Link> */}
        </div>
      ) : (
        /* Logged Out View (Same as Image) */
        <div className="flex items-center gap-2">
          <Link 
            href="/register" 
            className="bg-gradient-to-b from-[#f8fafc] to-[#cbd5e1] text-[#334155] px-4 py-1.5 rounded-full text-sm font-bold shadow-md active:scale-95 transition-all"
          >
            নিবন্ধন
          </Link>
          <Link 
            href="/login" 
            className="bg-gradient-to-b from-[#ffcc33] to-[#ee9900] text-[#1e293b] px-5 py-1.5 rounded-full text-sm font-bold shadow-md active:scale-95 transition-all"
          >
            লগইন
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
