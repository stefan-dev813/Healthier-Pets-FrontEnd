import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { createObjectCsvWriter, createObjectCsvStringifier } from 'csv-writer';
import { NextRequest, NextResponse } from 'next/server';

import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import treatmentTypes, { setTreatmentTypes } from '@/app/redux/treatment-types'

function sanitizeField(field: string) {
    return field.replace(/(\r\n|\n|\r)/gm, " "); // Replace newlines with spaces
}

export async function POST(req: NextRequest, res:NextResponse){
    try {
        const body = await req.json();
        const types = body.types;

        // types = types.map(type => ({
        //     id: type.id,
        //     name: sanitizeField(type.name),
        //     translation: sanitizeField(type.translation),
        //     translation_slug: sanitizeField(type.translation_slug),
        // }));

        const csvStringifier = createObjectCsvStringifier({
            header: [
                { id: 'id', title: 'ID' },
                { id: 'name', title: 'NAME' },
                { id: 'translation', title: 'Translation' },
                { id: 'translation_slug', title: 'Translation Slug' }
            ],
            recordDelimiter: '\r\n'  // Explicitly define the record delimiter for Windows compatibility
        });
       
        
        const header = csvStringifier.getHeaderString();
        const content = csvStringifier.stringifyRecords(types);
        const csvContent = header + content;
        console.log(csvContent);
        // console.log(content);
        
        // NextResponse.setHeader('Content-Type', 'text/csv');
        // NextResponse.setHeader('Content-Disposition', 'attachment; filename="treatment-types.csv"');
        // res.send(csvContent);

        return NextResponse.json({data: csvContent});
        
    } catch (err) {
        console.error('Failed to generate CSV:', err);
        return NextResponse.json({ message: "Failed to generate CSV" });
    }
    return NextResponse.json({ message: ""});
}