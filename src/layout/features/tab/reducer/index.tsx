import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    tabs: Array<TabType>;
    current: number;
}

const initialState: State = {
    tabs: [],
    current: -1
};

const tabSlice = createSlice({
    name: 'TAB_SLICE',
    initialState,
    reducers: {
        createTabAction(state, { payload }: PayloadAction<TabType>) {
            state.tabs = [...state.tabs, payload];
        },
        updateTabAction(state, { payload }: PayloadAction<TabType>) {
            state.tabs[state.current] = payload;
        },
        deleteTabAction(state, { payload }: PayloadAction<number>) {
            const index = payload;

            state.tabs = [...state.tabs.slice(0, index), ...state.tabs.slice(index + 1)];
        },
        setCurrentAction(state, { payload }: PayloadAction<number>) {
            const index = payload;

            state.current = index;
        }
    }
});

export const tabReducer = tabSlice.reducer;
export const { createTabAction, updateTabAction, deleteTabAction, setCurrentAction } = tabSlice.actions;
