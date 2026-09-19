import React from 'react';
import { FaFacebookF, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { BsChatLeftDotsFill } from 'react-icons/bs';

const Footer = () => {
  const gameLinks = [
    'গরম খেলা', 'প্রিয় আইটেমস', 'স্লট', 'লাইভ',
    'পোকার', 'ফিশিং', 'স্পোর্টস', 'ই-স্পোর্টস', 'লটারি'
  ];

  const providerLogos = [
    'https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JL-COLOR.png',
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PG-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SPB-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PP-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PT-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/NG-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BNG-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/L22-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JDB-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MNP-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/FC-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/EZG-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AE-COLOR.png",
    "https://images.5949390294.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BOM-COLOR.png"

  ];

  return (
    <footer className="bg-[#1b1b1b] text-white p-2 md:p-12 font-sans pb-20 md:hidden py-6 ">
      <div className=" mx-auto px-4 py-3 max-sm:py-2 grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Help Center Section */}
        {/* <div className="md:col-span-2 max-sm:mt-3 text-center">
          <h2 className="text-[#ffb800] text-xl font-bold mb-1 max-sm:mb-1">সাহায্য কেন্দ্র</h2>
        </div> */}

        {/* Game Center Section */}
        {/* <div className="md:col-span-2 max-sm:hidden">
          <h2 className="text-[#ffb800] text-xl font-bold mb-4">গেম সেন্টার</h2>
          <ul className="space-y-2 text-sm text-gray-200">
            {gameLinks.map((link, index) => (
              <li key={index} className="hover:text-white cursor-pointer transition-colors">
                {link}
              </li>
            ))}
          </ul>
        </div> */}

        {/* Right Section: About & Actions */}
        {/* <div className="md:col-span-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className=" p-1 rounded-lg shrink-0">
              <img src="https://www.ck444app.net/img/footer-logo.1297e2a5.png" alt="" className='w-20' />
            </div>
            <p className="text-sm leading-relaxed text-gray-200">
              Our Website is an innovative online sportsbook and casino. Offering a wide variety of sports and betting markets with high odds, we make sure to bring you the best online experience ever! Enjoy thousands of pre-match and live sporting events and win big while supporting your favourites!
            </p>
          </div> */}

          {/* Action Buttons & Socials */}
          {/* <div className="flex flex-wrap items-center gap-4">
            <button className="bg-gradient-to-b max-sm:hidden from-[#005c54] to-[#003d37] border border-[#007b6f] px-10 py-2 rounded-md text-[#ffb800] font-bold text-lg">
              অংশীদার
            </button>
            <button className="bg-gradient-to-b from-[#00a395] to-[#007b6f] px-10 py-2 rounded-md flex items-center gap-2 font-bold text-lg">
              <BsChatLeftDotsFill className="text-[#ffb800]" />
              লাইভ চ্যাট
            </button>

            <div className="flex gap-2 items-center justify-between">
              <div className="bg-[#3b5998] p-2 rounded-full cursor-pointer"><FaFacebookF size={18} /></div>
              <div className="bg-[#0088cc] p-2 rounded-full cursor-pointer"><FaTelegramPlane size={18} /></div>
              <div className="bg-[#25d366] p-2 rounded-full cursor-pointer"><FaWhatsapp size={18} /></div>
              <div className="border-2 border-white rounded-full w-9 h-9 flex items-center justify-center text-[10px] font-bold">18+</div>
            </div>
          </div> */}

          {/* <hr className="border-gray-600" /> */}

          {/* Provider Logos Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-4 items-center transition-all duration-500">
            {providerLogos.map((logo, index) => (
              <img src={logo} key={index} className="text-[10px] md:text-xs font-bold text-center border border-transparent hover:border-gray-500 p-1" />

            ))}
          </div>
        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;