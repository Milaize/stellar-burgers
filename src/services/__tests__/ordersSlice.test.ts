import { getUserOrders, userOrders, initialState } from '../slices/ordersSlice';
import { expect, test, describe, beforeEach } from '@jest/globals';
import { TOrder } from '../../utils/types';

describe('Проверка экшенов и редьюсера списка заказов пользователя', () => {
  let state: typeof initialState;

  beforeEach(() => {
    state = { ...initialState };
  });

  const createAction = (type: string, payload?: any, error?: { message: string }) => ({
    type,
    ...(payload && { payload }),
    ...(error && { error })
  });

  test('Должен вернуть начальное состояние при неизвестном экшене', () => {
    const action = createAction('unknown');
    expect(userOrders.reducer(undefined, action)).toEqual(initialState);
  });
});

describe('Обработка загрузки заказов пользователя', () => {
  let state: typeof initialState;
  const mockOrders: TOrder[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-04-25T12:00:00.000Z',
      updatedAt: '2025-04-25T12:00:00.000Z',
      number: 11111
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

  test('При отправке запроса должна начаться загрузка', () => {
    const action = createAction(getUserOrders.pending.type);
    state = userOrders.reducer(state, action);

    expect(state.loading).toBe(true);
    expect(state.orders).toEqual([]);
  });

  test('При успешной загрузке заказы должны сохраниться в состоянии', () => {
    // Сначала устанавливаем состояние загрузки
    state = userOrders.reducer(state, createAction(getUserOrders.pending.type));
    
    // Затем обрабатываем успешный ответ
    const action = createAction(getUserOrders.fulfilled.type, mockOrders);
    state = userOrders.reducer(state, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  test('При ошибке загрузки заказы должны остаться пустыми', () => {
    // Сначала устанавливаем состояние загрузки
    state = userOrders.reducer(state, createAction(getUserOrders.pending.type));
    
    // Затем обрабатываем ошибку
    const errorMessage = 'Ошибка при получении заказов';
    const action = createAction(getUserOrders.rejected.type, undefined, { message: errorMessage });
    state = userOrders.reducer(state, action);

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([]);
  });
});