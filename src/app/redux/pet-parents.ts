import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface pet_parents {
    value : any
}

const initialState: pet_parents = {
    value : []
}

export const pet_parents = createSlice({
    name: "Pet Parents",
    initialState,
    reducers: {
        setStatePetParents: (state, action: PayloadAction<pet_parents>) => {
            state.value = action.payload
        }
    }
});

export const { setStatePetParents } = pet_parents.actions;
export default pet_parents.reducer;