import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useFetch from 'hooks/useFetch';
import { SEARCH_FILMS } from '../actions';
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

export const searchFilms = createAsyncThunk(SEARCH_FILMS, ({ query, url }) => {
    return url ? useFetch(url, false) : useFetch(`films/?search=${query}`);
});

const searchFilmSlice = createSlice({
    name: 'searchFilm',
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
        builder.addCase(searchFilms.pending, (state, action) => {
            state.loading = true;
            state.query = action.meta.arg.query;
        });

        builder.addCase(searchFilms.fulfilled, (state, action) => {
            state.loading = false;
            state.data.count = action.payload.data.count;
            state.data.next = action.payload.data.next;
            state.data.previous = action.payload.data.previous;
            state.data.results = state.data.results.concat(action.payload.data.results);
            state.query = action.meta.arg.query;
            state.error = '';
        });

        builder.addCase(searchFilms.rejected, (state, action) => {
            state.loading = false;
            state.data.results = [];
            state.error = action.error.message;
            state.query = action.meta.arg.query;
        });
    }
});

const { actions, reducer } = searchFilmSlice;
export const { clearQuery } = actions;
export default reducer;
