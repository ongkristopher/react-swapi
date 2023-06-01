import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { mutateObject } from 'lib/mutateObject';
import { FETCH_FILM } from '../actions';
export const initialState = {
    loading: false,
    data: {},
    error: ''
};

export const fetchFilm = createAsyncThunk(FETCH_FILM, ({ id, isWookiee }) => {
    return isWookiee ? useFetch(`films/${id}/?format=wookiee`) : useFetch(`films/${id}`);
});

const filmSlice = createSlice({
    name: 'film',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchFilm.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchFilm.fulfilled, (state, action) => {
            state.loading = false;
            state.data = mutateObject(action.payload.data, action.meta.arg.isWookiee);
            state.error = '';
        });

        builder.addCase(fetchFilm.rejected, (state, action) => {
            state.loading = false;
            state.data = {};
            state.error = action.error.message;
        });
    }
});

export default filmSlice;
