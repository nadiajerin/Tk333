// app/api/register/route.js
import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        // console.log(body)
        const { name, email, password } = body;

        // ১. iGaming API-তে প্লেয়ার তৈরি (Server-side fetch)
        const playerResponse = await fetch(`https://api.httpsgamexaglobal.net/api/players`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA2LCJhZ2VudF9jb2RlIjoiQUcxNzU2MDQ3OTA0NTcxQ1ZQOCIsInJvbGUiOiJhZmZpbGlhdGUiLCJpYXQiOjE3NzIwMDc2NjF9.AZq-zY3rYaWuFK-d2vo5gm3PtrF7SBiMqJZ2kCkZv5c`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": email.split('@')[0],
                "email": email,
                "password": password,
                "full_name": name,
                "phone": "+1234567890"
            })
        });

        const playerData = await playerResponse.json();

        if (!playerResponse.ok) {
            return NextResponse.json({ error: "Player API Error" }, { status: 400 });
        }

        // ২. বোনাস ডিপোজিট কল
        const playerId = playerData.player.id;
        await fetch(`https://api.httpsgamexaglobal.net/api/players/${playerId}/deposit`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer YOUR_TOKEN`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "amount": 0, "reference_id": "REG_BONUS" })
        });


        // ৩. এখানে আপনার MongoDB সেভ করার লজিক লিখতে পারেন
        const defaultReward = [
            {
                title: "First Welcome Reward",
                price: 1,
                status: "pending"
            }
        ];

        try {
            await dbConnect('user').insertOne({
                name,
                email,
                password,
                reward1: defaultReward // Eikhane static reward-ti bose jabe
            });
            console.log("User created with welcome reward!");
        } catch (error) {
            console.error("Error saving user:", error);
        }
        return NextResponse.json({ success: true, message: "Registered Successfully" });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}