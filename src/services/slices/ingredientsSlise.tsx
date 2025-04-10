import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

type TStateIngredients = {
  ingredients: TIngredient[];
  loading: boolean;
  error: null | string | undefined;
};

export const initialState: TStateIngredients = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsWithSelector: (state) => state.ingredients,
    getLoadingStatus: (state) => state.loading,
    selectBuns: (state) =>
      state.ingredients.filter((ing) => ing.type === 'bun'),
    selectMains: (state) =>
      state.ingredients.filter((ing) => ing.type === 'main'),
    selectSauces: (state) =>
      state.ingredients.filter((ing) => ing.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.ingredients = [];
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.ingredients = action.payload;
        }
      );
  }
});

export const {
  getIngredientsWithSelector,
  getLoadingStatus,
  selectBuns,
  selectMains,
  selectSauces
} = ingredientsSlice.selectors;

export default ingredientsSlice;
