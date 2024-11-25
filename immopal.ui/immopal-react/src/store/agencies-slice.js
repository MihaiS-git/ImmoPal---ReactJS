import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api'

const getAllAgencies = createAsyncThunk(
    'agencies/getAllAgencies',
    async (_, { rejectWithValue }) => {
        const timeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Request timed out")), 10000)
        });
        try {
            const response = await Promise.race([
                fetch(`${BASE_URL}/agencies`),
                timeout
            ]);

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

const selectAllAgencies = (state) => state.agencies?.agencies || [];

const selectAgencyById = (state, agencyId) => {
    const agencies = state.agencies?.agencies || [];
    const searchedAgency = agencies.find((agency) => agency.id === agencyId);
    return  searchedAgency || null;
}

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
            .addCase(getAllAgencies.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllAgencies.fulfilled, (state, action) => {
                state.agencies = action.payload.agencies || [];
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllAgencies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default agenciesSlice.reducer;
export { getAllAgencies, selectAllAgencies, selectAgencyById };
