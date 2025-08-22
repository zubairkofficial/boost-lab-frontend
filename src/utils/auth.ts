import store from "@/store/store";
import {
  clearUser,
  setUserFromStorage,
  setUserInfoFromStorage,
} from "../store/userSlice";

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  localStorage.removeItem("user_id");

  store.dispatch(clearUser());
};

export const getStoredUser = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      localStorage.removeItem("user");
      return null;
    }
  }
  return null;
};

export const getStoredUserInfo = () => {
  const storedInfo = localStorage.getItem("userInfo");
  if (storedInfo) {
    try {
      return JSON.parse(storedInfo);
    } catch (error) {
      localStorage.removeItem("userInfo");
      return null;
    }
  }
  return null;
};

export const getAccessToken = () => localStorage.getItem("access_token");

export const isAuthenticated = () => !!getAccessToken() && !!getStoredUser();

export const loadUserFromStorage = () => {
  const user = getStoredUser();
  const userInfo = getStoredUserInfo();

  if (user) store.dispatch(setUserFromStorage(user));
  if (userInfo) store.dispatch(setUserInfoFromStorage(userInfo));
};
