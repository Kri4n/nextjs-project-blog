import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

/**
 * Configures and creates the Redux store for state management.
 * The store integrates multiple reducers, with authentication state handled by authReducer.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer, // Manages authentication state
  },
});
