import { Send, Inbox, ChevronLeft, Ticket } from 'lucide-react';
import Link from 'next/link';

const Page = () => {

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
                            Profit & Loss
                        </h1>
                        <button className="text-white">
                            <Ticket size={24} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
                        {/* Container for the illustration */}
                        <div className="relative mb-6">

                            {/* Decorative Stars/Sparkles using absolute positioning */}
                            <div className="absolute -top-4 -left-8 text-[#f0b400] animate-pulse">✦</div>
                            <div className="absolute -top-10 left-4 text-[#f0b400] text-xs">●</div>
                            <div className="absolute -top-2 -right-6 text-[#f0b400]">✦</div>
                            <div className="absolute top-8 -right-10 text-[#f0b400] text-xs">●</div>
                            <div className="absolute top-12 -left-10 text-[#f0b400]  text-sm">✦</div>

                            {/* The Paper Plane */}
                            <div className="absolute -top-12 right-0 transform rotate-[-10deg] animate-bounce">
                                <Send size={44} className="text-[#f0b400] fill-[#f0b400]" />
                            </div>

                            {/* Dotted Path */}
                            <svg
                                className="absolute -top-6 left-2 w-16 h-12"
                                viewBox="0 0 50 50"
                                fill="none"
                            >
                                <path
                                    d="M10,40 Q25,10 40,0"
                                    stroke="#60a5fa"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    className="opacity-60"
                                />
                            </svg>

                            {/* The Box (Inbox Icon) */}
                            <div className="relative z-10">
                                <Inbox
                                    size={100}
                                    strokeWidth={1}
                                    className="text-[#f0b400]"
                                />
                            </div>
                        </div>

                        {/* Text Label */}
                        <h2 className="text-2xl font-normal text-black tracking-wide">
                            No data
                        </h2>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Page;