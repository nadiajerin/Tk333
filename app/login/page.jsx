"use client"
import { FaGoogle } from 'react-icons/fa';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authContext } from '@/lib/AuthProvider';

const RegistrationPage = () => {
    const value = useContext(authContext);
    const { handleLogin } = value;
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (password.length < 6) {
            alert('পাসওয়ার্ডটি ৬ অক্ষরের হওয়া উচিত।');
            return;
        }

        try {
            const userCredential = await handleLogin(email, password);
            const user = userCredential.user;

            if (user) {
                router.push('/');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    return (
        // মেইন কন্টেইনার - ইমেজের মতো ডার্ক ব্যাকগ্রাউন্ড
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center p-6 font-sans text-white">

            {/* Top Navigation - Registration/Close */}
            <div className="w-full flex justify-between items-center mb-12">
                <Link href="/register" className="bg-[#e8f0fe] text-black px-6 py-2 rounded-full font-bold text-sm">
                    নিবন্ধন
                </Link>
                <Link href="/" className="text-2xl cursor-pointer">✕</Link>
            </div>

            {/* Logo Section */}
            <div className="text-center mb-10">
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

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">

                {/* Email/Username Input */}
                <input
                    type="text"
                    name="email"
                    placeholder="ব্যবহারকারী ইমেল"
                    required
                    className="w-full bg-[#121212] border-none rounded-md py-4 px-4 text-white placeholder-gray-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                />

                {/* Password Input */}
                <input
                    type="password"
                    name="password"
                    placeholder="পাসওয়ার্ড"
                    required
                    className="w-full bg-[#121212] border-none rounded-md py-4 px-4 text-white placeholder-gray-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                />

                {/* Remember & Forgot Password */}
                <div className="flex justify-between items-center px-1">
                    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 accent-yellow-500 bg-transparent border-gray-500" checked readOnly />
                        মনে রাখুন
                    </label>
                    <Link href="#" className="text-yellow-500 text-sm border-b border-yellow-500">
                        পাসওয়ার্ড ভুলে গেছেন?
                    </Link>
                </div>

                {/* Login Button - ইমেজের মতো গোল্ডেন গ্রেডিয়েন্ট */}
                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-gradient-to-r from-[#ffe17d] via-[#ffcc4d] to-[#ffb321] text-black font-bold text-lg rounded-full shadow-lg active:scale-95 transition-transform"
                >
                    লগইন
                </button>

                {/* Divider */}
                {/* <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-sm font-bold uppercase">or login with</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div> */}

                {/* Social Login */}
                {/* <div className="flex justify-center">
                    <button type="button" className="flex items-center gap-2 bg-[#db4437] px-8 py-2 rounded-full font-bold">
                        <FaGoogle className="text-white" /> Google
                    </button>
                </div> */}

                {/* Footer Link */}
                <p className="text-center text-gray-400 mt-8">
                    এখনও কোনও অ্যাকাউন্ট নেই?
                    <Link href="/register" className="text-yellow-500 ml-1 border-b border-yellow-500">নিবন্ধন</Link>
                </p>
            </form>
        </div>
    );
};

export default RegistrationPage;