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
        const types = body.initialTypes;
        const tempTypes = body.initialTypes;
        const keyword = body.keyword;
        console.log("Post - search");
        
        const newItems = await keyword == '' ? types : tempTypes.filter(item => item.name.includes(keyword)).filter(item => item.name.includes(keyword));
        console.log(tempTypes);
        // const stateTreatmentTypes = useAppSelector(state => state.treatment_types.data);

        return NextResponse.json({ message: "Treatment-Types Get successfully", types: newItems});
    } catch (err) {

    }   
    return NextResponse.json({ message: ""});
}