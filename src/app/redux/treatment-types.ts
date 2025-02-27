import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface treatment_types {
    data : any,
    value: any,
    start: number,
    end: number,
    count: number
}

const initialState: treatment_types = {
    data : [],
    value : [],
    start : 0,
    end : 0,
    count : 0
}

const setTypesValue = (items: Array<treatment_types>, start: number, end: number) => {
    var newData : Array<treatment_types> = [];

    for(let i = start; i < end; i++){
        items[i] ? newData.push(items[i]) : []
    }

    return newData;
}

export const treatment_types = createSlice({
    name : "Treatment Types",
    initialState,
    reducers: {
        setInitialTypes: (state, action: PayloadAction<any>) => {
            const payload = action.payload;
            state.data = payload.data;
            state.value = setTypesValue(payload.data, state.start, payload.count);
        },

        setTypes: (state, action: PayloadAction<any>) => {
            const payload = action.payload;
            state.value = setTypesValue(payload.data, state.start, payload.count);
        },

        setItemsPerPage: (state, action: PayloadAction<any>) => {
            state.start = action.payload.start;
            state.end = action.payload.end;
            state.value = setTypesValue(action.payload.data, state.start, state.end);
            console.log(state.value);
        },
    }
})

export const { setInitialTypes, setItemsPerPage, setTypes } = treatment_types.actions;
export default treatment_types.reducer;