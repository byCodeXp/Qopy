import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    tabs: TabInterface[];
    active: number;
}

const initialState: State = {
    tabs: [],
    active: -1,
};

const tabSlice = createSlice({
    name: 'TAB_SLICE',
    initialState,
    reducers: {
        addTabAction: {
            reducer(state, { payload }: PayloadAction<TabInterface>) {
                state.tabs = [...state.tabs, payload];
            },
            prepare() {
                return {
                    payload: {
                        label: 'untitled',
                    },
                };
            },
        },
        /**
         * Remove tab from state.tabs by index passed in payload
         */
        removeTabAction(state, { payload }: PayloadAction<number>) {
            const index = payload;

            state.tabs = [
                ...state.tabs.slice(0, index),
                ...state.tabs.slice(index + 1),
            ];
        },
        /**
         * Set active tab by index passed in payload
         */
        setActiveAction(state, { payload }: PayloadAction<number>) {
            const index = payload;

            state.active = index;
        },
    },
});

export const reducer = tabSlice.reducer;
export const { addTabAction, removeTabAction, setActiveAction } = tabSlice.actions;