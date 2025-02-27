import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import treatmentTypes, { setTreatmentTypes } from '@/app/redux/treatment-types'

import { setAxiosConfig } from '../../../../utils/funcs';

interface Type {
    id: number,
    name : string,
    translation : string
}

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const token = body.token;
        
        const config = setAxiosConfig(token);

        const response = await axios.get(`${process.env.API_URL}/treatment-types`, config);
        const treatmentTypes = response.data.data;

        const simplifyTypes = (data: Array<Type>) => {
            return data.map(type => ({
                id: type.id,
                name: type.name,
                translation: type.translation,
            }))
        };

        const simplifiedTypes = simplifyTypes(treatmentTypes);

        return NextResponse.json({ message: "Treatment-Types Get successfully", treatment_types: simplifiedTypes });
    } catch (err) {

    }   
    return NextResponse.json({ message: ""});
}