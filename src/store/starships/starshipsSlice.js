import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { FETCH_STARSHIPS } from '../actions';
export const initialState = {
    loading: false,
    data: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    error: ''
};

export const fetchStarships = createAsyncThunk(FETCH_STARSHIPS, (url) => {
    return url ? useFetch(url, false) : useFetch('starships');
});

const starshipsSlice = createSlice({
    name: 'starships',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchStarships.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchStarships.fulfilled, (state, action) => {
            state.loading = false;
            state.data.count = action.payload.data.count;
            state.data.next = action.payload.data.next;
            state.data.previous = action.payload.data.previous;
            state.data.results = state.data.results.concat(action.payload.data.results);
            state.error = '';
        });

        builder.addCase(fetchStarships.rejected, (state, action) => {
            state.loading = false;
            state.data.results = [];
            state.error = action.error.message;
        });
    }
});

export default starshipsSlice;
