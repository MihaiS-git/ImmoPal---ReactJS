import { createSlice } from "@reduxjs/toolkit";

const bidsSlice = createSlice({
    name: 'bids',
    initialState: {
        bids: [],
        connected: false,
        error: null,
    },
    reducers: {
        setBids: (state, action) => {
            state.bids = action.payload;
        },
        addBid: (state, action) => {
            state.bids.push(action.payload);
            state.error = null;
        },
        setConnected: (state, action) => {
            state.connected = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
});

export const { setBids, addBid, setConnected, setError } = bidsSlice.actions;
export default bidsSlice.reducer;

export const connectStomp = () => ({ type: 'connect' });
export const disconnectStomp = () => ({ type: 'disconnect' });

export const selectAllBids = (state) => state.bids.bids;
export const selectLastBid = (state) => state.bids.bids.slice(-1)[0];
export const selectIsConnected = (state) => state.bids.connected;
export const selectError = (state) => state.bids.error;