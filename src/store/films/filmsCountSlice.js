import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { FILMS_COUNT } from '../actions';
export const initialState = {
    loading: false,
    count: 0,
    error: ''
};

export const fetchFilmsCount = createAsyncThunk(FILMS_COUNT, () => useFetch('films'));

const filmsCountSlice = createSlice({
    name: 'filmsCount',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchFilmsCount.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchFilmsCount.fulfilled, (state, action) => {
            state.loading = false;
            state.count = action.payload.data.count;
            state.error = '';
        });

        builder.addCase(fetchFilmsCount.rejected, (state, action) => {
            state.loading = false;
            state.count = 0;
            state.error = action.error.message;
        });
    }
});

export default filmsCountSlice;
