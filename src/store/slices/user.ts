import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  AuthorizationStatus,
  LoadingStatus,
  NameSpace,
} from '../../consts/consts';
import { getCurrentUserData, loginAction, logoutAction } from '../api-actions';
import { UserData } from '../../types/api-data';

interface IInitialState {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | Record<string, never>;
  isUserDataLoading: LoadingStatus;
  isLoginLoading: LoadingStatus;
}

const initialState: IInitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {},
  isUserDataLoading: LoadingStatus.Idle,
  isLoginLoading: LoadingStatus.Idle,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCurrentUserData.pending, (state) => {
        state.isUserDataLoading = LoadingStatus.Pending;
      })
      .addCase(getCurrentUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isUserDataLoading = LoadingStatus.Fulfilled;
      })
      .addCase(getCurrentUserData.rejected, (state) => {
        state.isUserDataLoading = LoadingStatus.Rejected;
      })
      .addCase(loginAction.pending, (state) => {
        state.isLoginLoading = LoadingStatus.Pending;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoginLoading = LoadingStatus.Fulfilled;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoginLoading = LoadingStatus.Rejected;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;

      });
  },
});
export const { requireAuthStatus } = userSlice.actions;
