import { HiHome } from 'react-icons/hi';
import { MdOutlineCardGiftcard, MdOutlinePersonOutline } from 'react-icons/md';
import { FaTrophy } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import Link from 'next/link';

const BottomNavMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="relative h-20 flex items-end">
        
        {/* Background SVG for the curved shape */}
        <div className="absolute inset-0 z-0">
          <svg
            viewBox="0 0 400 60"
            className="w-full h-full drop-shadow-[0_-5px_10px_rgba(0,0,0,0.5)]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 L150,20 C170,20 175,55 200,55 C225,55 230,20 250,20 L400,20 L400,60 L0,60 Z"
              fill="#1e242e" // ছবির ডার্ক গ্রে কালার
            />
          </svg>
        </div>

        {/* Navigation Items Container */}
        <div className="relative z-10 w-full flex justify-around items-center py-2 px-2">
          
          {/* Home */}
          <Link href="/" className="flex flex-col items-center flex-1">
            <HiHome className="text-white text-2xl mb-1" />
            <span className="text-white text-[11px]">হোম</span>
          </Link>

          {/* Promotion */}
          <Link href="/promotion" className="flex flex-col items-center flex-1">
            <MdOutlineCardGiftcard className="text-[#fbbd27] text-2xl mb-1" />
            <span className="text-[#fbbd27] text-[11px]">প্রমোশন</span>
          </Link>

          {/* Center Agent Button (The Floating Circle) */}
          <div className="flex-1 flex justify-center -translate-y-6">
            <Link href="/invite" className="group">
              <div className="relative">
                {/* Golden Outer Glow/Border */}
                <div className="absolute -inset-1 bg-gradient-to-b from-yellow-200 to-yellow-600 rounded-full blur-[2px]"></div>
                
                {/* Main Button */}
                <div className="relative bg-[#1e242e] border-2 border-yellow-500 w-14 h-14 rounded-full flex items-center justify-center">
                  <div className="bg-gradient-to-b from-yellow-300 to-yellow-600 p-2 rounded-full">
                    <IoShareSocialOutline className="text-black text-2xl" />
                  </div>
                </div>
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[#fbbd27] text-[11px] font-bold whitespace-nowrap">
                  এজেন্ট
                </span>
              </div>
            </Link>
          </div>

          {/* Reward */}
          <Link href="/reward" className="flex flex-col items-center flex-1">
            <FaTrophy className="text-[#fbbd27] text-2xl mb-1" />
            <span className="text-[#fbbd27] text-[11px]">পুরস্কার</span>
          </Link>

          {/* Member */}
          <Link href="/member" className="flex flex-col items-center flex-1">
            <div className="bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-full p-0.5">
               <MdOutlinePersonOutline className="text-black text-2xl bg-[#fbbd27] rounded-full" />
            </div>
            <span className="text-[#fbbd27] text-[11px] mt-1">সদস্য</span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default BottomNavMenu;