import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = action.payload.error;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://fin-dash-backend.vercel.app/api/v1/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    if (!response.ok) {
      dispatch(loginFailure({ error: "Invalid email or password" }));
      throw new Error("Invalid email or password");
    }
    const data = await response.json();
    if (response.ok) {
      dispatch(loginSuccess({ token: data.token }));
      return data;
    }
  } catch (error) {
    dispatch(loginFailure({ error: error.message }));
    throw new Error(error.message);
  }
};

export const logout = () => async (dispatch) => {
  dispatch(logoutSuccess());
};

export async function signup(signupdata) {
  try {
    const response = await fetch(
      `http://fin-dash-backend.vercel.app/api/v1/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupdata),
      }
    );
    if (!response.ok) {
      throw new Error("Signup failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default authSlice.reducer;
