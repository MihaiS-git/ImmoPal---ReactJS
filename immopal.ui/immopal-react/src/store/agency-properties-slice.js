import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api'

const getPropertiesByAgency = createAsyncThunk(
    'agencyProperties/getPropertiesByAgency',
    async (propertiesIdsList, { rejectWithValue }) => {
        try {
            
            const responses = await Promise.all(
                propertiesIdsList.map(async (propertyIdObject) => {
                    const response = await fetch(`${BASE_URL}/properties/${propertyIdObject.propertyId}`);
                    if (!response.ok) {
                        return rejectWithValue('Failed to fetch agency properties.');
                    }
                    return await response.json();
                })
            );
            return responses;
        } catch (error) {
            return rejectWithValue('Network error. Failed to fetch properties. ', error);
        }
    }
);

const propertiesByAgencySlice = createSlice({
    name: 'propertiesByAgency',
    initialState: {
        properties: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPropertiesByAgency.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPropertiesByAgency.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.properties = action.payload;
                }
                state.error = null;
            })
            .addCase(getPropertiesByAgency.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            });
    }
});

export { getPropertiesByAgency };
export default propertiesByAgencySlice.reducer;