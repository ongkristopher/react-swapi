import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { mutateObject } from 'lib/mutateObject';
import { FETCH_PERSON } from '../actions';
export const initialState = {
    loading: false,
    data: {},
    error: ''
};

export const fetchPerson = createAsyncThunk(FETCH_PERSON, ({ id, isWookiee }) => {
    return isWookiee ? useFetch(`people/${id}/?format=wookiee`) : useFetch(`people/${id}`);
});

const personSlice = createSlice({
    name: 'person',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPerson.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchPerson.fulfilled, (state, action) => {
            state.loading = false;
            state.data = mutateObject(action.payload.data, action.meta.arg.isWookiee);
            state.error = '';
        });

        builder.addCase(fetchPerson.rejected, (state, action) => {
            state.loading = false;
            state.data = {};
            state.error = action.error.message;
        });
    }
});

export default personSlice;
