import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  role: string;
  subscriptionStatus: "active" | "canceled" | "none";
  user_metadata: {
    name: string;
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  app_metadata: {
    provider: string;
    providers: string[];
  };
  created_at: string;
  updated_at: string;
  last_sign_in_at: string;
  confirmed_at: string;
  email_confirmed_at: string;
  phone: string;
  is_anonymous: boolean;
  aud: string;
  // Add other user properties as needed
}

interface UserState {
  user: User|null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true for initialization
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setUserFromStorage: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const {
  setUser,
  setUserFromStorage,
  clearUser,
  setLoading,
  updateUser,
} = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: UserState }) =>
  state.user.isAuthenticated;
export const selectIsLoading = (state: { user: UserState }) =>
  state.user.isLoading;
