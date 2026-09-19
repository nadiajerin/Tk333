"use client"

import { authContext } from '@/lib/AuthProvider';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

const BkashDeposit = () => {

    // Find user
    const value = useContext(authContext)
    const { user } = value;
    const router = useRouter();

    if (!user) {
        return router.push('/register');
    }

    const handleDeposit = async (method) => {
        try {
            const res = await fetch("/api/deposit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: "500", // ইউজার ইনপুট থেকে নিলে dynamic করবেন
                    paymentMethod: "bkash",
                }),
            });

            const data = await res.json();

            // গুরুত্বপূর্ণ পরিবর্তন এখানে:
            // আপনার API রেসপন্স অনুযায়ী data.payment_url চেক করুন
            if (data.success && data.payment_url) {
                window.location.href = data.payment_url; // এটি ইউজারকে পেমেন্ট পেজে নিয়ে যাবে
            } else {
                console.error("Error details:", data);
                alert("Payment failed: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Something went wrong!");
        }
    };


    const [selectedChannel, setSelectedChannel] = useState('channel-1');
    const [selectedAmount, setSelectedAmount] = useState(100);

    const channels = [
        { id: 'channel-1', label: 'চ্যানেল ২ ৬' },
        { id: 'channel-2', label: 'চ্যানেল ২ ১০' },
        { id: 'channel-3', label: 'চ্যানেল ২ ৫' },
        { id: 'channel-4', label: 'চ্যানেল ২ ৯' },
    ];

    const amounts = [100, 200, 500, 800, 1000, 2000, 5000, 8000, 10000, 30000];

    return (
        <div className="bg-white min-h-screen font-sans text-[#333] max-w-[480px] mx-auto pb-20 overflow-x-hidden antialiased">

            {/* ১. আমানতের মোড */}
            <div className="px-4 py-5">
                <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f39c12]"></div>
                    <h2 className="font-bold text-[15px] text-[#2c3e50] tracking-tight">আমানতের মোড</h2>
                </div>

                {/* Bkash Card */}
                <div className="w-[110px] relative flex flex-col items-center justify-center p-3.5 border border-[#e74c3c] rounded-xl bg-[#fff5f5]">
                    <div className="w-10 h-10 mb-1.5">
                        <img
                            src="https://images.9734232.com/mcs-images/bank_type/BKASH/BN_2_20240312225413337.png"
                            alt="Bkash"
                            className="w-full h-full object-contain rounded-md"
                        />
                    </div>
                    <span className="font-bold text-[12px] text-[#e74c3c]">Bkash</span>

                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#e74c3c] clip-path-select flex items-end justify-end">
                        <svg className="w-3 h-3 text-white mb-0.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <p className="text-[#e74c3c] text-[12.5px] leading-[1.4] mt-4 font-medium opacity-90">
                    আপনাকে <span className="font-bold underline">trxid</span> পূরণ করতে হবে। আপনি যদি রিচার্জটি পূরণ না করেন তবে রিচার্জটি জমা হবে না
                </p>
            </div>

            <div className="h-2 bg-[#f8f9fa] border-y border-[#eee]"></div>

            {/* ২. পেমেন্ট চ্যানেল */}
            <div className="px-4 py-5">
                <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1abc9c]"></div>
                    <h2 className="font-bold text-[15px] text-[#2c3e50] tracking-tight">পেমেন্ট চ্যানেল</h2>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                    {channels.map((ch) => (
                        <button
                            key={ch.id}
                            onClick={() => setSelectedChannel(ch.id)}
                            className={`py-3 px-1 text-center border rounded-lg text-[12px] font-bold transition-all ${selectedChannel === ch.id
                                ? 'border-[#e74c3c] text-[#e74c3c] bg-[#fff5f5]'
                                : 'border-[#eee] text-[#555] bg-white'
                                }`}
                        >
                            {ch.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ৩. জমা পরিমাণ */}
            <div className="px-4 py-5">
                <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9b59b6]"></div>
                    <h2 className="font-bold text-[15px] text-[#2c3e50] tracking-tight">জমা পরিমাণ</h2>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-5">
                    {amounts.map((amt) => (
                        <button
                            key={amt}
                            onClick={() => setSelectedAmount(amt)}
                            className={`relative py-2.5 text-center border rounded-md text-[11px] font-bold transition-all ${selectedAmount === amt
                                ? 'border-[#e74c3c] text-[#e74c3c] bg-[#fff5f5]'
                                : 'border-[#eee] text-[#666]'
                                }`}
                        >
                            {amt.toLocaleString()}
                            {selectedAmount === amt && (
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#e74c3c] clip-path-select flex items-end justify-end">
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Display Amount Box */}
                <div className="flex items-center justify-between border border-[#d6eaf8] rounded-xl p-3 bg-[#fdfeff]">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-gray-400">৳</span>
                        <span className="text-md font-bold text-[#111]">{selectedAmount}</span>
                    </div>
                    {/* <div className="w-7 h-7 bg-[#3498db] rounded-full flex items-center justify-center text-white shadow-sm active:scale-95 transition-transform">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </div> */}
                </div>
            </div>

            {/* Submit Button */}
            <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto border-t border-[#eee] bg-white ">
                <button onClick={() => handleDeposit("bkash")} className="w-full bg-[#f81900] text-white py-3  text-[16px] font-bold active:bg-[#c0392b] transition-all shadow-md">
                    পরবর্তী
                </button>
            </div>

            <style jsx>{`
        .clip-path-select {
          clip-path: polygon(100% 0, 0% 100%, 100% 100%);
        }
      `}</style>
        </div>
    );
};

export default BkashDeposit;