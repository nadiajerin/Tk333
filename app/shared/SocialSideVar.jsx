import Link from 'next/link';
import React from 'react';
import { FaWhatsapp, FaFacebookF, FaTelegramPlane } from 'react-icons/fa';

const SocialSideVar = () => {
  return (
    <div className="fixed right-2 bottom-0 -translate-y-1/2 flex flex-col gap-6 z-50">
      
      {/* WhatsApp - Simple Green Circle */}
      <Link href="https://wa.me/8801778229692" className="max-sm:w-10 mx-auto max-sm:h-10 w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
        <FaWhatsapp className="text-white text-3xl" />
      </Link>

      {/* Facebook - 3D Orb with Gold Accents */}
      <Link href="https://www.facebook.com/ahmed.ahiya.NA/" className="relative group cursor-pointer hover:scale-110 transition-transform">
        {/* The Outer Glowing Ring */}
        <div className="max-sm:w-10 mx-auto max-sm:h-10 w-12 h-12 rounded-full bg-gradient-to-b from-green-400 to-green-700 p-[2px] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          {/* Inner Blue Content */}
          <div className="w-full h-full bg-[#3b5998] rounded-full flex flex-col items-center justify-start pt-2 relative overflow-hidden">
            <FaFacebookF className="text-white text-2xl relative z-10" />
            
            {/* Gold/Coins Graphic at bottom */}
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-yellow-600 via-yellow-400 to-transparent flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-sm"></span>
                  <span className="w-2 h-2 bg-yellow-200 rounded-full shadow-sm"></span>
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-sm"></span>
                </div>
                <span className="text-[6px] leading-tight font-bold text-black uppercase">Bonus</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Telegram - 3D Orb with Gold Accents */}
      <Link href="https://t.me/bd_na" className="relative group cursor-pointer hover:scale-110 transition-transform">
        {/* The Outer Glowing Ring */}
        <div className="max-sm:w-10 mx-auto max-sm:h-10 w-12 h-12 rounded-full bg-gradient-to-b from-green-400 to-green-700 p-[2px] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
          {/* Inner Cyan Content */}
          <div className="w-full h-full bg-[#0088cc] rounded-full flex flex-col items-center justify-start pt-2 relative overflow-hidden">
            <FaTelegramPlane className="text-white text-2xl relative z-10 translate-x-[-1px]" />
            
            {/* Gold/Coins Graphic at bottom */}
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-yellow-600 via-yellow-400 to-transparent flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-sm"></span>
                  <span className="w-2 h-2 bg-yellow-200 rounded-full shadow-sm"></span>
                  <span className="w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-sm"></span>
                </div>
                <span className="text-[6px] leading-tight font-bold text-black uppercase">Bonus</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

    </div>
  );
};

export default SocialSideVar;
