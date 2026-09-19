"use client"

import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay } from "swiper/modules";
import { FaHeart } from "react-icons/fa";

// Swiper styles
import "swiper/css";
import "swiper/css/grid";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { authContext } from "@/lib/AuthProvider";
import LoadingSkeleton from "../utils/LoadingSkeleton";

export const LotteryGames = () => {

    // Find user
    const value = useContext(authContext)
    const { user } = value;
    const router = useRouter();

    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    const [games, setAllgames] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log(currentUserInfo)
 
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
        <div className="mx-auto py-4">
            <div className="">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-[#fbbd27] text-xl md:text-2xl font-bold uppercase">Lottery</h2>
                    <div className="flex items-center gap-2">
                        <button className="bg-[#004d4d] text-[#fbbd27] px-4 py-1 rounded-md text-sm border border-[#006666] hover:bg-[#006666] transition-all">
                            See All
                        </button>
                    </div>
                </div>

                <Swiper
                    slidesPerView={3.2}
                    grid={{
                        rows: 2,
                        fill: "row",
                    }}
                    spaceBetween={12}
                    // Loop এবং CenteredSlides বন্ধ রাখা হয়েছে যাতে random এবং uniform দেখায়
                    loop={false}
                    centeredSlides={false}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 3, grid: { rows: 2 } },
                        768: { slidesPerView: 4, grid: { rows: 2 } },
                        1024: { slidesPerView: 5.3, grid: { rows: 2 } },
                    }}
                    modules={[Grid, Autoplay]}
                    className="gameSwiper"
                >
                    {games?.games && Array.isArray(games.games) && games?.games
                        .filter(game => game.game_type === "lottery")
                        .slice(0, 50).map((game) => (
                            <SwiperSlide key={game.id} className="!h-auto">
                                <div onClick={() => playGames(game.game_uid)} className="relative cursor-pointer group rounded-xl overflow-hidden bg-[#001f1f] border border-white/5 transition-all duration-300">

                                    {/* Game Image */}
                                    {/* <Image
                                    src={(game?.image_url && game.image_url.trim() !== "") ? game.image_url : "https://via.placeholder.com/300x400?text=No+Image"}
                                    alt={game?.game_name || "Game Image"}
                                    width={500}
                                    height={500}
                                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                                    priority={false}
                                /> */}
                                    <img src={game?.image_url} alt={game?.game_name}
                                        className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Heart Icon */}
                                    <div className="absolute top-2 right-2 p-1.5 rounded-full cursor-pointer hover:bg-black/60 transition-all">
                                        <FaHeart className="text-white text-[15px]" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>

            {/* CSS Fixes for Opacity and Grid Spacing */}
            <style>{`
                /* সব স্লাইডকে সমানভাবে দৃশ্যমান রাখার জন্য */
                .gameSwiper .swiper-slide {
                    opacity: 1 !important;
                    transform: scale(1) !important;
                    height: auto !important;
                    display: flex;
                    flex-direction: column;
                }

                /* গ্রিড এর সারির মাঝখানের গ্যাপ ফিক্স */
                .gameSwiper .swiper-grid-column > .swiper-slide {
                    margin-top: 12px !important;
                    margin-bottom: 0px !important;
                }

                /* স্লাইডার কন্টেইনার ওভারফ্লো ফিক্স */
                .swiper-grid-column {
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </div>
    );
};