import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { mutateObject } from 'lib/mutateObject';
import { FETCH_STARSHIP } from '../actions';
export const initialState = {
    loading: false,
    data: {},
    error: ''
};

export const fetchStarship = createAsyncThunk(FETCH_STARSHIP, ({ id, isWookiee }) => {
    return isWookiee ? useFetch(`starships/${id}/?format=wookiee`) : useFetch(`starships/${id}`);
});

const starshipSlice = createSlice({
    name: 'starships',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchStarship.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchStarship.fulfilled, (state, action) => {
            state.loading = false;
            state.data = mutateObject(action.payload.data, action.meta.arg.isWookiee);
            state.error = '';
        });

        builder.addCase(fetchStarship.rejected, (state, action) => {
            state.loading = false;
            state.data = {};
            state.error = action.error.message;
        });
    }
});

export default starshipSlice;
