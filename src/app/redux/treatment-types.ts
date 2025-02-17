import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface treatment_types {
    value : any
}

const initialState: treatment_types = {
    value : []
}

export const treatment_types = createSlice({
    name : "Treatment Types",
    initialState,
    reducers: {
        setTreatmentTypes: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        }
    }
})

export const { setTreatmentTypes } = treatment_types.actions;
export default treatment_types.reducer;