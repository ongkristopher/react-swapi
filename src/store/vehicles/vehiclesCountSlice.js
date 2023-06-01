import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { VEHICLES_COUNT } from '../actions';
export const initialState = {
    loading: false,
    count: 0,
    error: ''
};

export const fetchVehiclesCount = createAsyncThunk(VEHICLES_COUNT, () => useFetch('vehicles'));

const vehiclesCountSlice = createSlice({
    name: 'vehiclesCount',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVehiclesCount.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchVehiclesCount.fulfilled, (state, action) => {
            state.loading = false;
            state.count = action.payload.data.count;
            state.error = '';
        });

        builder.addCase(fetchVehiclesCount.rejected, (state, action) => {
            state.loading = false;
            state.count = 0;
            state.error = action.error.message;
        });
    }
});

export default vehiclesCountSlice;
