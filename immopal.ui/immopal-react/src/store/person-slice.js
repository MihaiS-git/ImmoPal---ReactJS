import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api';

const getPersonById = createAsyncThunk(
    'person/getPersonById',
    async (id, { rejectWithValue }) => {
        console.log("Fetching person by ID.");
        
        try {
            const response = await fetch(`${BASE_URL}/persons/id/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    return rejectWithValue('Person not found.');
                }
                return rejectWithValue('Failed to fetch person data.')
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue('Network error. Failed to fetch person data. ', error);
        }
    });

const updatePerson = createAsyncThunk(
    'person/updatePerson',
    async ({ id, updateRequest }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/persons/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateRequest)
            });

            if (!response.ok) {
                if (response.status === 404) {
                    return rejectWithValue('Person not found.');
                }
                return rejectWithValue('Failed to fetch person.');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue('Network error. Failed to update person. ', error);
        }
    }
);

const personSlice = createSlice({
    name: 'person',
    initialState: {
        person: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPersonById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPersonById.fulfilled, (state, action) => {
                state.loading = false;
                state.person = action.payload;
                state.error = null;
            })
            .addCase(getPersonById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updatePerson.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePerson.fulfilled, (state, action) => {
                state.loading = false;
                state.person = action.payload;
                state.error = null;
            })
            .addCase(updatePerson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export { getPersonById, updatePerson };
export default personSlice.reducer;