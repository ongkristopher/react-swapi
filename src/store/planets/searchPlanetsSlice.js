import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { SEARCH_PLANETS } from '../actions';
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

export const searchPlanets = createAsyncThunk(SEARCH_PLANETS, ({ query, url }) => {
    return url ? useFetch(url, false) : useFetch(`planets/?search=${query}`);
});

const searchPlanetsSlice = createSlice({
    name: 'searchPlanets',
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
        builder.addCase(searchPlanets.pending, (state, action) => {
            state.loading = true;
            state.query = action.meta.arg.query;
        });

        builder.addCase(searchPlanets.fulfilled, (state, action) => {
            state.loading = false;
            state.data.count = action.payload.data.count;
            state.data.next = action.payload.data.next;
            state.data.previous = action.payload.data.previous;
            state.data.results = state.data.results.concat(action.payload.data.results);
            state.query = action.meta.arg.query;
            state.error = '';
        });

        builder.addCase(searchPlanets.rejected, (state, action) => {
            state.loading = false;
            state.data.results = [];
            state.error = action.error.message;
            state.query = action.meta.arg.query;
        });
    }
});

const { actions, reducer } = searchPlanetsSlice;
export const { clearQuery } = actions;
export default reducer;
