import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import feathers from '../feathers';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({email, password}) => await feathers.authenticate({
    strategy: 'local',
    email,
    password
  })
);

export const authenticateUser = createAsyncThunk(
  'user/authenticate',
  async () => await feathers.reAuthenticate()
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => await feathers.logout()
);
const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: true,
    user: null,
  },
  reducers: {
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
extraReducers: {
    [loginUser.pending]: state => {
      state.loading = true;
    },
  [loginUser.fulfilled]: (state, action) => {
    state.user = action.payload.user;
    console.log(action.payload);
    state.loading = false;
  },
  [loginUser.rejected]: (state, action) => {
  console.log(action);
  state.login = false;
  },
  [authenticateUser.fulfilled]: (state, action) => {
    state.user = action.payload.user;
    console.log(action);
    state.loading = false;
  },
  [authenticateUser.rejected]: state=> {
    state.loading = false;
  },
  [logoutUser.fulfilled]: state=> {
    state.user = null;
  },
}
});
export const {toggleLoading} = appSlice.actions;
export default appSlice.reducer;
