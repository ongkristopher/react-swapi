import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { SPECIES_COUNT } from '../actions';
export const initialState = {
    loading: false,
    count: 0,
    error: ''
};

export const fetchSpeciesCount = createAsyncThunk(SPECIES_COUNT, () => useFetch('species'));

const speciesCountSlice = createSlice({
    name: 'speciesCount',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSpeciesCount.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchSpeciesCount.fulfilled, (state, action) => {
            state.loading = false;
            state.count = action.payload.data.count;
            state.error = '';
        });

        builder.addCase(fetchSpeciesCount.rejected, (state, action) => {
            state.loading = false;
            state.count = 0;
            state.error = action.error.message;
        });
    }
});

export default speciesCountSlice;
