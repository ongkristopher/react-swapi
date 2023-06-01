import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { PLANETS_COUNT } from '../actions';
export const initialState = {
    loading: false,
    count: 0,
    error: ''
};

export const fetchPlanetsCount = createAsyncThunk(PLANETS_COUNT, () => useFetch('planets'));

const planetsCountSlice = createSlice({
    name: 'planetsCount',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPlanetsCount.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchPlanetsCount.fulfilled, (state, action) => {
            state.loading = false;
            state.count = action.payload.data.count;
            state.error = '';
        });

        builder.addCase(fetchPlanetsCount.rejected, (state, action) => {
            state.loading = false;
            state.count = 0;
            state.error = action.error.message;
        });
    }
});

export default planetsCountSlice;
