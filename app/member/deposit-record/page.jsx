"use client"

import { ChevronLeft, Ticket } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authContext } from '@/lib/AuthProvider';
import { ArrowDownLeft, Clock, CheckCircle2, Copy } from 'lucide-react';
import Link from 'next/link';

const Page = () => {

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
                const response = await fetch(`/api/member/deposit-record?email=${user.email}`);
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



    // এখন reward ভ্যারিয়েবলটিতে সরাসরি ওই ইউজারের ডেটাই থাকবে
    console.log("User Specific :", currentUserInfo);


    return (
        <div className='lg:hidden overflow-hidden pb-6 bg'>
            <div className="min-h-screen  flex flex-col items-center">
                {/* Container - Mobile Width */}
                <div className="w-full max-w-md  min-h-screen flex flex-col overflow-hidden">

                    {/* NEW: Dark Header Navigation Bar */}
                    <div className="bg-[#1a4d4d] px-4 py-3 flex items-center justify-between">
                        <Link href="/member" className="text-yellow-500">
                            <ChevronLeft size={28} strokeWidth={3} />
                        </Link>
                        <h1 className="text-yellow-500 text-xl font-bold tracking-wide">
                            Deposit Record
                        </h1>
                        <button className="text-white">
                            <Ticket size={24} />
                        </button>
                    </div>

                    {/* Tickets Section */}
                    <div className="px-4 mt-6 space-y-4">

                        {/* ১. প্রথমেই ডাটা ফিল্টার করে নিন */}
                        {/* Transaction List */}
                        <div className="space-y-3">
                            {currentUserInfo?.transactions && currentUserInfo.transactions.length > 0 ? (
                                currentUserInfo.transactions.map((tx) => (
                                    <div
                                        key={tx.id}
                                        className="bg-[#ffffff] border border-white/5 rounded-xl p-4 shadow-sm active:bg-[#002a2a] transition-all"
                                    >
                                        {/* Header: Type and Amount */}
                                        <div className="flex justify-between items-center pb-1 mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-700 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                                <span className="text-xs font-bold text-black uppercase tracking-wider">
                                                    {tx.transaction_type}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-lg font-black text-green-700">
                                                    +{parseFloat(tx.amount).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Footer: Date and Agent */}
                                        <div className="mt-2 flex justify-between items-center  ">
                                            <div className="text-[10px] text-black flex items-center gap-1">
                                                <span className="opacity-70">Date:</span>
                                                <span>{new Date(tx.created_at).toLocaleString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}</span>
                                            </div>
                                            <div className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-black">
                                                {tx.agent_name}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                /* Data na thakle empty state */
                                <div className="text-center py-20 opacity-30">
                                    <p className="text-sm">No transactions found</p>
                                </div>
                            )}
                        </div>


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

export default Page;