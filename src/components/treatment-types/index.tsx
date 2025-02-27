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
import { Select } from "@/components/FormElements/select";
import InputGroup from "@/components/FormElements/InputGroup";
import { cn } from "@/lib/utils";
import { createObjectCsvWriter, createObjectCsvStringifier } from 'csv-writer';
import { HashLoader } from 'react-spinners';
import { Button } from "../ui-elements/button";
import { ShowcaseSection } from "../Layouts/showcase-section"
import { compactFormat, standardFormat } from "@/lib/format-number";
import ReactPaginate from 'react-paginate';
import ResponsivePagination from 'react-responsive-pagination';
import './pagination.css';

// Redux
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setTokenEditable, setTokenState } from '@/app/redux/token';
import { setInitialTypes, setItemsPerPage } from "@/app/redux/treatment-types";
import { TopProductsSkeleton } from "@/components/Tables/top-products/skeleton";

interface Treatment {
    id: number,
    name : string,
    translation: string,
    translation_slug: string
}

const getTreatmentTypes = async (token : string, dispatch: any, setLoading: any, itemsPerPage: number) => {
    try {
        setLoading(true);
        const types = await axios.post('/api/treatment-types/get', {
            token : token
        });

        if(types.data && types.data.treatment_types){
            dispatch(setInitialTypes({ data: types.data.treatment_types, count: itemsPerPage}));
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

const PaginatedItems = ({ items, itemsPerPage, currentPage, setCurrentPage }) => {

    const dispatch = useAppDispatch();

    const totalPageCount = Math.ceil(items.length / itemsPerPage);

    const setPage = (page: number) =>{
        
        const startPoint = page == 1 ? 0 : (page - 1)  * itemsPerPage;
        const endPoint = startPoint + itemsPerPage;

        setCurrentPage(page);
    }
    return (
        <div style={{marginTop: '15px'}}>
            <ResponsivePagination
                current={currentPage}
                total={totalPageCount}
                onPageChange={setPage}
            />
        </div>
    )

}

const onSearch = async (token: string, initialTypes: Array<Treatment>, keyword: string, itemsPerPage:number, setLoading:any, dispatch:any) => {
    try {
        
        const types = await axios.post('/api/treatment-types/search', {
            token : token,
            initialTypes: initialTypes,
            keyword: keyword
        });

        // console.log(initialTypes);
        console.log(types.data.types);
        if(types.data && types.data.types){
            dispatch(setInitialTypes({ data: types.data.types, count: itemsPerPage}));
            setLoading(false);
        }
    } catch (error) {
        console.error("Failed To Fetch Treatment Types : ", error)
    }
   
}


const TreamentTypesPage = ({ className } : {className?: string}) => {
    const dispatch = useAppDispatch();

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [keyword, setKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);


    const setItemsCount = (n : number) => {
        setItemsPerPage(n);
    }

    const token = useAppSelector(state => state.token.value);
    const intialTypes = useAppSelector(state => state.treatment_types.data);
    const tempTypes = useAppSelector(state => state.treatment_types.value);
    const start = useAppSelector(state => state.treatment_types.start);

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        getTreatmentTypes(token, dispatch, setLoading, itemsPerPage);
    }, [token, itemsPerPage, dispatch]);

    return (
        <div
            className={cn(
                "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
                className,
            )}
        >
            <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
                Treatment-Types ({intialTypes.length})
            </h2>
            {
                loading ?  <></> :
                <ShowcaseSection title="" className="!p-6.5 flex justinfy-between">
                    <div className="w-1/4">
                        <Button
                            label="Download"
                            variant="green"
                            shape="full"
                            size="small"
                            className="justify-self-end"
                            onClick={() =>downloadTreatmentTypes(intialTypes)}
                        />
                    </div>
                    <div className="w-2/4 mt-[-15px]">
                        <InputGroup
                            type="text"
                            placeholder="Search"
                            className="mb-4.5 "
                            handleChange={e => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="w-1/4 mt-[0px]">
                        <Button
                            className="ml-[20px]"
                            label="Search"
                            variant="green"
                            shape="rounded"
                            size="small"
                            onClick={() =>onSearch(token, intialTypes, keyword, itemsPerPage, setLoading, dispatch)}
                        />
                    </div>
                </ShowcaseSection>
            }
            <Table className="">
                <TableHeader>
                    <TableRow className="border-none uppercase [&>th]:text-center">
                        <TableHead className="w-1/6 !text-center">No</TableHead>
                        <TableHead className="w-1/3 !text-center">Name</TableHead>
                        <TableHead className="w-3/6 !text-center">Translation</TableHead>
                    </TableRow>
                </TableHeader>
    
                <TableBody>
                {
                    loading ? 
                        <></> 
                        :
                        tempTypes.map((treatment: Treatment, i:number) => (
                            <TableRow
                                className="text-center text-base font-medium text-dark dark:text-white"
                                key={treatment.id || 'treatment' + i}
                            >
                                <TableCell>{treatment.id ? start + i + 1 : '#'}</TableCell>
                                <TableCell className="!text-center text-green-light-1">
                                    {treatment.name ? treatment.name : ''}
                                </TableCell>
                                <TableCell className="!text-center">
                                    {treatment.translation ? treatment.translation : ''}
                                </TableCell>
                            </TableRow> 
                        ))
                }
                </TableBody>
            </Table>
            {
                loading ? <div style={{marginLeft:'auto', marginRight:'auto', marginTop:'50px', marginBottom:'50px'}}><HashLoader color="#008000"/></div> : <></>
            }
            <div className="flex">
                <div className="w-1/3">
                    <Select
                        defaultValue='5'
                        placeholder="5"
                        className="mb-4.5 w-1/3"
                        items={[
                            { label: "5", value: "5" },
                            { label: "10", value: "10" },
                            { label: "20", value: "20" },
                        ]}
                        func={setItemsCount}
                    />
                </div>
                <div className="w-2/3">
                    <PaginatedItems 
                        items={intialTypes} 
                        itemsPerPage={itemsPerPage} 
                        currentPage={currentPage} 
                        setCurrentPage={setCurrentPage} 
                    />
                </div>
            </div>
            
        </div>
    );
}

export default TreamentTypesPage;