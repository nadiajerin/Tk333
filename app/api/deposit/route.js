import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { amount, paymentMethod } = await request.json();

   
        const appKey = process.env.appKey;
        const appSecret = process.env.appSecret;


        const invoiceId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const payload = {
            invoice_no: invoiceId,
            paymentType: paymentMethod || "bkash",
            amount: amount.toString(),
            callback_url: "https://autoimmune-ula-harmonistically.ngrok-free.dev/api/durontopay/callback"
        };

        const response = await fetch('https://merchant.durantopay.com/api/v2/ps/transaction/create', {
            method: 'POST',
            headers: {
                'App-Key': appKey,
                'APP-Secret': appSecret,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        // console.log("Gateway Response:", result); // এটি আপনার কনসোলে চেক করবেন এরর দেখার জন্য

        if (result.success === true || result.status === 0) {
            return NextResponse.json({
                success: true,
                payment_url: result.data.payment_url
            });
        } else {
            return NextResponse.json({
                success: false,
                message: result.message || "Failed to create transaction"
            }, { status: 400 });
        }

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}