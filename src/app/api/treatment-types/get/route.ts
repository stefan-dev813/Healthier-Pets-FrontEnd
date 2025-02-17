import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setTreatmentTypes } from '@/app/redux/treatment-types'

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const token = body.token;
        
        const response = await axios.post(`${process.env.SERVER_URL}/treatment-types/get`, {
            token : token,
        });

        const treatmentTypes = response.data.types.data;

        return NextResponse.json({ message: "Treatment-Types Get successfully", treatment_types: treatmentTypes });
    } catch (err) {

    }   
    return NextResponse.json({ message: ""});
}