import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Parse the request body
        const token = body.token; // Access the token from the parsed body
        console.log(token);
        console.log(`${process.env.SERVER_URL}/token/set`);
        
        axios.post(`${process.env.SERVER_URL}/token/set`, {
            token : token,
        }).then(res => {
            console.log(res);
        })

        return NextResponse.json({ message: "Token set successfully", token: token });
    } catch (error) {
        console.error('Error parsing request body:', error);
        return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }
}