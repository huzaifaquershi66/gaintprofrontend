// src/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullName: '',
  username: '',
  email: '',

  password: '',
  withdrawPin: '',
  referralCode: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
