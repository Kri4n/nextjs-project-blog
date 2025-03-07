import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Redux Toolkit Store (redux/store.js)
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";

export const store = configureStore({
  reducer: { auth: authReducer },
});
