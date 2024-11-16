import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state with token
export interface JwtState {
  token: string;
}

const initialState: JwtState = {
  token: "", // Start with an empty token
};

// Create the slice
const jwtSlice = createSlice({
  name: "jwt",
  initialState,
  reducers: {
    setJwt: (state, action: PayloadAction<string>) => {
      state.token = action.payload; // Update the token
      // Save the token to localStorage
      window.localStorage.setItem(
        "jwt",
        JSON.stringify({ token: action.payload })
      );
    },
    clearJwt: state => {
      state.token = ""; // Clear the token
      // Remove the token from localStorage
      window.localStorage.removeItem("jwt");
    },
    loadJwtFromStorage: state => {
      // Initialize JWT from localStorage if available
      const storedJwt = window.localStorage.getItem("jwt");
      const parsedJwt = storedJwt ? JSON.parse(storedJwt).token : "";
      state.token = parsedJwt;
    },
  },
});

export const { setJwt, clearJwt, loadJwtFromStorage } = jwtSlice.actions;
export default jwtSlice.reducer;
