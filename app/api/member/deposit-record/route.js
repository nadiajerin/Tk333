// app/api/user-data/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  // ১. URL থেকে ইমেইলটি নিন
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // ২. আসল API থেকে সব প্লেয়ার ফেচ করুন (সার্ভার সাইড থেকে)
    const response = await fetch(`https://api.httpsgamexaglobal.net/api/players?page=1&limit=200000&status=active`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA2LCJhZ2VudF9jb2RlIjoiQUcxNzU2MDQ3OTA0NTcxQ1ZQOCIsInJvbGUiOiJhZmZpbGlhdGUiLCJpYXQiOjE3NjkzMzYxODJ9.YzgI1oSR-lNs40O2-9_r9AFiYfVpEUuAFGZ2qCeSSZI",
        "Content-Type": "application/json"
      },
    });

    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch from game API");
    }

    // ৩. সার্ভার সাইডেই নির্দিষ্ট ইউজারকে ফিল্টার করুন
    const specificUser = data?.players?.find(player => player?.email === email);

    if (!specificUser) {
      return NextResponse.json({ message: "User not found in game database" }, { status: 404 });
    }

    const depositRecord = await fetch(`https://api.httpsgamexaglobal.net/api/players/${specificUser.id}/transactions?page=1&limit=200000&status=active`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA2LCJhZ2VudF9jb2RlIjoiQUcxNzU2MDQ3OTA0NTcxQ1ZQOCIsInJvbGUiOiJhZmZpbGlhdGUiLCJpYXQiOjE3NjkzMzYxODJ9.YzgI1oSR-lNs40O2-9_r9AFiYfVpEUuAFGZ2qCeSSZI",
        "Content-Type": "application/json"
      },
    });

    const depositRecordData = await depositRecord.json();

    // ৪. শুধু ওই ইউজারের ডাটা ফ্রন্টএন্ডে পাঠান
    return NextResponse.json(depositRecordData);

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}