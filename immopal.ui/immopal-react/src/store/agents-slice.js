import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api';

const getAllAgencyAgents = createAsyncThunk(
    'agents/getAllAgencyAgents',
    async (agentsIdsList, { rejectWithValue }) => {
        try {
            const responses = await Promise.all(
                agentsIdsList.map(async (agentIdObject) => {
                    const response = await fetch(`${BASE_URL}/persons/id/${agentIdObject.agentId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch agents.');
                    }
                    return await response.json();
                })
            );
            return responses;
        } catch (error) {
            return rejectWithValue('NetWork error. Failed to fetch agents. ', error)
        }
    }
);

const agentsSlice = createSlice({
    name: 'agents',
    initialState: {
        agents: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAgencyAgents.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllAgencyAgents.fulfilled, (state, action) => {
                state.loading = false;
                state.agents = action.payload;
                state.error = null;
            })
            .addCase(getAllAgencyAgents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default agentsSlice.reducer;
export { getAllAgencyAgents };