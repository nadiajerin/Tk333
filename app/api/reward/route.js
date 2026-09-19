import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // URL থেকে ইমেলটি সংগ্রহ করা হচ্ছে (e.g., /api/reward?email=user@gmail.com)
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return Response.json({ message: "Email is required" }, { status: 400 });
        }

        const db = await dbConnect("user"); // আপনার dbConnect যেভাবে কাজ করে

        // সরাসরি ডেটাবেজ থেকে ওই ইউজারের ডেটা ফিল্টার করা হচ্ছে
        // এখানে 'user' ফিল্ডটি আপনার MongoDB-র ফিল্ড নামের সাথে মিলিয়ে নিবেন
        const data = await db.find({ email: email }).toArray();

        return Response.json(data, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Data fetch failed", error: error.message }, { status: 500 });
    }
}



// Post wishlist Data ============================
export async function POST(request) {
    try {
        const body = await request.json();
        const { id, email, price} = body; // rewardId ক্লায়েন্ট থেকে পাঠাতে হবে

        // ১. iGaming API-তে ডিপোজিট রিকোয়েস্ট
        const apiResponse = await fetch(`https://api.httpsgamexaglobal.net/api/players/${id}/deposit`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA2LCJhZ2VudF9jb2RlIjoiQUcxNzU2MDQ3OTA0NTcxQ1ZQOCIsInJvbGUiOiJhZmZpbGlhdGUiLCJpYXQiOjE3NzIxMzA2OTV9.xfgU69DUA52R9ejBsOGOqnzV1A9tLMpFzxzd-6Sll-o`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "amount": price,
                "reference_id": `ref_${Date.now()}` // একটি ইউনিক আইডি দেওয়া ভালো
            })
        });

        const apiResult = await apiResponse.json();

        // API যদি সফল না হয় তবে ডেটাবেজ আপডেট করার দরকার নেই
        if (!apiResponse.ok) {
            throw new Error(apiResult.message || "iGaming API Deposit Failed");
        }

        // ২. MongoDB-তে স্ট্যাটাস আপডেট করা
        const db = await dbConnect("user");

        // reward1 অ্যারের ভেতর নির্দিষ্ট আইটেমের স্ট্যাটাস আপডেট করার কুয়েরি
        const updateResult = await db.updateOne(
            {
                email: email,
                "reward1.status": "pending" // শুধুমাত্র পেন্ডিং থাকলে আপডেট হবে
            },
            {
                $set: { "reward1.$.status": "complete" }
            }
        );

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json({
                success: false,
                message: "API deposited but Database update failed (Status might be already complete)"
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Reward claimed and status updated to complete"
        });

    } catch (error) {
        console.error("Claim Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
