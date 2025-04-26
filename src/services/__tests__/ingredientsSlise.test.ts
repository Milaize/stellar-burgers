import { expect, test, describe, beforeEach } from '@jest/globals';
import {
  getIngredients,
  ingredientReduce as reducer,
  initialState
} from '../slices/ingredientsSlise';
import { TIngredient } from '../../utils/types';

describe('Редьюсер ингредиентов: корректная работа при загрузке, ошибке и успешном ответе', () => {
  let state: typeof initialState;
  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];

  beforeEach(() => {
    state = { ...initialState };
  });

  const createAction = (type: string, payload?: any, error?: { message: string }) => ({
    type,
    ...(payload && { payload }),
    ...(error && { error })
  });

  test('Проверка начального состояния ингредиентов', () => {
    const action = createAction('unknown');
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  test('Проверка состояния getIngredients.pending', () => {
    const action = createAction(getIngredients.pending.type);
    state = reducer(state, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Обработка ошибки при неудачной загрузке ингредиентов', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = createAction(getIngredients.rejected.type, undefined, { message: errorMessage });
    state = reducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Обработка успешной загрузки ингредиентов', () => {
    const action = createAction(getIngredients.fulfilled.type, mockIngredients);
    state = reducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.ingredients).toEqual(mockIngredients);
  });
});
