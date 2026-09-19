"use client"

import { ChevronLeft, Ticket } from 'lucide-react';
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

    // Find Login user from gaming api
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

    // Get user reward Item from Database 
    const [reward, setReward] = useState([]);
    useEffect(() => {
        const fetchUserRewards = async () => {
            // যদি ইউজার বা ইউজারের ইমেল না থাকে তবে ফেচ করার দরকার নেই
            if (!user?.email) return;

            try {
                setLoading(true);
                // ইমেলটি কুয়েরি স্ট্রিং হিসেবে পাঠানো হচ্ছে
                const response = await fetch(`/api/reward?email=${user.email}`);

                if (!response.ok) throw new Error("Reward Collect Failed");

                const data = await response.json();
                setReward(data);
            } catch (error) {
                console.error("Reward fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRewards();
    }, [user?.email]); // ইমেল চেঞ্জ হলে বা প্রথমবার লোড হলে কল হবে

    // এখন reward ভ্যারিয়েবলটিতে সরাসরি ওই ইউজারের ডেটাই থাকবে
    // console.log("User Specific :", currentUserInfo);

    // Collect User Reward
    async function handleSubmit(price) {

        try {
            // ২. এখন আমাদের তৈরি করা 'Proxy' API-তে ডেটা পাঠান
            const response = await fetch('/api/reward', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // এখানে id হচ্ছে key এবং currentUserInfo?.id হচ্ছে value
                body: JSON.stringify({
                    id: currentUserInfo?.id,
                    email: user?.email,
                    price: price
                })
            });

            const result = await response.json();

            if (result.success) {
                router.push('/');
            } else {
                alert("সার্ভার প্রসেস সফল হয়নি: " + result.error);
            }

        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    return (
        <div className='lg:hidden overflow-hidden pb-6 bg'>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center">
                {/* Container - Mobile Width */}
                <div className="w-full max-w-md bg-white min-h-screen flex flex-col overflow-hidden">

                    {/* NEW: Dark Header Navigation Bar */}
                    <div className="bg-[#1a4d4d] px-4 py-3 flex items-center justify-between">
                        <Link href="/" className="text-yellow-500">
                            <ChevronLeft size={28} strokeWidth={3} />
                        </Link>
                        <h1 className="text-yellow-500 text-xl font-bold tracking-wide">
                            Bonus
                        </h1>
                        <button className="text-white">
                            <Ticket size={24} />
                        </button>
                    </div>

                    {/* Profile Section (Previously designed) */}
                    <div className="bg-reward p-6 pb-12 rounded-b-[40px] relative">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                                <img
                                    src="https://images.5949390294.com//TCG_PROD_IMAGES/B2C/01_PROFILE/PROFILE/0.png"
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-white">
                                <p className="text-sm font-medium opacity-90">{user?.email}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <span className="text-2xl font-bold">৳ {currentUserInfo?.balance ? currentUserInfo?.balance : 0.00}</span>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Bubbles */}
                        <div className="absolute top-4 right-8 w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
                        <div className="absolute bottom-4 right-12 w-12 h-12 bg-white/10 rounded-full blur-md"></div>
                    </div>

                    {/* Tickets Section */}
                    <div className="px-4 mt-6 space-y-4">

                        {/* ১. প্রথমেই ডাটা ফিল্টার করে নিন */}
                        {(() => {
                            // শুধুমাত্র pending স্ট্যাটাস ওয়ালা রিওয়ার্ডগুলো বের করা হচ্ছে
                            const pendingRewards = reward?.flatMap(userDoc =>
                                userDoc.reward1.filter(item => item.status === "pending")
                            ) || [];

                            // ২. এখন চেক করুন pendingRewards এ কোনো ডাটা আছে কি না
                            return pendingRewards.length > 0 ? (
                                pendingRewards.map((item, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="bg-white rounded-xl shadow-md flex items-center p-3 border border-gray-100">
                                            <div className="flex-shrink-0 w-28 h-20 bg-gradient-to-br from-pink-500 to-rose-400 rounded-lg flex flex-col justify-center items-center text-white p-2 text-center">
                                                <span className="text-[10px] font-bold uppercase tracking-tighter">Reward Ticket</span>
                                                <span className="text-xs font-semibold">Prize Wheel</span>
                                                <span className="text-[10px] opacity-80 mt-1">
                                                    {new Date().getFullYear()}.
                                                    {String(new Date().getMonth() + 1).padStart(2, '0')}.
                                                    {String(new Date().getDate()).padStart(2, '0')}
                                                </span>
                                            </div>

                                            <div className="flex-grow px-3">
                                                <p className="text-[11px] text-gray-400 font-medium">Reward :</p>
                                                <p className="text-xs text-gray-700 leading-tight">{item?.title || "Cash Bonus"}</p>
                                            </div>

                                            <div className="flex flex-col items-center border-l border-dashed border-gray-200 pl-3">
                                                <div className="text-center">
                                                    <p className="text-[10px] text-gray-400">Price</p>
                                                    <p className="text-lg font-bold text-gray-800">
                                                        {item?.price} <span className="text-[10px] font-normal">Taka</span>
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => handleSubmit(item?.price)}
                                                    className="mt-2 bg-[#39D312] text-white text-[10px] font-bold py-1.5 px-4 rounded-full"
                                                >
                                                    Claim
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                /* ৩. যদি কোনো pending রিওয়ার্ড না থাকে, তবে এটি দেখাবে */
                                <div className="flex flex-col items-center justify-center py-10">
                                    <p className="text-center text-xl text-gray-500 font-medium">No rewards found!</p>
                                    
                                </div>
                            );
                        })()}

                        {/* Free Spin Ticket */}
                        {/* <div className="bg-white rounded-xl shadow-md flex items-center p-3 border border-gray-100">
                            <div className="flex-shrink-0 w-28 h-20 bg-gradient-to-br from-lime-500 to-green-500 rounded-lg flex flex-col justify-center items-center text-white p-2 text-center">
                                <span className="text-[10px] font-bold uppercase tracking-tighter">Reward Ticket</span>
                                <span className="text-xs font-semibold">Free Spin Voucher</span>
                                <span className="text-[10px] opacity-80 mt-1">2026.02.28</span>
                            </div>
                            <div className="flex-grow px-3">
                                <p className="text-[11px] text-gray-400 font-medium">Reward :</p>
                                <p className="text-xs text-gray-700 leading-tight">Feb Free Spins *5</p>
                            </div>
                            <div className="flex flex-col items-center border-l border-dashed border-gray-200 pl-3">
                                <div className="text-center">
                                    <p className="text-[10px] text-gray-400">Due Date</p>
                                    <p className="text-lg font-bold text-gray-800">1<span className="text-[10px] font-normal">Day</span></p>
                                    <p className="text-[10px] font-mono text-gray-500">20:52:27</p>
                                </div>
                                <button className="mt-2 bg-[#39D312] text-white text-[10px] font-bold py-1.5 px-4 rounded-full">
                                    Claim
                                </button>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;