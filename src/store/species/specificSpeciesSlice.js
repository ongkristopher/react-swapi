import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { mutateObject } from 'lib/mutateObject';
import { FETCH_SPECIFIC_SPECIES } from '../actions';
export const initialState = {
    loading: false,
    data: {},
    error: ''
};

export const fetchSpecificSpecies = createAsyncThunk(FETCH_SPECIFIC_SPECIES, ({ id, isWookiee }) => {
    return isWookiee ? useFetch(`species/${id}/?format=wookiee`) : useFetch(`species/${id}`);
});

const specificSpeciesSlice = createSlice({
    name: 'specificSpecies',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSpecificSpecies.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchSpecificSpecies.fulfilled, (state, action) => {
            state.loading = false;
            state.data = mutateObject(action.payload.data, action.meta.arg.isWookiee);
            state.error = '';
        });

        builder.addCase(fetchSpecificSpecies.rejected, (state, action) => {
            state.loading = false;
            state.data = {};
            state.error = action.error.message;
        });
    }
});

export default specificSpeciesSlice;
