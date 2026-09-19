import { NextResponse } from 'next/server';

// আপনার সিক্রেট টোকেন এখানে সুরক্ষিত থাকবে
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA2LCJhZ2VudF9jb2RlIjoiQUcxNzU2MDQ3OTA0NTcxQ1ZQOCIsInJvbGUiOiJhZmZpbGlhdGUiLCJpYXQiOjE3NjkzNDYwNTd9.nbj3efEYxaZBnK_PTzOlHrPiXumVQNXpPbKbKZifCG4";

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, email, player_id, game_uid } = body;

    // ১. সব প্লেয়ার থেকে নির্দিষ্ট ইউজারকে ফিল্টার করা
    if (action === "fetch_user") {
      const res = await fetch("https://api.httpsgamexaglobal.net/api/players?page=1&limit=200000&status=active", {
        headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA2LCJhZ2VudF9jb2RlIjoiQUcxNzU2MDQ3OTA0NTcxQ1ZQOCIsInJvbGUiOiJhZmZpbGlhdGUiLCJpYXQiOjE3NjkzMzYxODJ9.YzgI1oSR-lNs40O2-9_r9AFiYfVpEUuAFGZ2qCeSSZI` }
      });
      const data = await res.json();
      const user = data?.players?.find(p => p.email === email);
      return NextResponse.json(user || { error: "User not found" });
    }

    // ২. সব গেমস ফেচ করা
    if (action === "fetch_games") {
      const res = await fetch("https://api.httpsgamexaglobal.net/api/games?page=1&limit=1000&provider=PRAGMATIC&status=active", {
        headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA2LCJhZ2VudF9jb2RlIjoiQUcxNzU2MDQ3OTA0NTcxQ1ZQOCIsInJvbGUiOiJhZmZpbGlhdGUiLCJpYXQiOjE3NjkzMzYxODJ9.YzgI1oSR-lNs40O2-9_r9AFiYfVpEUuAFGZ2qCeSSZI` }
      });
      const data = await res.json();
      return NextResponse.json(data);
    }

    // ৩. গেম লঞ্চ করা
    if (action === "launch_game") {
      const res = await fetch("https://api.httpsgamexaglobal.net/api/games/launch", {
        method: "POST",
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA2LCJhZ2VudF9jb2RlIjoiQUcxNzU2MDQ3OTA0NTcxQ1ZQOCIsInJvbGUiOiJhZmZpbGlhdGUiLCJpYXQiOjE3NjkzMzYxODJ9.YzgI1oSR-lNs40O2-9_r9AFiYfVpEUuAFGZ2qCeSSZI`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          player_id,
          game_uid,
          lobby_url: "https://casino.gamexaglobal.com",
          lang: "en"
        })
      });
      const data = await res.json();
      return NextResponse.json(data);
    }

  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}