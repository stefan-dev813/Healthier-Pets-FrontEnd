"use client"

import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { createObjectCsvWriter, createObjectCsvStringifier } from 'csv-writer';
import { HashLoader } from 'react-spinners';
import { Button } from "../ui-elements/button";
import { ShowcaseSection } from "../Layouts/showcase-section"
import { compactFormat, standardFormat } from "@/lib/format-number";
// Redux
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setTokenEditable, setTokenState } from '@/app/redux/token';
import { setTreatmentTypes } from "@/app/redux/treatment-types";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";

interface Treatment {
    id: number,
    name : string,
    translation: string,
    translation_slug: string
}

const getTreatmentTypes = async (token : string, dispatch: any, setLoading: any) => {
    try {
        setLoading(true);
        const types = await axios.post('/api/treatment-types/get', {
            token : token
        });

        if(types.data && types.data.treatment_types){
            dispatch(setTreatmentTypes(types.data.treatment_types));
            setLoading(false);
        }
    } catch (error) {
        console.error("Failed To Fetch Treatment Types : ", error)
    }
}

function convertArrayToCSV(data: Array<Treatment>) {
    const csvRows = [];
    // Extract headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    // Convert each row to CSV
    for (const row of data) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"'); // escape double quotes
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
}

function downloadCSV(csvString: any, filename = 'data.csv') {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

const downloadTreatmentTypes = async (data: Array<Treatment>) => {
    try {
        const csvData = convertArrayToCSV(data);
        downloadCSV(csvData, 'treatment-types.csv');
    } catch (error) {
        console.error('Failed to download CSV:', error);
    }
};

const TreamentTypesPage = ({ className } : {className?: string}) => {
    const dispatch = useAppDispatch();

    const token = useAppSelector(state => state.token.value);
    const stateTreatmentTypes = useAppSelector(state => state.treatment_types.value);

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        getTreatmentTypes(token, dispatch, setLoading);        
    }, [token, dispatch]);

    return (
        <div
            className={cn(
                "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
                className,
            )}
        >
            <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
                Treatment-Types ({stateTreatmentTypes.length})
            </h2>

            <ShowcaseSection title="" className="space-y-5.5 !p-6.5">
                <Button
                    label="Download"
                    variant="green"
                    shape="full"
                    size="small"
                    onClick={() =>downloadTreatmentTypes(stateTreatmentTypes)}
                />
            </ShowcaseSection>
            
            <Table>
                <TableHeader>
                    <TableRow className="border-none uppercase [&>th]:text-center">
                        <TableHead className="min-w-[120px] !text-center">No</TableHead>
                        <TableHead className="!text-center">Name</TableHead>
                        <TableHead className="!text-right">Translation</TableHead>
                    </TableRow>
                </TableHeader>
    
                <TableBody>
                {
                    loading ? <></>:
                    stateTreatmentTypes.map((treatment: Treatment, i:number) => (
                        <TableRow
                            className="text-center text-base font-medium text-dark dark:text-white"
                            key={treatment.id || 'treatment' + i}
                        >
                            <TableCell>{i + 1}</TableCell>
                            <TableCell className="!text-center text-green-light-1">
                                {treatment.name}
                            </TableCell>
                            <TableCell className="!text-right">
                                {treatment.translation}
                            </TableCell>

                        </TableRow>
                    ))
                }
                </TableBody>
            </Table>
            {
                loading ? <div style={{marginLeft:'auto', marginRight:'auto', marginTop:'50px', marginBottom:'50px'}}><HashLoader color="#008000"/></div> : <></>
            }
        </div>
    );
}

export default TreamentTypesPage;