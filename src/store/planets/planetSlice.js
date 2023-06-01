import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { mutateObject } from 'lib/mutateObject';
import { FETCH_PLANET } from '../actions';
export const initialState = {
    loading: false,
    data: {},
    error: ''
};

export const fetchPlanet = createAsyncThunk(FETCH_PLANET, ({ id, isWookiee }) => {
    return isWookiee ? useFetch(`planets/${id}/?format=wookiee`) : useFetch(`planets/${id}`);
});

const planetSlice = createSlice({
    name: 'planet',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPlanet.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchPlanet.fulfilled, (state, action) => {
            state.loading = false;
            state.data = mutateObject(action.payload.data, action.meta.arg.isWookiee);
            state.error = '';
        });

        builder.addCase(fetchPlanet.rejected, (state, action) => {
            state.loading = false;
            state.data = {};
            state.error = action.error.message;
        });
    }
});

export default planetSlice;
