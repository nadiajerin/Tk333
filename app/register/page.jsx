"use client"
import { FaGoogle } from 'react-icons/fa';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authContext } from '@/lib/AuthProvider';

const RegistrationPage = () => {
    const value = useContext(authContext);
    const { handleRegister } = value;
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;

        if (password.length < 6) {
            alert('পাসওয়ার্ডটি ৬ অক্ষরের হওয়া উচিত।');
            return;
        }

        try {
            const userCredential = await handleRegister(email, password);

            if (userCredential.user) {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const result = await response.json();

                if (result.success) {
                    router.push('/');
                } else {
                    alert("সার্ভার প্রসেস সফল হয়নি: " + result.error);
                }
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center p-6 font-sans text-white">
            
            {/* Top Navigation */}
            <div className="w-full flex justify-between items-center mb-10">
                <Link href="/login" className="bg-[#e8f0fe] text-black px-8 py-2 rounded-full font-bold text-sm shadow-inner">
                    লগইন
                </Link>
                <Link href="/" className="text-2xl cursor-pointer text-white">✕</Link>
            </div>

            {/* Logo Section */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black italic tracking-tighter">
                    <span className="text-[#ff00ff]">19</span>
                    <span className="text-[#ffcc00]">99</span>
                </h1>
                <div className="flex items-center justify-center gap-1 mt-1">
                    <div className="h-[1px] w-4 bg-gray-500"></div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">1999.vip</span>
                    <div className="h-[1px] w-4 bg-gray-500"></div>
                </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
                
                {/* Full Name Input */}
                <div className="relative flex items-center">
                    <span className="absolute -left-4 text-red-500 text-xl font-bold">*</span>
                    <input
                        type="text"
                        name="name"
                        placeholder="আপনার নাম"
                        required
                        className="w-full bg-[#121212] border-none rounded-md py-4 px-4 text-white placeholder-gray-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                    />
                </div>

                {/* Email Input */}
                <div className="relative flex items-center">
                    <span className="absolute -left-4 text-red-500 text-xl font-bold">*</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="জিমেল"
                        required
                        className="w-full bg-[#121212] border-none rounded-md py-4 px-4 text-white placeholder-gray-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                    />
                </div>

                {/* Password Input */}
                <div className="relative flex items-center">
                    <span className="absolute -left-4 text-red-500 text-xl font-bold">*</span>
                    <input
                        type="password"
                        name="password"
                        placeholder="পাসওয়ার্ড"
                        required
                        className="w-full bg-[#121212] border-none rounded-md py-4 px-4 text-white placeholder-gray-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                    />
                </div>

                {/* User Agreement */}
                <div className="flex items-start gap-3 mt-4">
                    <input type="checkbox" className="w-5 h-5 mt-1 accent-yellow-500 rounded bg-transparent border-gray-600" checked readOnly />
                    <p className="text-[13px] text-gray-200 leading-snug">
                        আমি ১৮ বছরের এবং এই শর্তাদি গ্রহণ করতে সম্মত <span className="text-yellow-500 border-b border-yellow-500 font-bold">ব্যবহারের শর্ত</span>
                    </p>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full py-3 mt-4 bg-gradient-to-r from-[#ffe17d] via-[#ffcc4d] to-[#ffb321] text-black font-bold text-lg rounded-full shadow-lg active:scale-95 transition-transform"
                >
                    নিবন্ধন
                </button>

                {/* Or Divider */}
                {/* <div className="relative flex py-6 items-center">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="flex-shrink mx-4 text-white text-sm font-bold">অথবা</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div> */}

                {/* Google Login */}
                {/* <div className="flex justify-center">
                    <button type="button" className="flex items-center gap-2 bg-[#db4437] text-white px-10 py-3 rounded-full font-bold shadow-md">
                        <FaGoogle /> Google
                    </button>
                </div> */}

                {/* Footer Link */}
                <p className="text-center text-gray-400 mt-10 mb-4 text-sm">
                    ইতিমধ্যে একটি অ্যাকাউন্ট আছে <Link href="/login" className="text-yellow-500 ml-1 border-b border-yellow-500 font-semibold">লগইন</Link>
                </p>
            </form>
        </div>
    );
};

export default RegistrationPage;