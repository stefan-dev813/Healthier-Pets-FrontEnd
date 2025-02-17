import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Token {
    value: string,
    isEdit: boolean
}

const initialState: Token = {
    value: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZGY3MmNmNC02ZDc0LTQwZjItODU0My00OTllZGY1MmEyNGQiLCJqdGkiOiI3YWQ0ZTkzZmY1M2JjYzc4MGY2YTc2ZmVmYWUxZWZhOGRlYzY0MGQ0YzBlZWMyOWE1NDQ3NmI0NDhlNmY5NmEzOTNiMWY3ZjI0MzNiZmNhYiIsImlhdCI6MTczOTU1NTA1OS42MTI5NTUsIm5iZiI6MTczOTU1NTA1OS42MTI5NTcsImV4cCI6MTc3MTA5MTA1OS42MDEyMzksInN1YiI6IjExMzkiLCJzY29wZXMiOltdfQ.P3lvI0R-kzVQj2qcfcmrSIjDqhzvVZW7g_SQmU3Gk-eREJYDIoZOKbfrP3cDfRFo1QxQdVIPVl8c3oyGjf2CbTk17o10bl9E7zeAIkb_erBe39ZO_6Kol5a8BQiNvHFZisfsdxU1rRdxiNUBDLqqprQKEtDfuGD-Hh_G4XBUPa9KMAwcM99TXCu2NI8kIE_DIJwG463CCkR6bONbrTr_oDAQu-jsi6bz6sGlWfWgBZmAsmjUP9fpGrrlLADXR_dZf5Koi6E9TkDKDVeI8GjdZnxe0zgu-fNJ5KoHHMtEunitgNMFoi6_jdkbG3johPmEhUGMAP8-qPrKVBjqQVUZp2YWoxa1gZ92aLgl1UiQ_HbgcmXSR8Uves0VAcopfi_dhzc60W97gn4TMEREaYX1F_Tp8UG5FHXrqbTrXbscA_c1bMV8VS8lleLydeWpcpDfXeAd1yCGPYo_WT7FEKNYJyz3a3uUQ9p8lIACEBzhc94G_DKDu4MlspBq9ItoZI2nTEmYYnkbhVd7cji7hkMKCUiLWGOegAKl0DBPhavi22mlP5ob_LFvvfyseD5LxZJv1nJzpIdmRDJoIkLMzMBDq88nM06Ks3OR7ptPNGl0o3030eg-yCpJEen_j1L6kxUGGHSpWLlkovqqzm5WdqkhcHeVymBhaHUlsZBSS0VHccc',
    isEdit: false
}

export const token = createSlice({
    name : 'TOKEN',
    initialState,
    reducers: {
        setTokenState: (state, action: PayloadAction<String>) => {
            state.value = action.payload;
            state.isEdit = true;
        },
        setTokenEditable: (state) => {
            state.isEdit = !state.isEdit;
        }
    }
});

export const { setTokenState, setTokenEditable } = token.actions;
export default token.reducer;