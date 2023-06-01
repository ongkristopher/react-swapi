import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { SEARCH_VEHICLES } from '../actions';
export const initialState = {
    loading: false,
    data: {
        count: 0,
        next: null,
        previous: null,
        results: []
    },
    error: '',
    query: ''
};

export const searchVehicles = createAsyncThunk(SEARCH_VEHICLES, ({ query, url }) => {
    return url ? useFetch(url, false) : useFetch(`vehicles/?search=${query}`);
});

const searchVehiclesSlice = createSlice({
    name: 'searchVehicles',
    initialState,
    reducers: {
        clearQuery: {
            reducer: (state) => {
                state.query = '';
                state.data = {
                    count: 0,
                    next: null,
                    previous: null,
                    results: []
                };
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchVehicles.pending, (state, action) => {
            state.loading = true;
            state.query = action.meta.arg.query;
        });

        builder.addCase(searchVehicles.fulfilled, (state, action) => {
            state.loading = false;
            state.data.count = action.payload.data.count;
            state.data.next = action.payload.data.next;
            state.data.previous = action.payload.data.previous;
            state.data.results = state.data.results.concat(action.payload.data.results);
            state.query = action.meta.arg.query;
            state.error = '';
        });

        builder.addCase(searchVehicles.rejected, (state, action) => {
            state.loading = false;
            state.data.results = [];
            state.error = action.error.message;
            state.query = action.meta.arg.query;
        });
    }
});

const { actions, reducer } = searchVehiclesSlice;
export const { clearQuery } = actions;
export default reducer;
