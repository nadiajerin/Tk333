"use client"

import { Send, Inbox, ChevronLeft, Ticket } from 'lucide-react';
import Link from 'next/link';
import {
    Facebook,
    MessageCircle,
    Share2,
    Copy,
    HelpCircle,
    Trophy
} from 'lucide-react';
import { useContext } from 'react';
import { authContext } from '@/lib/AuthProvider';


const Page = () => {
    const stats = [
        { label: "Today's Income", value: "--", bg: "bg-gradient-to-r from-blue-400 to-blue-500" },
        { label: "Yesterday's Income", value: "--", bg: "bg-gradient-to-r from-purple-300 to-purple-400" },
        { label: "Registers", value: "--", bg: "bg-gradient-to-r from-purple-300 to-purple-400" },
        { label: "Valid Referral", value: "--", bg: "bg-gradient-to-r from-blue-400 to-blue-500" },
    ];


    // Find Login user
    const value = useContext(authContext)
    const { user } = value;

    return (
        <div className='bg-white'>
            {/* NEW: Dark Header Navigation Bar */}
            <div className="bg-[#1b1b1b] px-4 py-3 flex items-center justify-between">
                <Link href="/" className="text-yellow-500">
                    <ChevronLeft size={28} strokeWidth={3} />
                </Link>
                <h1 className="text-yellow-500 text-xl font-bold tracking-wide">
                    Invite Friends
                </h1>
                <button className="text-white">
                    <Ticket size={24} />
                </button>
            </div>

            <div className='lg:hidden overflow-hidden pb-6  __container'>
                <div className="min-h-screen  flex flex-col items-center">
                    {/* Container - Mobile Width */}
                    <div className="w-full max-w-md  min-h-screen flex flex-col overflow-hidden">



                        {/* 4-Grid Stats Section */}
                        <div className="grid grid-cols-2 gap-3 mb-4 mt-4">
                            {stats.map((stat, index) => (
                                <div key={index} className={`${stat.bg} rounded-lg text-center text-white shadow-sm h-24 flex flex-col justify-center`}>
                                    <p className="text-sm font-medium opacity-90 mb-1">{stat.label}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Referral Code Card */}
                        <div className="bg-[#149ff0] rounded-2xl p-5 border border-[#ffffff] mb-4">
                            <label className="text-black text-sm mb-3 block font-medium">
                                Your Referral Code
                            </label>
                            <div className="flex gap-3">
                                <div className="flex-1 bg-[#ffffff] rounded-xl px-4 py-4 flex items-center border border-[#165a4a]">
                                    <span className="text-black font-normal tracking-wider">{user?.email ? user.email.split('@')[0] : 'GUEST'}/ahiya.com</span>
                                </div>
                                <button className="bg-[#ffffff] hover:bg-[#d9a70a] text-[#063327] p-4 rounded-xl shadow-lg transition-colors">
                                    <Copy size={24} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>

                        {/* Referral Link Card */}
                        <div className="bg-[#440b2c] rounded-2xl p-5 border border-[#165a4a] mb-6">
                            <label className="text-gray-300 text-sm mb-3 block font-medium">
                                Your Referral Link
                            </label>
                            <div className="flex gap-3">
                                <div className="flex-1 bg-[#ffffff] rounded-xl px-4 py-4 flex items-center border border-[#ffffff] overflow-hidden">
                                    <span className="text-black text-sm truncate opacity-90">
                                        https://ahiya.lovable.app/registe...
                                    </span>
                                </div>
                                <button className="bg-[#ffffff] hover:bg-[#d9a70a] text-[#063327] p-4 rounded-xl shadow-lg transition-colors">
                                    <Copy size={24} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>

                        {/* Social Share Grid */}
                        <div className="grid grid-cols-3 gap-3">
                            {/* WhatsApp */}
                            <button className="flex flex-col items-center justify-center bg-[#24be51] hover:bg-[#1ea948] py-4 rounded-2xl text-white transition-all active:scale-95">
                                <Share2 size={28} className="mb-2" />
                                <span className="text-[11px] font-bold">WhatsApp</span>
                            </button>

                            {/* Facebook */}
                            <button className="flex flex-col items-center justify-center bg-[#1877f2] hover:bg-[#166fe5] py-4 rounded-2xl text-white transition-all active:scale-95">
                                <Share2 size={28} className="mb-2" />
                                <span className="text-[11px] font-bold">Facebook</span>
                            </button>

                            {/* Telegram */}
                            <button className="flex flex-col items-center justify-center bg-[#33a8e3] hover:bg-[#2e97cc] py-4 rounded-2xl text-white transition-all active:scale-95">
                                <Share2 size={28} className="mb-2" />
                                <span className="text-[11px] font-bold">Telegram</span>
                            </button>
                        </div>

                        {/* Footer Text */}
                        <div className="mt-6 text-center">
                            <h4 className="text-[#1a1a4b] text-xl font-bold">Rewards Released to Date</h4>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    );
};

export default Page;