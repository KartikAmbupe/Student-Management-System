import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const loginUser = createAsyncThunk('auth/loginUser', async(user) => {
    const res = await axios.post(`${API}/login`, user);
    return res.data;
});

export const signupUser = createAsyncThunk('auth/signupUser', async(user) => {
    const res = await axios.post(`${API}/signup`, user);
    return res.data;
})

const initialState = {
  token: localStorage.getItem('token') || null,
  role: null,
  status: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.role = null;
            localStorage.removeItem('token');
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                const decoded = JSON.parse(atob(action.payload.token.split('.')[1]));
                state.role = decoded.role;
                localStorage.setItem('token', action.payload.token);
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;