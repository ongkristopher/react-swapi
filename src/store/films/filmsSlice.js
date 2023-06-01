import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { FETCH_FILMS } from '../actions';
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

export const fetchFilms = createAsyncThunk(FETCH_FILMS, (url) => {
    return url ? useFetch(url, false) : useFetch('films');
});

const filmsSlice = createSlice({
    name: 'films',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchFilms.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchFilms.fulfilled, (state, action) => {
            state.loading = false;
            state.data.count = action.payload.data.count;
            state.data.next = action.payload.data.next;
            state.data.previous = action.payload.data.previous;
            state.data.results = state.data.results.concat(action.payload.data.results);
            state.error = '';
        });

        builder.addCase(fetchFilms.rejected, (state, action) => {
            state.loading = false;
            state.data.results = [];
            state.error = action.error.message;
        });
    }
});

export default filmsSlice;
