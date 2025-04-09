import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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

export const getIngredients = createAsyncThunk('ingredients/getIngredients', getIngredientsApi);

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
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
        .addCase(getIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
            state.loading = false;
            state.ingredients = action.payload;
    });
    },
    selectors: {
    getIngredientsWithSelector: (state) => state.ingredients,
    getLoadingStatus: (state) => state.loading
    }
});

export default ingredientsSlice;

export const { getIngredientsWithSelector, getLoadingStatus } =
ingredientsSlice.selectors;