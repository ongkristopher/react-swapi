import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { mutateObject } from 'lib/mutateObject';
import { FETCH_VEHICLE } from '../actions';
export const initialState = {
    loading: false,
    data: {},
    error: ''
};

export const fetchVehicle = createAsyncThunk(FETCH_VEHICLE, ({ id, isWookiee }) => {
    return isWookiee ? useFetch(`vehicles/${id}/?format=wookiee`) : useFetch(`vehicles/${id}`);
});

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVehicle.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchVehicle.fulfilled, (state, action) => {
            state.loading = false;
            state.data = mutateObject(action.payload.data, action.meta.arg.isWookiee);
            state.error = '';
        });

        builder.addCase(fetchVehicle.rejected, (state, action) => {
            state.loading = false;
            state.data = {};
            state.error = action.error.message;
        });
    }
});

export default vehicleSlice;
