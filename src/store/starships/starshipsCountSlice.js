import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { STARSHIPS_COUNT } from '../actions';
export const initialState = {
    loading: false,
    count: 0,
    error: ''
};

export const fetchStarshipsCount = createAsyncThunk(STARSHIPS_COUNT, () => useFetch('starships'));

const starshipsCountSlice = createSlice({
    name: 'starshipsCount',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchStarshipsCount.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchStarshipsCount.fulfilled, (state, action) => {
            state.loading = false;
            state.count = action.payload.data.count;
            state.error = '';
        });

        builder.addCase(fetchStarshipsCount.rejected, (state, action) => {
            state.loading = false;
            state.count = 0;
            state.error = action.error.message;
        });
    }
});

export default starshipsCountSlice;
