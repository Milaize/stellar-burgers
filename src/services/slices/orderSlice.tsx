import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const placeNewOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TNewOrderState {
  loading: boolean;
  order: TOrder | null;
  error: string | undefined;
}

export const initialState: TNewOrderState = {
  loading: false,
  order: null,
  error: undefined
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  selectors: {
    getOrderLoad: (state) => state.loading,
    getOrderData: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(placeNewOrder.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(placeNewOrder.pending, (state) => {
        state.loading = true;
      });
  }
});

export const { resetOrder } = newOrderSlice.actions;
export const { getOrderLoad, getOrderData } = newOrderSlice.selectors;

export default newOrderSlice;
