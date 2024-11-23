import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api'

const getAllAgecies = createAsyncThunk('agencies/getAllAgencies', async (_, { rejectWithValue }) => {
    try {

        const response = await fetch(`${BASE_URL}/agencies`);

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 404) {
                console.log("Rejecting with: Not found.");
                return rejectWithValue("Not found.");
            }
            console.log("Rejecting with: ", errorData.message || "Failed to fetch data.");
            return rejectWithValue(errorData.message || "Failed to fetch data.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Rejecting with: ", error);
        return rejectWithValue("Network error or server unreachable.");
    }
});

const agenciesSlice = createSlice({
    name: 'agencies',
    initialState: {
        agencies: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAgecies.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllAgecies.fulfilled, (state, action) => {
                state.loading = false;
                state.agencies = action.payload;
                state.error = null;
            })
            .addCase(getAllAgecies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default agenciesSlice.reducer;
export { getAllAgecies };