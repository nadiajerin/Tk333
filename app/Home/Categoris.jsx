import React from 'react';

const Categoris = () => {
  const categories = [
    {
      id: 1,
      title: "JILI স্লট",
      logo: "https://i.ibb.co.com/tpywf04R/101.png", // Replace with actual JILI logo
      isLarge: true,
      bg: "bg-gradient-to-b from-[#2c343f] to-[#1a1f26]",
    },
    {
      id: 2,
      title: "PG স্লট",
      logo: "https://i.ibb.co.com/whXnvV9S/102.png", // Replace with actual PG logo
      isLarge: true,
      bg: "bg-gradient-to-b from-[#2c343f] to-[#1a1f26]",
    },
    {
      id: 3,
      title: "স্লট খেলা",
      icon: "https://i.ibb.co.com/k6zq9WsK/103.png", // Replace with slot icon image
      isLarge: false,
      bg: "bg-gradient-to-b from-[#2c343f] to-[#1a1f26]",
    },
    {
      id: 4,
      title: "লাইভ ক্যাসিনো",
      icon: "https://i.ibb.co.com/k6zq9WsK/103.png", // Replace with roulette icon image
      isLarge: false,
      bg: "bg-gradient-to-b from-[#2c343f] to-[#1a1f26]",
    },
    {
      id: 5,
      title: "মাছ ধরা খেলা",
      icon: "https://i.ibb.co.com/hxgsgrNR/104.png", // Replace with fish icon image
      isLarge: false,
      bg: "bg-gradient-to-b from-[#2c343f] to-[#1a1f26]",
    },
  ];

  return (
    <div className="bg-[#0f1217] p-1 ">
      <div className="grid grid-cols-6 gap-2 max-w-xl mx-auto">
        
        {/* Top Row: Two Large Cards */}
        {categories.filter(c => c.isLarge).map((item) => (
          <div 
            key={item.id} 
            className={`col-span-3 flex items-center justify-center gap-2 px-1 py-4 rounded-xl border border-gray-700/30 ${item.bg} shadow-lg`}
          >
            {/* Logo/Image Placeholder */}
            <img src={item.id === 1 ? item?.logo : item?.logo} alt="" className='w-20'/>
            <span className=" text-lg font-bold tracking-wide text-[#fdc640]">
              {item.title}
            </span>
          </div>
        ))}

        {/* Bottom Row: Three Small Cards */}
        {categories.filter(c => !c.isLarge).map((item) => (
          <div 
            key={item.id} 
            className={`col-span-2 flex flex-row items-center justify-center gap-2 px-1 py-2 rounded-xl border border-gray-700/30 ${item.bg} shadow-md`}
          >
            {/* Icon Placeholder */}
             <img src={item?.icon} alt="" className='w-10'/>
            <span className="text-[#fdc640] text-[12px] font-semibold leading-tight">
              {item?.title}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Categoris;