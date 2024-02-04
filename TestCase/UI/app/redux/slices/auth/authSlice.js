import { createSlice } from "@reduxjs/toolkit";
import { encryptJson, decrypt } from "../../../../libs/encryption";
const userSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: encryptJson(false),
    user: encryptJson({}),
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = encryptJson(true);
      state.user = encryptJson(action.payload);
    },
    logout: (state) => {
      state.loggedIn = encryptJson(false);
      state.user = encryptJson({});
      state.roles = [];
    },
  },
});

export const { login, logout, setRoles } = userSlice.actions;

export default userSlice.reducer;
