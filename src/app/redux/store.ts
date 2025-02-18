import { configureStore }  from '@reduxjs/toolkit'
import token from './token';
import treatment_types from './treatment-types';
import pet_parents from './pet-parents';

export const store = configureStore({
    reducer: {
        token,
        treatment_types,
        pet_parents
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch