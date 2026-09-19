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

export const HotGames = () => {
    // Find user
    const value = useContext(authContext)
    const { user } = value;
    const router = useRouter();

    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    const [games, setAllgames] = useState(null);
    const [loading, setLoading] = useState(true);

    const hotGamesUid = [
        "c7a69ab382bd1ff0e6eb65b90a793bdd", "36d20c24669dca7630715f2e0a7c18be",
        "bdfb23c974a2517198c5443adeea77a8", "db249defce63610fccabfa829a405232",
        "61d46add6841aad4758288d68015eca6", "d505541d522aa5ca01fc5e97cfcf2116",
        "a990de177577a2e6a889aaac5f57b429", "780d43c0a98bc8f6a0705976605608c3",
        "edef29b5eda8e2eaf721d7315491c51d", "05fc951a633d4c6b4bbe8c429cd63658",
        "8c62471fd4e28c084a61811a3958f7a1", "a7f3e5f210523a989a7c6b32f2f1ad42",
        "981f5f9675002fbeaaf24c4128b938d7", "d419ec9ab6a23590770fd77b036aed16",
        "25822eb4d6459cc8b39c4f7b69b1bf2c", "3aca3084a5c1a8c77c52d6147ee3d2ab",
        "c68b600f660bf3ce16b99ecda3d78600", "fffac1d578d7f53cbc67af087bf7911d",
        "a04d1f3eb8ccec8a4823bdf18e3f0e84", "c6955c14f6c28a6c2a0c28274fec7520"
    ];

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const gameRes = await fetch('/api/games', {
                    method: 'POST',
                    body: JSON.stringify({ action: "fetch_games" })
                });
                const gameData = await gameRes.json();
                setAllgames(gameData);

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
            {/* Header Section (Based on Image) */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#ffcc00] rounded-full"></span>
                    <h2 className="text-[#ffcc00] text-xl font-bold">গরম খেলা</h2>
                </div>

                <div className="flex items-center gap-2">
                    {/* Navigation Buttons */}
                    <button className="prev-btn w-8 h-8 flex items-center justify-center rounded-md border border-gray-600 text-white active:bg-gray-700">
                        <FaChevronLeft size={14} />
                    </button>
                    <button className="bg-[#2c343f] text-[#cbd5e1] px-4 py-1 rounded-md text-sm font-medium border border-gray-600 shadow-sm">
                        অধিক
                    </button>
                    <button className="next-btn w-8 h-8 flex items-center justify-center rounded-md border border-gray-600 text-white active:bg-gray-700">
                        <FaChevronRight size={14} />
                    </button>
                </div>
            </div>

            <Swiper
                slidesPerView={3}
                grid={{
                    rows: 3,
                    fill: "row",
                }}
                spaceBetween={10}
                loop={false}
                navigation={{
                    nextEl: ".next-btn",
                    prevEl: ".prev-btn",
                }}
                modules={[Grid, Autoplay, Navigation]}
                className="gameSwiper !pb-4"
            >
                {games?.games && Array.isArray(games.games) && games?.games
                    .filter(game => hotGamesUid.includes(game.game_uid))
                    .map((game) => (
                        <SwiperSlide key={game.id} className="!h-auto">
                            <div
                                onClick={() => playGames(game.game_uid)}
                                className="relative cursor-pointer flex flex-col items-center"
                            >
                                {/* Card Container */}
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
                                    <img
                                        src={game?.image_url}
                                        alt={game?.game_name}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Provider Tag (Yellow Box) */}
                                    {/* <div className="absolute bottom-0 right-0 bg-[#ffcc00] px-3 py-0.5 rounded-tl-xl">
                                        <span className="text-[10px] font-black text-black uppercase">
                                            {game?.provider || "JILI"}
                                        </span>
                                    </div> */}

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

            {/* Custom Styling to match the grid look */}
            <style>{`
                /* স্লাইডারের সব ইমেজকে পূর্ণ উজ্জ্বলতা দিতে */
                .gameSwiper .swiper-slide {
                 opacity: 1 !important;
                    }

                /* যদি স্লাইডার কোনো কারণে পরের কার্ডটিকে ঝাপসা করে রাখে */
                .gameSwiper .swiper-slide-next + .swiper-slide {
            `}</style>
        </div>
    );
};