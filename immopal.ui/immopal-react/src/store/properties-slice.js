import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api'

const getAllProperties = createAsyncThunk(
    'properties/getAllProperties',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/properties`);
            if (!response.ok) {
                if (response.status === 404) {
                    return rejectWithValue('Properties not found.');
                }
                return rejectWithValue('Failed to fetch properties.')
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('Network error. Failed to fetch properties. ', error);
        }
    }
);

const selectAllProperties = (state) => state.properties.properties;

const selectPropertyById = (state, id) => state.properties.properties.find((property) => property.id === id);

const selectPropertiesByPropertyCategory = (state, propertyCategory) => state.properties.properties.find((property) => property.propertyCategory === propertyCategory);

const selectPropertiesByTransactionType = (state, transactionType) => state.properties.properties.find((property) => property.transactionType === transactionType);


const propertiesSlice = createSlice({
    name: 'properties',
    initialState: {
        properties: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProperties.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProperties.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.properties = [...action.payload];
                }
                state.error = null;
            })
            .addCase(getAllProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export { getAllProperties, selectAllProperties, selectPropertyById, selectPropertiesByPropertyCategory, selectPropertiesByTransactionType };
export default propertiesSlice.reducer;
