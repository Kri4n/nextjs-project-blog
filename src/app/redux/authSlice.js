import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for authentication state management.
 * This slice handles storing user authentication data and provides actions
 * for setting user data and logging out.
 */
const authSlice = createSlice({
  name: "auth", // Slice name used in Redux store
  initialState: { user: null }, // Initial state with no authenticated user
  reducers: {
    /**
     * Sets the authenticated user data.
     * @param {Object} state - Current authentication state
     * @param {Object} action - Redux action containing user data
     */
    setUser: (state, action) => {
      state.user = action.payload;
    },

    /**
     * Logs the user out by clearing the authentication state.
     * @param {Object} state - Current authentication state
     */
    logout: (state) => {
      state.user = null;
    },
  },
});

// Export actions for setting user and logging out
export const { setUser, logout } = authSlice.actions;

// Export reducer to be included in the Redux store
export default authSlice.reducer;
