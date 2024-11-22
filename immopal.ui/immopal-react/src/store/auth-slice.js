import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'http://localhost:8080/api';

export const register = createAsyncThunk('auth/register', async (registerRequest, { rejectWithValue }) => {
    try {

        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerRequest)
        })

        if (!response.ok) {
            return rejectWithValue('Failed to register. Please verify the form data.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Failed to register. ', error);
        return rejectWithValue('Network error. Failed to Register. Please try again later.')
    }
});

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401) {
                console.log("Rejecting with: Invalid credentials.");
                return rejectWithValue('Invalid credentials.');
            }
            console.log("Rejecting with:", errorData.message || 'Failed to login.');
            return rejectWithValue(errorData.message || 'Failed to login.');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Network error:", error);
        return rejectWithValue('Network error. Please try again later.');
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        tokenExpiresAt: null,
        isAuthenticated: false,
        loading: false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.tokenExpiresAt = null;
            state.isAuthenticated = false;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.tokenExpiresAt = Date.now() + 1000 * 60 * 120;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = null;
                state.token = action.payload.token;
                state.tokenExpiresAt = Date.now() + 1000 * 60 * 120;
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(register.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;