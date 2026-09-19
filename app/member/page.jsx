"use client"
import {
    Trophy, Sword, BarChart2, FileText,
    History, ClipboardList, User, ShieldCheck,
    UserPlus, Gift, RefreshCcw, Mail,
    MessageSquare, Headset, LogOut, Edit2,
    ChevronRight, RotateCw, CreditCard,
    ChevronLeft,
    Ticket
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authContext } from '@/lib/AuthProvider';
import BottomNavMenu from '../shared/BottomNavMenu';
import SocialSideVar from '../shared/SocialSideVar';
import Navbar from '../shared/Navbar';
import Link from 'next/link';

const AccountPage = () => {

    const value = useContext(authContext)
    const { user } = value;
    const router = useRouter();
    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    if (!user) {
        return router.push('/login');
    }

    // Find Login user

    useEffect(() => {
        // ইউজার লগইন না থাকলে বা ইমেইল না থাকলে কল করার দরকার নেই
        if (!user?.email) return;

        const fetchUserData = async () => {
            try {
                setLoading(true);
                // আমাদের নিজেদের তৈরি করা API কল করছি
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


    const menuItems = [
        { icon: <Trophy size={28} className="text-yellow-500" />, label: "Reward Center", badge: "", link : "/reward"},
        { icon: <BarChart2 size={28} className="text-yellow-500" />, label: "Profit And Loss", link : "/member/profit-loss" },
        { icon: <FileText size={28} className="text-yellow-500" />, label: "Deposit Record", link : "/member/deposit-record" },
        { icon: <History size={28} className="text-yellow-500" />, label: "Withdrawal Record", link : "/member/withdraw-record" },
        { icon: <User size={28} className="text-yellow-500" />, label: "My Account", link : "/" },
        { icon: <ShieldCheck size={28} className="text-yellow-500" />, label: "Security Center", link : "/" },
        { icon: <UserPlus size={28} className="text-yellow-500" />, label: "Invite Friends", link : "/invite" },
        { icon: <Gift size={28} className="text-yellow-500" />, label: "Mission", badge: "", link : "/" },
        { icon: <Mail size={28} className="text-yellow-500" />, label: "Internal Message", badge: "", link : "/" },
        { icon: <Headset size={28} className="text-yellow-500" />, label: "Customer Service", link : "/" },
        { icon: <LogOut size={28} className="text-yellow-500" />, label: "Logout" ,link : "/" },
    ];

    return (
        <div className='lg:hidden overflow-hidden pb-6'>
           
            <div className="mx-auto min-h-screen font-sans pb-10 ">
                {/* Header / Top Bar */}
                 {/* NEW: Dark Header Navigation Bar */}
                    <div className="bg-[#1b1b1b] px-4 py-3 flex items-center justify-between">
                        <Link href="/" className="text-white">
                            <ChevronLeft size={26} strokeWidth={2} />
                        </Link>
                        <h1 className="text-white font-bold tracking-wide">
                            My Account
                        </h1>
                        <button className="text-white">
                            <Ticket size={22} />
                        </button>
                    </div>

                {/* Profile Card Section */}
                <div className="relative  pt-4">
                    {/* Sign In Tab */}
                    <div className="absolute top-0 right-0 bg-[#ff0000] text-white px-4 py-1 rounded-bl-xl flex items-center text-sm z-10">
                        <div className="p-0.5 mr-2">✓</div>
                        Sign In <ChevronRight size={14} className="ml-1" />
                    </div>

                    <div className="bg-gradient-to-br from-white to-blue-200 rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                        {/* Background Crown Watermark */}
                        <div className="absolute top-2 right-4 opacity-10">
                            <ShieldCheck size={120} />
                        </div>

                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                                    <img
                                        src="https://images.5949390294.com//TCG_PROD_IMAGES/B2C/01_PROFILE/PROFILE/0.png"
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 mt-1">
                                <div className="bg-gray-500 text-white text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 mb-1">
                                    <span className="text-xs">⭐</span> VIP1
                                </div>
                                <div className="flex items-center gap-2 text-gray-800 font-bold">
                                    {user?.email} <CreditCard size={14} className="text-gray-400" />
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                                    Edit Profile: unknown <Edit2 size={12} className="cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        {/* Balance Section */}
                        <div className="mt-6 flex justify-between items-end">
                            <div>
                                <span className="text-2xl font-bold text-gray-800">
                                  ৳ {currentUserInfo?.balance ? currentUserInfo?.balance : 0.00}
                                </span>
                            </div>
                            <RotateCw size={20} className="text-gray-400 cursor-pointer mb-1" />
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <Link href="/deposit" className="py-2 px-1 text-center bg-white border border-gray-200 rounded-full text-gray-600 text-sm font-medium shadow-sm active:scale-95 transition">Deposit</Link>
                            <button className="py-2 px-1 bg-white border border-gray-200 rounded-full text-gray-600 text-sm font-medium shadow-sm active:scale-95 transition">Withdrawal</button>
                        </div>
                    </div>
                </div>

                {/* Member Center Label */}
                <div className="px-4 mt-4">
                    <span className="bg-gray-200 text-gray-600 text-[10px] px-3 py-1 rounded-full font-medium">
                        Member Center
                    </span>
                    <div className="h-[1px] bg-gray-200 w-full -mt-2 ml-20"></div>
                </div>

                {/* Grid Menu */}
                <div className="grid grid-cols-4 gap-y-8 gap-x-2 p-6 mt-2">
                    {menuItems.map((item, index) => (
                        <Link href={item?.link} key={index} className="flex flex-col items-center text-center group cursor-pointer">
                            <div className="relative mb-2">
                                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center group-active:bg-yellow-100 transition">
                                    {item.icon}
                                </div>
                                {item.badge && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <span className="text-[11px] leading-tight text-gray-700 font-medium px-1">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
          
        </div>
    );
};

export default AccountPage;