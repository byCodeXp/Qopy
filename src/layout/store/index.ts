import { configureStore } from '@reduxjs/toolkit';
import { tabReducer } from '../features/tab/reducer';

export const store = configureStore({
    reducer: {
        tab: tabReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
