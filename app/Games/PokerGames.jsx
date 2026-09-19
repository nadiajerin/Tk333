"use client"

import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay, Navigation } from "swiper/modules";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

import { useRouter } from "next/navigation";
import { authContext } from "@/lib/AuthProvider";
import LoadingSkeleton from "../utils/LoadingSkeleton";

export const PokerGames = () => {
    // Find user
    const value = useContext(authContext);
    const { user } = value;
    const router = useRouter();

    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    const [games, setAllgames] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // ১. গেমস লোড করা
                const gameRes = await fetch('/api/games', {
                    method: 'POST',
                    body: JSON.stringify({ action: "fetch_games" })
                });
                const gameData = await gameRes.json();
                setAllgames(gameData);

                // ২. লগইন করা থাকলে ইউজার ডাটা বের করা
                if (user?.email) {
                    const userRes = await fetch('/api/games', {
                        method: 'POST',
                        body: JSON.stringify({ action: "fetch_user", email: user.email })
                    });
                    const userData = await userRes.json();
                    setCurrentUserInfo(userData);
                }
            } catch (error) {
                console.error("Initialization error:", error);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, [user?.email]);

    const playGames = async (game_uid) => {
        if (!user) return router.push('/login');
        if (!currentUserInfo?.id) return alert("User balance data not found.");

        try {
            const response = await fetch('/api/games', {
                method: 'POST',
                body: JSON.stringify({
                    action: "launch_game",
                    player_id: currentUserInfo.id,
                    game_uid: game_uid
                })
            });
            const data = await response.json();

            if (data.game_launch_url) {
                window.open(data.game_launch_url, '_blank');
            } else {
                alert(data.message || "Error launching game");
            }
        } catch (error) {
            alert("Network error. Try again.");
        }
    };

    if (loading) return <LoadingSkeleton />;

    return (
        <div className="mx-auto py-2 px-3 bg-[#1a1d23]">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#ffcc00] rounded-full"></span>
                    <h2 className="text-[#ffcc00] text-xl font-bold uppercase">Poker</h2>
                </div>

                <div className="flex items-center gap-2">
                    {/* Navigation Buttons with unique class for Slots */}
                    <button className="slots-prev-btn w-8 h-8 flex items-center justify-center rounded-md border border-gray-600 text-white active:bg-gray-700 transition-colors">
                        <FaChevronLeft size={14} />
                    </button>
                    <button className="bg-[#2c343f] text-[#cbd5e1] px-4 py-1 rounded-md text-sm font-medium border border-gray-600 shadow-sm hover:bg-[#374151] transition-colors">
                        অধিক
                    </button>
                    <button className="slots-next-btn w-8 h-8 flex items-center justify-center rounded-md border border-gray-600 text-white active:bg-gray-700 transition-colors">
                        <FaChevronRight size={14} />
                    </button>
                </div>
            </div>

            <Swiper
                slidesPerView={3} // মোবাইলে ৩টি গেম কলাম
                grid={{
                    rows: 3, // এখানে ৩টি সারি (3 lines) সেট করা হয়েছে
                    fill: "row",
                }}
                spaceBetween={10}
                loop={false}
                navigation={{
                    nextEl: ".slots-next-btn",
                    prevEl: ".slots-prev-btn",
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: { slidesPerView: 3, grid: { rows: 3 } },
                    768: { slidesPerView: 4, grid: { rows: 3 } },
                    1024: { slidesPerView: 6, grid: { rows: 3 } }, // পিসিতে ৬টি কলাম ৩টি সারিতে
                }}
                modules={[Grid, Autoplay, Navigation]}
                className="gameSwiper !pb-4"
            >
                {games?.games && Array.isArray(games.games) && games?.games
                    .filter(game => game.game_type === "card")
                    .slice(0, 60)
                    .map((game) => (
                        <SwiperSlide key={game.id} className="!h-auto">
                            <div 
                                onClick={() => playGames(game.game_uid)} 
                                className="relative cursor-pointer flex flex-col items-center group"
                            >
                                {/* Card Container */}
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gray-700 shadow-lg bg-[#001f1f]">
                                    <img 
                                        src={game?.image_url} 
                                        alt={game?.game_name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    
                                    {/* Favorite Heart Icon */}
                                    <div className="absolute top-1.5 right-1.5 p-1 bg-black/20 backdrop-blur-sm rounded-full">
                                        <FaHeart className="text-white/80 text-[12px]" />
                                    </div>
                                </div>

                                {/* Game Name */}
                                <p className="mt-1.5 text-white text-[11px] font-medium text-center truncate w-full px-1">
                                    {game?.game_name || "গেমের নাম"}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>

            {/* Custom Styling for Grid and Opacity Fix */}
            <style>{`
                .gameSwiper .swiper-slide {
                    opacity: 1 !important;
                }
                
                /* গ্রিডের রোগুলোর মাঝখানের গ্যাপ ফিক্স */
                .gameSwiper .swiper-grid-column > .swiper-slide {
                    margin-top: 15px !important;
                    margin-bottom: 0px !important;
                }

                /* প্রথম লাইনের কার্ডগুলোর উপরের মার্জিন ০ করা (মোবাইল/ট্যাব) */
                .gameSwiper .swiper-slide:nth-child(-n+3) {
                    margin-top: 0 !important;
                }

                /* ডেস্কটপের জন্য (যেখানে স্লাইড ৬টি) প্রথম লাইনের মার্জিন ০ করা */
                @media (min-width: 1024px) {
                    .gameSwiper .swiper-slide:nth-child(-n+6) {
                        margin-top: 0 !important;
                    }
                }
                
                /* সোয়াইপার গ্রিড স্ট্রাকচার ফিক্স */
                .swiper-grid-column {
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </div>
    );
};