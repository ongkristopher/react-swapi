import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { PEOPLE_COUNT } from '../actions';
export const initialState = {
    loading: false,
    count: 0,
    error: ''
};

export const fetchPeopleCount = createAsyncThunk(PEOPLE_COUNT, () => useFetch('people'));

const peopleCountSlice = createSlice({
    name: 'peopleCount',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPeopleCount.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchPeopleCount.fulfilled, (state, action) => {
            state.loading = false;
            state.count = action.payload.data.count;
            state.error = '';
        });

        builder.addCase(fetchPeopleCount.rejected, (state, action) => {
            state.loading = false;
            state.count = 0;
            state.error = action.error.message;
        });
    }
});

export default peopleCountSlice;
