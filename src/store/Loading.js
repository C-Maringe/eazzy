import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    state: false,
};

const loading = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.state = action.payload;
        },
    },
});

export const { setLoading } = loading.actions;

export default loading.reducer;
