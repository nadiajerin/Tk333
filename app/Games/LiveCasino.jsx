"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';

const LiveCasino = () => {
  const games = [
    { id: 1, name: 'Evolution', img: 'https://images.9734232.com/prod-images/game_icon/default/bigImage/gcs__live-eg4_1683254015799.png' },
    { id: 2, name: 'EZ', img: 'https://images.9734232.com/prod-images/game_icon/betbdt3f4/h5BigImage/gcs__live-ez_1724232599920.webp' },
    { id: 3, name: 'SEXY CASINO', img: 'https://images.9734232.com/prod-images/game_icon/betbdt3f4/h5BigImage/gcs__live-sex_1724232577452.webp' },
    { id: 4, name: 'PP', img: 'https://images.9734232.com/prod-images/game_icon/betbdt3f4/h5BigImage/gcs__live-pp_1724232586056.webp' },
    { id: 5, name: 'MG', img: 'https://images.9734232.com/prod-images/game_icon/betbdt3f4/h5BigImage/gcs__live-mg_1724232763336.avif' },
    { id: 6, name: 'PT 2', img: 'https://images.9734232.com/prod-images/game_icon/default/bigImage/gcs__live-pt_1718357678702.png' },
  ];

  return (
    <div className="bg-[#1a1d23] p-4 w-full min-h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-2">
          <div className="w-[4px] h-6 bg-[#f7a600] rounded-full"></div>
          <h2 className="text-[20px] font-bold text-[#f7a600]">Live Casino</h2>
        </div>

        <div className="flex items-center gap-2">
          <button className="prev-btn w-9 h-9 flex items-center justify-center border border-gray-700 rounded-md bg-[#252a34] text-gray-300 active:bg-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="px-6 py-1.5 border border-gray-700 rounded-md text-[14px] font-medium text-gray-300 bg-[#252a34]">
            অধিক
          </button>

          <button className="next-btn w-9 h-9 flex items-center justify-center border border-gray-700 rounded-md bg-[#252a34] text-gray-300 active:bg-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swiper Grid */}
      <div className="w-full overflow-hidden">
        <Swiper
          slidesPerView={2}
          grid={{
            rows: 2,
            fill: 'row',
          }}
          spaceBetween={12}
          navigation={{
            prevEl: '.prev-btn',
            nextEl: '.next-btn',
          }}
          modules={[Grid, Navigation]}
          className="casinoSwiper"
        >
          {games.map((game) => (
            <SwiperSlide key={game.id} className="!opacity-100">
              <div className="flex flex-col items-center mb-4">
                <div className="w-full aspect-[1.3/1] rounded-[20px] overflow-hidden border border-[#323844] bg-[#2a2f3a]">
                  <img 
                    src={game.img} 
                    alt={game.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2 text-[12px] font-bold text-gray-100 uppercase">
                  {game.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Critical CSS for Grid & Opacity */}
      <style jsx global>{`
        .casinoSwiper .swiper-wrapper {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important; /* Force items to stay in grid */
          opacity: 1 !important;
        }
        .casinoSwiper .swiper-slide {
          opacity: 1 !important; /* Ensure all images are fully visible */
          height: auto !important;
          margin-top: 0 !important;
        }
        /* Mobile adjustment to ensure 2x2 layout doesn't break */
        .swiper-grid-column > .swiper-wrapper {
            flex-direction: row !important;
        }
      `}</style>
    </div>
  );
};

export default LiveCasino;