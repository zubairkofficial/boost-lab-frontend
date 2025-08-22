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
}

interface UserState {
  user: User | null;
  userInfo: { id: number } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  userInfo: null,
  isAuthenticated: false,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User; userInfo: { id: number } }>
    ) => {
      state.user = action.payload.user;
      state.userInfo = action.payload.userInfo;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setUserFromStorage: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    },
    setUserInfoFromStorage: (
      state,
      action: PayloadAction<{ id: string } | null>
    ) => {
      state.userInfo = action.payload
        ? { id: Number(action.payload.id) }
        : null;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.userInfo = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setUser,
  setUserFromStorage,
  setUserInfoFromStorage,
  clearUser,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectUserInfo = (state: { user: UserState }) =>
  state.user.userInfo;
export const selectIsAuthenticated = (state: { user: UserState }) =>
  state.user.isAuthenticated;
export const selectIsLoading = (state: { user: UserState }) =>
  state.user.isLoading;
