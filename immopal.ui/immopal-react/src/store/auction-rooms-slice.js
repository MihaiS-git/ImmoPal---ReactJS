import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api'

const getAllAuctionRooms = createAsyncThunk(
    'auctionRooms/getAllAuctionsRooms',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/auctionRooms`);
            if (!response.ok) {
                if (response.status === 404) {
                    return rejectWithValue('Auction rooms not found.');
                }
                return rejectWithValue('Failed to fetch auction rooms.');
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue('Network error. Failed to fetch auction rooms. ', error);
        }
    });

const addAuctionRoom = createAsyncThunk(
    'auctionRooms/addAuctionRoom',
    async (addAuctionRoomRequest, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/auctionRooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addAuctionRoomRequest)
            });

            if (!response.ok) {
                if (response.status === 400) {
                    return rejectWithValue('Bad request. Failed to create new auction room.')
                }
                return rejectWithValue('Failed to create new auction room.');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message || 'Network error. Failed to create new auction room. ');
        }
    });

const selectAuctionRoomById = (state, id) => {
    const auctionRooms = state.auctionRooms?.auctionRooms;
    const selectedAuctionRoom = auctionRooms.find((room) => room.id === id);
    return selectedAuctionRoom || null;
};

const auctionRoomsSlice = createSlice({
    name: 'auctionRooms',
    initialState: {
        auctionRooms: [],
        auctionRoom: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAuctionRooms.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllAuctionRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.auctionRooms = action.payload;
            })
            .addCase(getAllAuctionRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || [];
            })
            .addCase(addAuctionRoom.pending, (state) => {
                state.loading = true;
            })
            .addCase(addAuctionRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                if (Array.isArray(state.auctionRooms)) {
                    state.auctionRooms.push(action.payload);
                }
            })
            .addCase(addAuctionRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export { getAllAuctionRooms, addAuctionRoom, selectAuctionRoomById };
export default auctionRoomsSlice.reducer;
