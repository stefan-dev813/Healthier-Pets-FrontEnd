'use client'

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
import { HashLoader } from 'react-spinners';
import { Button } from "../ui-elements/button";
import { ShowcaseSection } from "../Layouts/showcase-section"

import { cn } from "@/lib/utils";

// Redux
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setTokenEditable, setTokenState } from '@/app/redux/token';

import { setStatePetParents } from "@/app/redux/pet-parents";

const clinic_id: number = 496;

interface Parent {
    id: number,
    clinic_id : number,
    full_name: string,
    email: string,
    phone: string,
    created_at: string,
}

const apiPetParents = async (token: string, clinic_id: number, dispatch: any, setLoading: any) => {
    try {
        setLoading(true);
        const parents = await axios.post(`/api/pet-parents/${clinic_id}`, {
            token: token,
            clinic_id: clinic_id
        })
        console.log(parents.data.petParents);
        if(parents.data && parents.data.petParents){
            dispatch(setStatePetParents(parents.data.petParents));
            setLoading(false);
        }

    } catch (err) {

    }
    
}

function convertArrayToCSV(data: Array<Parent>) {
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

const downloadTreatmentTypes = (data: Array<Parent>) => {
    try {
        const csvData = convertArrayToCSV(data);
        downloadCSV(csvData, 'pet-parents.csv');
    } catch (error) {
        console.error('Failed to download CSV:', error);
    }
}

const ComponentPetParents = ({ className } : {className?: string}) => {
    const dispatch = useAppDispatch();

    const token = useAppSelector(state => state.token.value);
    const statePetParents = useAppSelector(state => state.pet_parents.value);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        apiPetParents(token, clinic_id, dispatch, setLoading);
    }, [token, dispatch]);

    return (
        <div
            className={cn(
                "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
                className,
            )}
        >
            <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
                Treatment-Types ({statePetParents.length})
            </h2>

            <ShowcaseSection title="" className="space-y-5.5 !p-6.5">
                <Button
                    label="Download"
                    variant="green"
                    shape="full"
                    size="small"
                    onClick={() =>downloadTreatmentTypes(statePetParents)}
                />
            </ShowcaseSection>
            
            <Table>
                <TableHeader>
                    <TableRow className="border-none uppercase [&>th]:text-center">
                        <TableHead className="min-w-[120px] !text-left">No</TableHead>
                        <TableHead className="min-w-[120px] !text-center">Clinic ID</TableHead>
                        <TableHead className="!text-center">Name</TableHead>
                        <TableHead className="!text-right">Email</TableHead>
                        <TableHead className="!text-right">Phone</TableHead>
                        <TableHead className="!text-right">Created At</TableHead>
                    </TableRow>
                </TableHeader>
    
                <TableBody>
                {
                    loading ? <></>:
                    statePetParents.map((parent: Parent, i:number) => (
                        <TableRow
                            className="text-center text-base font-medium text-dark dark:text-white"
                            key={parent.id || 'parent' + i}
                        >
                            <TableCell className="!text-left">{i + 1}</TableCell>
                            <TableCell className="!text-center">
                                {parent.clinic_id}
                            </TableCell>
                            <TableCell className="!text-center text-green-light-1">
                                {parent.full_name}
                            </TableCell>
                            <TableCell className="!text-right">
                                {parent.email}
                            </TableCell>
                            <TableCell className="!text-right">
                                {parent.phone}
                            </TableCell>
                            <TableCell className="!text-right">
                                {parent.created_at}
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

export default ComponentPetParents;