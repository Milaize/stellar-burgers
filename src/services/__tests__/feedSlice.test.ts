import { expect, test, describe, beforeEach } from '@jest/globals';
import {
  feedReduce as reducer,
  initialState,
  getAllFeeds
} from '../slices/feedSlice';
import { TOrder } from '../../utils/types';

describe('Редьюсер заказов: правильная работа состояний загрузки, успеха и ошибок', () => {
  let state: typeof initialState;

  beforeEach(() => {
    state = { ...initialState };
  });

  const createAction = (type: string, payload?: any, error?: { message: string }) => ({
    type,
    ...(payload && { payload }),
    ...(error && { error })
  });

  const mockFeed = {
    orders: [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        number: 64471,
        name: 'Краторная булка N-200i',
        status: 'done',
        updatedAt: '2025-04-26T19:12:00.179Z',
        createdAt: '2025-04-26T19:12:00.179Z',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ]
      }
    ] as TOrder[],
    total: 100,
    totalToday: 10
  };

  test('Начальное состояние: заказы пустые, загрузка выключена', () => {
    const action = createAction('unknown');
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  test('Переход в состояние загрузки при отправке запроса заказов', () => {
    const action = createAction(getAllFeeds.pending.type);
    state = reducer(state, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  test('Обработка ошибки при неудачной загрузке заказов', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = createAction(getAllFeeds.rejected.type, undefined, { message: errorMessage });
    state = reducer(state, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Обработка успешной загрузки заказов', () => {
    const action = createAction(getAllFeeds.fulfilled.type, mockFeed);
    state = reducer(state, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeUndefined();
    expect(state.orders).toEqual(mockFeed.orders);
  });
});
