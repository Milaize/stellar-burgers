import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';
export const getAllFeeds = createAsyncThunk('orders/getAll', getFeedsApi);

export interface TFeedsState {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  isLoading: boolean;
  error?: string | undefined;
}

export const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: undefined
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeed: (state) => state.orders,
    getTotalFeed: (state) => state.total,
    getTotalTodayFeed: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      });
  }
});

export const { getOrdersFeed, getTotalFeed, getTotalTodayFeed } =
  feedSlice.selectors;
