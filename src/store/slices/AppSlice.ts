import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    isLoading: boolean;
}

const initialState: AppState = {
    isLoading: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoading(state, actions: PayloadAction<boolean>) {
            state.isLoading = actions.payload;
        },
    },
    // extraReducers(builder) {
    // },
});

export const { setLoading } = appSlice.actions;
export default appSlice.reducer;
