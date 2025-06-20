import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/api/students';

// Async Thunks
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { getState }) => {
    const { token } = getState().auth;
    const res = await axios.get(`${API}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (student, { getState }) => {
    const { token } = getState().auth;
    const res = await axios.post(`${API}`, student, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id, { getState }) => {
    const { token } = getState().auth;
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, data }, { getState }) => {
    const { token } = getState().auth;
    const res = await axios.put(`${API}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// Initial state

const initialState = {
  students: [],
  loading: false,
  error: null,
};

// Slice

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })

      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student._id !== action.payload
        );
      })

      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student._id === action.payload._id
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      });
  },
});

export default studentSlice.reducer;