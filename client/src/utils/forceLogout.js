// src/utils/forceLogout.js
import { store } from "../app/store";
import { persistor } from "../app/store";
import { logout } from "../features/slices/authSlice";

export const forceLogout = async () => {
  store.dispatch(logout());
  await persistor.purge();
  window.location.href = "/login";
};