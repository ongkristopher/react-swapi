import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { FETCH_PLANETS } from '../actions';
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

export const fetchPlanets = createAsyncThunk(FETCH_PLANETS, (url) => {
    return url ? useFetch(url, false) : useFetch('planets');
});

const planetsSlice = createSlice({
    name: 'planets',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPlanets.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchPlanets.fulfilled, (state, action) => {
            state.loading = false;
            state.data.count = action.payload.data.count;
            state.data.next = action.payload.data.next;
            state.data.previous = action.payload.data.previous;
            state.data.results = state.data.results.concat(action.payload.data.results);
            state.error = '';
        });

        builder.addCase(fetchPlanets.rejected, (state, action) => {
            state.loading = false;
            state.data.results = [];
            state.error = action.error.message;
        });
    }
});

export default planetsSlice;
