import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const apiGetUser = createAsyncThunk('user/getuser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const register = createAsyncThunk(
  'registerUser',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);
export const login = createAsyncThunk(
  'loginUser',
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);
export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export interface TUserState {
  isAuthChecked: boolean;
  user: TUser;
  error: string | undefined;
  loading: boolean;
}

export const initialState: TUserState = {
  isAuthChecked: true,
  user: {
    email: '',
    name: ''
  },
  error: '',
  loading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    userDataSelector: (state) => state.user,
    getUser: (state) => state.user,
    getUserName: (state) => state.user.name,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message!;
        state.loading = false;
      })
      .addCase(register.pending, (state) => {
        state.error = '';
        state.loading = true;
      });
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message!;
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.error = '';
        state.loading = true;
      });
    builder
      .addCase(apiGetUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message!;
        state.loading = false;
      })
      .addCase(apiGetUser.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message!;
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = '';
        state.loading = true;
      });
    builder
      .addCase(logout.fulfilled, (state) => {
        state.isAuthChecked = false;
        state.user = { email: '', name: '' };
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      });
  }
});

export const {
  isAuthCheckedSelector,
  getUser,
  getUserName,
  getError,
  userDataSelector
} = userSlice.selectors;
export const userReducer = userSlice.reducer;
export default userSlice;
