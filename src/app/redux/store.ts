import { configureStore }  from '@reduxjs/toolkit'
import token from './token';
import treatment_types from './treatment-types';

export const store = configureStore({
    reducer: {
        token,
        treatment_types
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch